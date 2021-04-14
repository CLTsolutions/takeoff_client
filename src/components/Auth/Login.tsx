import React, { Component } from 'react'
// import { FormGroup, Label, Form, Input } from "reactstrap";
// import { Form, Input, Button, Checkbox } from 'antd';
import { Button } from 'antd'
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

type acceptedProps = {
  token: any
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
    e.preDefault()
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
      <div className="login">
        {/* <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value})} />
                    </FormGroup>
                    <Button type="submit" color="primary">Login</Button>
                </Form> */}
        {/* <p className="text-gray-600 text-center pt-2 mb-8 font-bold text-2xl">Sign in to your bar cart.</p> */}
        <form className="space-y-5">
          <h4>Login</h4>
          <div>
            {/* <label>Email</label> */}
            <input
              className="w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500"
              required
              type="email"
              placeholder="Email"
              // size= '30'
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <input
              className="w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500"
              required
              type="password"
              placeholder="Password"
              // minLength='8'
              value={this.state.password}
              name="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </form>
      </div>
    )
  }
}
