const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/m2vzaqy1te/name')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.send()