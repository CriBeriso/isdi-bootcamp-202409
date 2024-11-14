import { validate, errors } from 'com'

const { SystemError } = errors


export default (postId, text, callback) => {
  validate.id(postId, 'postId')
  validate.text(text)
  validate.callback(callback)

  const xhr = new XMLHttpRequest

  xhr.addEventListener('load', () => {
    const { status, response } = xhr

    if (status === 201) {
      callback(null)

      return
    }

    const { error, message } = JSON.parse(response)

    const constructor = error[error]

    callback(new Error(message))
  })

  xhr.addEventListener('error', () => callback(new SystemError('server error')))

  xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
  xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({ text }))
}