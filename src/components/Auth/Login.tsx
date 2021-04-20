import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
// import { Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';



type acceptedProps = {
  token: (token: string | null) => void
}

type valueTypes = {
  email: string
  password: string
}

export default class Login extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = (e: any) => {
    // e.preventDefault()
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
        this.props.token(data.sessionToken)
        console.log(data)
      })
  }

  render() {
    return (
      <div className='login'>
        {/* <form onSubmit={this.handleSubmit} className='space-y-5'>
          <h1 className='text-xl'>Login</h1>
          <div>
            <input
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              required
              type='email'
              placeholder='Email'
              size= '30'
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <input
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              required
              type='password'
              placeholder='Password'
              minLength='8'
              value={this.state.password}
              name='password'
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <Button htmlType='submit'>Submit</Button>
        </form> */}
        <Form
          name='normal_login'
          className='login-form'
          onFinish={this.handleSubmit}
        >
          <Form.Item
            name='Email'
            rules={[{ required: true, message: 'Please input your email.' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password.' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          {/* <Form.Item>
            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
          </Form.Item> */}
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
            {/* Or <a href=''>register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    )
  }
}
