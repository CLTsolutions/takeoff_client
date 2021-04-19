import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import { Button } from 'antd'
import './Auth.css'

type acceptedProps = {
  token: any
}

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
    return this.state.login 
    ? <Login token={this.props.token} />
    : <Register token={this.props.token} />
  }

  loginToggle = (event: any) => {
    event.preventDefault()
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
        <div className="flex h-screen justify-center items-center">
          <div className="bg-indigo-400 bg-opacity-75 max-w-lg m-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl w-1/2">
            {this.authTernary()}
            <Button onClick={this.loginToggle}>Toggle</Button>
          </div>
        </div>
      </div>
    )
  }
}
