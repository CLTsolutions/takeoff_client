import React, { Component } from 'react'
import { Button } from 'antd'
// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { BaseUser } from '../../types'



type acceptedProps = {
  token: (token: string | null) => void
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

  handleSubmit = (e: any) => {
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
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.handleSubmit} className='space-y-5'>
          <h1 className='text-xl'>Login</h1>
          <div className='flex flex-col'>
            <label>
            <input
              className='w-full border-2 border-transparent
               p-2 rounded outline-none focus:border-purple-500'
              // required type='email'
              placeholder='Email'
              // size= {30}
              // value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            </label>
          </div>
          <div className='flex flex-col'>
            <label>
            <input
              className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
              required type='password'
              placeholder='Password'
              // minLength= {8}
              value={this.state.password}
              name='password'
              onChange={e => this.setState({ password: e.target.value })}
            />
            </label>
          </div>
          <Button htmlType='submit'>Submit</Button>
        </form>
        {/* <Form
          name='normal_login'
          className='login-form'
          onFinish={this.handleSubmit}
        >
          <Form.Item
            name='Email'
            rules={[{ message: 'Please input your email.' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
              onChange={e => this.setState({ email: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ message: 'Please input your password.' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
          </Form.Item>
        </Form> */}
      </div>
    )
  }
}
