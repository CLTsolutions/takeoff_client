import React, { Component } from 'react'
// import CreateFlights from '../Flights/CreateFlights'
import Flights from '../Flights/Flights'

type acceptedProps = {
  token: any
}
class Home extends Component<acceptedProps, {}> {
  constructor(props: acceptedProps) {
    super(props)
  }

  render() {
    return (
      <div>
        {/* <CreateFlights token={this.props.token} /> */}
        <Flights token={this.props.token}/>
      </div>
    )
  }
}

export default Home
