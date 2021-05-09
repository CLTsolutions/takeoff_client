import React, { Component } from 'react'
// import { BaseUser } from '../../types'

type acceptedProps = {
  token: any
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
          <div className='flex flex-col'>
            <label htmlFor='email'>
              <input
                id='email'
                // required type='email'
                className='w-full border-2 border-transparent
               p-2 rounded outline-none focus:border-purple-500'
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
                required
                type='password'
                placeholder='Password'
                // minLength= {8}
                // value={this.state.password}
                name='password'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <button
            type='submit'
            className='py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mb-3'
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}
