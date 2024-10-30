import { storage } from '../data/index.js'
import validate from './helpers/validate.js'

export default (username, password) => {
  validate.username(username)
  validate.password(password)

  // YA TENEMOS VALIDACIÓN DE PASSWORD, ESTO ES REDUNDANTE
  // if (password.length < 8)
  //   throw new Error('invalid password')

  const { users } = storage

  const user = users.find(user => user.username === username && user.password === password)

  if (user === undefined)
    throw new Error('wrong credentials')

  return user.id
}