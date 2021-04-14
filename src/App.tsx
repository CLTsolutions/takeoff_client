import React, { Component } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Auth from "./components/Auth/Auth"
import Navbar from './components/Site/Navbar'

type valueTypes = {
  token: any
}

class App extends Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props)
    this.state = {
      token: ""
    }
}

componentDidMount() {
  if(localStorage.getItem("sessionToken")) {
    this.setState({
      token: localStorage.getItem("sessionToken")
    })
  }
}

updateToken = (newToken: any) => {
  localStorage.setItem("sessionToken", newToken)
  this.setState({ token: newToken})
  console.log("is this updating the token", this.state.token)
}

clearToken = () => {
  localStorage.clear();
  this.setState({ token: '' })
  console.log('token cleared')
}


  render() {
    return (
      <div className="App">
        <Navbar logout={this.clearToken} token={this.updateToken} />
        <Auth token={this.updateToken} />
      </div>
    )
  }
}

export default App