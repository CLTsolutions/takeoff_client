import React, { Component } from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import BlogIndex from './components/Blog/Views/BlogIndex'
import Home from './components/Site/Home'
import Sitebar from './components/Site/Sitebar'
import { Redirect, Route, Switch } from 'react-router-dom'
import AdminView from './components/Site/AdminView'

type valueTypes = {
  token: string | null
  userRole: string | null
}

class App extends Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props)
    this.state = {
      token: '',
      userRole: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('sessionToken')) {
      this.setState({
        token: localStorage.getItem('sessionToken'),
      })
    }
    console.log('is userRole working?', this.state.userRole)
    // if (localStorage.getItem('userRole')) {
    //   this.setState({ userRole: localStorage.getItem('userRole') })
    // }
  }

  // updateIsAdmin = (newUserRole: string) => {
  //   localStorage.setItem('userRole', newUserRole)
  //   this.setState({ userRole: newUserRole })
  // }

  updateToken = (newToken: any, userRole: string) => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ token: newToken, userRole: userRole })
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
  }

  // protectedViewsAdmin = () => {
  //   return localStorage.getItem("userRole") === "admin" ? (
  //     // display admin panel
  //     <AdminView />
  //   ) : (
  //     // show auth or whatever else
  //   )
  // }

  protectViewsAdmin = () => {
    if (this.state.userRole === 'admin') {
      //prettier-ignore
      return <AdminView />
    } else {
      return <Auth token={this.updateToken} />
    }
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
          <Sitebar
            logout={this.clearToken}
            token={this.state.token}
            userRole={this.state.userRole}
          />
        )}
        <Switch>
          <Route exact path='/'>
            {this.protectedViews}
          </Route>
          <Route exact path='/blog'>
            <BlogIndex token={this.state.token} />
          </Route>
          <Route exact path='/admin'>
            {this.protectViewsAdmin}
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App
