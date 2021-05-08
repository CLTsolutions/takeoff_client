import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap'

type acceptedProps = {
  token: any
  logout: any
}

type valueTypes = {
  isOpen: boolean
}
export default class Sitebar extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  logoutButton = () => {
    return localStorage.getItem('sessionToken') === null ? (
      ''
    ) : (
      <Link to='/'>
        <button onClick={this.props.logout}>Logout</button>
      </Link>
    )
  }

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink>
                  <Link to='/'>Home</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/blog'>Blog</Link>
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>{this.logoutButton()}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
