import React, { Component } from 'react'
import { Button } from 'antd'

type acceptedProps = {
  token: (token: string | null) => void
}

type valueTypes = {
  [key: string]: string
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

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }


  render() {
    return (
      <div className='register'>
        <form onSubmit={this.handleSubmit} className='space-y-5'>
          <h1 className='text-xl text-white'>Register</h1>
          <div className='flex flex-col'>
            <label htmlFor='firstName'>
            <input
              id='firstName'
              className='w-full border-2 border-transparent
                p-2 rounded outline-none focus:border-purple-500'
              required type='text'
              placeholder='First Name'
              value={this.state.firstName}
              name='firstName'
              onChange={this.handleChange}
            />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='lastName'>
            <input
              id='lastName'
              className='w-full border-2 border-transparent
                p-2 rounded outline-none focus:border-purple-500'
              required type='text'
              placeholder='Last Name'
              value={this.state.lastName}
              name='lastName'
              onChange={this.handleChange}
            />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>
            <input
              id='email'
              className='w-full border-2 border-transparent
               p-2 rounded outline-none focus:border-purple-500'
              // required type='email'
              placeholder='Email'
              // size= {30}
              value={this.state.email}
              name='email'
              onChange={this.handleChange}
            />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>
            <input
              id='password'
              className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
              required type='password'
              placeholder='Password'
              // minLength= {8}
              value={this.state.password}
              name='password'
              onChange={this.handleChange}
            />
            </label>
          </div>
          <Button htmlType='submit'>Submit</Button>
        </form>      
      </div>
    )
  }
}
