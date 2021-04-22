import React, { Component } from 'react'
// import { Button } from 'antd'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

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
    // e.preventDefault()
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
        {/* <form onSubmit={this.handleSubmit} className='space-y-5'>
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
          <div> */}
        {/* <input
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              required
              type='email'
              placeholder='Email'
              size= '30'
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
        </form> */}
        <Form
          name='normal_register'
          className='register-form'
          onFinish={this.handleSubmit}
        >
          <Form.Item
            name='firstName'
            rules={[{ message: 'Please input your first name.' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='First Name'
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            rules={[{ message: 'Please input your last name.' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Last Name'
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </Form.Item>
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
            rules={[{ required: true, message: 'Please input your password.' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
              onChange={e => this.setState({ password: e.target.value })}
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
              className='register-form-button'
            >
              Register
            </Button>
            {/* Or <a href=''>register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    )
  }
}
