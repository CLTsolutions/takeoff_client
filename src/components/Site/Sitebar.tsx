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
// import Test from './TestComponent'
// import { Link, Route, Switch } from 'react-router-dom'
// import Home from './Home'
// import Flights from '../Flights/Flights'

type acceptedProps = {
  token: any
  logout: any
  // protectedViews: () => void
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
                  <Link to='/test'>Test</Link>
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
        {/* <Switch>
          <Route exact path='/'>
            <Home token={this.props.token} />
            {this.props.protectedViews}
          </Route>
          <Route exact path="/test"><Test /></Route>
          <Route exact path='/flights'><Flights /></Route>
        </Switch> */}
      </div>
    )
  }
}
