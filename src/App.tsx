import React, { Component } from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import Navbar from './components/Site/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'

type valueTypes = {
  token: any
}

class App extends Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props)
    this.state = {
      token: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('sessionToken')) {
      this.setState({
        token: localStorage.getItem('sessionToken'),
      })
    }
  }

  updateToken = (newToken: any) => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ token: newToken })
    console.log('is this updating the token', this.state.token)
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '' })
    console.log('token cleared')
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('sessionToken') ? (
      <Router>
        <Navbar logout={this.clearToken} token={this.state.token} />
      </Router>
    ) : (
      <Auth token={this.updateToken} />
    )
  }

  render() {
    return <div className='App'>{this.protectedViews()}</div>
  }
}

export default App
