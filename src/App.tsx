import React, { Component } from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import BlogIndex from './components/Blog/Views/BlogIndex'
import Home from './components/Site/Home'
import Sitebar from './components/Site/Sitebar'
import { Redirect, Route, Switch } from 'react-router-dom'

type valueTypes = {
  token: string | null
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
    // console.log('is this updating the token', this.state.token)
  }

  redirectNoToken = () => {
    if (this.state.token === '') {
      console.log(this.state.token)
      return <Redirect to='/' />
    }
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '' })
    // console.log('token cleared')
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('sessionToken') ? (
      <Home token={this.state.token} />
    ) : (
      <Auth token={this.updateToken} />
    )
  }

  render() {
    return (
      <div className='App'>
        {/* {this.redirectNoToken()} */}
        {/* <Route>
          <Sitebar logout={this.clearToken} token={this.state.token} protectedViews={this.protectedViews} />
        </Route> */}
        {this.state.token && (
          <Sitebar logout={this.clearToken} token={this.state.token} />
        )}
        <Switch>
          <Route exact path='/'>
            {this.protectedViews}
          </Route>
          <Route exact path='/blog'>
            <BlogIndex token={this.state.token} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App
