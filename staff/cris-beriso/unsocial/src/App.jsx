import { Component } from 'react'

import { Login, Register, Home, CreatePost } from './view'

import { Header, Footer } from './components/functional'

import logic from './logic'

class App extends Component {
  constructor(props) {
    console.log('App -> constructor')

    super(props)

    this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
  }

  render() {
    console.log('App -> render')

    return <>
      <Header view={this.state.view} onHomeClick={() => this.setState({ view: 'home' })} onLoggedOut={() => this.setState({ view: 'login' })} />

      {this.state.view === 'login' && <Login
        onLoggedIn={() => this.setState({ view: 'home' })}
        onRegisterLink={() => this.setState({ view: 'register' })}
      />}
      {this.state.view === 'register' && <Register
        onRegisterIn={() => this.setState({ view: 'login' })}
        onLoginLink={() => this.setState({ view: 'login' })}
      />}
      {this.state.view === 'home' && <Home />}

      {this.state.view === 'new-post' && <CreatePost onCreated={() => this.setState({ view: 'home' })} />}

      <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
    </>
  }
}

export default App