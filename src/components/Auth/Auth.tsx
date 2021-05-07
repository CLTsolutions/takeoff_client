import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import './Auth.css'
import { Link } from 'react-router-dom'
// import { BaseUser } from '../../types'

type acceptedProps = {
  token: any
  // user: BaseUser[]
  // token: string | null
}

// interface AuthState extends BaseUser {
//   login: boolean
//   setLogin: boolean
// }

type valueTypes = {
  login: boolean
  setLogin: boolean
  firstName: string
  lastName: string
  email: string
  password: string
}

export default class Auth extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      login: true,
      setLogin: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  authTernary = () => {
    return this.state.login ? (
      <Login token={this.props.token} />
    ) : (
      <Register token={this.props.token} />
    )
  }

  loginToggle = () => {
    this.setState({
      login: !this.state.login,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
  }

  render() {
    return (
      <div className='map-img'>
        <div className='flex h-screen items-center'>
          <div className='bg-indigo-400 bg-opacity-75 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl w-1/2 text-center'>
            {this.authTernary()}
            {this.state.login ? (
              <Link to='' className='auth-link' onClick={this.loginToggle}>
                Or register now!
              </Link>
            ) : (
              <Link to='' className='auth-link' onClick={this.loginToggle}>
                Login Now!
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}
