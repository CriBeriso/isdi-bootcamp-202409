import db from 'dat'
import { models } from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')

  const userObjectId = new ObjectId(userId)
  const postObjectId = new ObjectId(postId)

  return Promise.all([
    User.findOne({ _id: userObjectId }),
    Post.findOne({ _id: postObjectId })
  ])

    .catch(error => { throw new SystemError(error.message) })
    .then(([user, post]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!post) throw new NotFoundError('post not found')

      const { comments } = post

      const authorObjectIds = []

      comments.forEach(comment => { //de esta forma guardo una sola vez el id de author aunque tenga más de 1 comentario.
        const { author } = comment

        const found = authorObjectIds.some(authorObjectId => authorObjectId.equals(author))

        if (!found) authorObjectIds.push(author)
      })

      //conseguimos hacer una sola consulta y no muchas promesas de una consulta. 
      return User.find({ _id: { $in: authorObjectIds } }, { username: 1 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(authors => {
          comments.forEach(comment => {
            comment.id = comment._id.toString()

            delete comment._id

            const author = authors.find(({ _id }) => _id.equals(comment.author))

            const { _id, username } = author

            comment.author = {
              id: _id.toString(),
              username
            }
          })
          return comments
        })
    })
}