import React, { Component } from 'react'
import FlightsCard from './FlightsCard'
import CreateFlights from '../CRUD/CreateFlights'

type acceptedProps = {
  token: any
}

interface FlightsState {
  myFlights: []
  // myFlights: Array<number>
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      myFlights: []
    }
  }

  fetchFlights = async () => {
    try {
      const response = await fetch(`http://localhost:3000/flight/mine`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      const data = await response.json();
      this.setState({ myFlights: data })
      console.log(this.state.myFlights)
      return data;
    } catch (err) {
      console.log(err)
    } 
  }

  componentDidMount() {
    // console.log(this.props.token)
    this.fetchFlights() // triggering a rerender to display newly created flights
  }  
  
  render() {
    return (
      <div>
        <CreateFlights token={this.props.token} fetchFlights={this.fetchFlights} />
        <h2 className='text-center my-2'>Flights Library Lives Here:</h2>
        <FlightsCard token={this.props.token} myFlights={this.state.myFlights} fetchFlights={this.fetchFlights}/>
      </div>
    )
  }
}

export default Flights
