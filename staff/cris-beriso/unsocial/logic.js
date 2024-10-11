function registerUser(name, email, username, password, passwordRepeat) {
  if (name.length < 2)
    throw new Error('Invalid name')

  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new Error('Invalid e-mail')

  if (username.length < 4 || username.length > 12)
    throw new Error('Invalid username')

  if (password.length < 8)
    throw new Error('Invalid password')

  if (password !== passwordRepeat)
    throw new Error('Passwords do not match')

  var user = users.find(function (user) {
    return user.username === username || user.email === email
  })

  if (user !== undefined)
    throw new Error('User already exists')

  user = { name: name, email: email, username: username, password: password }

  users.push(user)
}

function authenticateUser(username, password) {
  if (username.length < 4 || username.length > 12)
    throw new Error('Invalid username')

  if (password.length < 8)
    throw new Error('Invalid password')

  var user = users.find(function (user) {
    return user.username === username && user.password === password
  })

  if (user === undefined)
    throw new Error('Wrong credentials')

  return user
}

function createPost(username, image, text) {
  if (username.length < 4 || username.length > 12)
    throw new Error('Invalid username')

  // TO DO input validation

  var post = {
    image: image,
    text: text,
    username: username,
    date: new Date
  }

  post.push(post)
}

function getPosts() {
  return posts
}