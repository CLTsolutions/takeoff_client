import React, { Component } from 'react'
import { Button } from 'antd'
// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

type acceptedProps = {
  token: (token: string | null) => void
}

type valueTypes = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default class Register extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    fetch('http://localhost:3000/user/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        this.props.token(data.sessionToken)
        console.log(data)
      })
  }

  render() {
    return (
      <div className='register'>
        <form onSubmit={this.handleSubmit} className='space-y-5'>
          <h1 className='text-xl'>Register</h1>
          <div>
            <input
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              type='text'
              placeholder='First Name'
              value={this.state.firstName}
              name='first name'
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </div>
          <div>
            <input
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              type='text'
              placeholder='Last Name'
              value={this.state.lastName}
              name='last name'
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              required
              type='email'
              placeholder='Email'
              // size= '30'
              name='email'
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <input
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              required
              id='password'
              type='password'
              placeholder='Password'
              value={this.state.password}
              name='password'
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <Button htmlType='submit'>Submit</Button>
        </form>
      </div>
    )
  }
}
