import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Home from './Home'

type acceptedProps = {
  token: any
  logout: any
}

export default class Navbar extends Component<acceptedProps, {}> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {}
  }

  logoutButton = () => {
    return localStorage.getItem('sessionToken') === null ? (
      ''
    ) : (
      <button onClick={this.props.logout}>Logout</button>
    )
  }

  render() {
    return (
      <div>
        <nav className='bg-red-400 h-12'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>{this.logoutButton()}</li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/Home'>
            <Home />
          </Route>
        </Switch>
      </div>
    )
  }
}
