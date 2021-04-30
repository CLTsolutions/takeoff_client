import React, { Component } from 'react'
import { Button } from 'antd'
// import { BaseUser } from '../../types'

type acceptedProps = {
  token: (token: string | null) => void
  // user: BaseUser
}

interface LoginState {
  email: string
  password: string
  // size: number
  // minLength: number
}

export default class Login extends Component<acceptedProps, LoginState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        this.props.token(data.sessionToken),
        // this.props.token(data.sessionToken, data.userRole),
        //this.props.token(data.userRole)
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({ [name]: value } as Pick<LoginState, keyof LoginState>)
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.handleSubmit} className='space-y-5'>
          <h1 className='text-xl text-white'>Login</h1>
          <div className='flex flex-col'>
            <label htmlFor='email'>
            <input
              id='email'
              className='w-full border-2 border-transparent
               p-2 rounded outline-none focus:border-purple-500'
              // required type='email'
              placeholder='Email'
              // size= {30}
              // value={this.state.email}
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
              // value={this.state.password}
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
