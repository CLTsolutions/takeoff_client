import React, { Component } from 'react'
import FlightsForm from './FlightsForm'
// import { FlightsInfo } from '../../types'
// import * as HtmlDurationPicker from 'html-duration-picker'

type acceptedProps = {
  token: any
  fetchFlights: () => void
}

export interface FlightsState {
  flights: []
  airline: string
  flightNumber: number | string //'' for empty input value on initialization
  originAirport: string
  destAirport: string
  flightMiles: number | string //'' for empty input value on initialization
  flightTime: string
  international: boolean
  date: string
  // date: Date
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      flights: [],
      airline: '',
      flightNumber: '', //'' so input value initializes empty (instead of 0)
      originAirport: '',
      destAirport: '',
      flightMiles: '', //'' so input value initializes empty (instead of 0)
      flightTime: '',
      international: false,
      date: ''
      // date: new Date()
    }
  }

  newItem = (event: any) => {
    console.log(this.state);
    event.preventDefault();
    fetch(`http://localhost:3000/flight/`, {
      method: "POST",
      body: JSON.stringify({
        airline: this.state.airline,
        flightNumber: this.state.flightNumber,
        originAirport: this.state.originAirport,
        destAirport : this.state.destAirport,
        flightMiles: this.state.flightMiles,
        flightTime: this.state.flightTime,
        international: this.state.international
      }),
      headers: {
        "Content-Type":"application/json",
        'Authorization': `Bearer ${this.props.token}`
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
  }

  render() {
    return (
      <div>
        <h2 className='text-center'>Creating Flights:</h2>
          <div className='bg-white bg-opacity-50 max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl w-1/2'>
            <FlightsForm token={this.props.token} newFlight={this.newItem} fetchFlights={this.props.fetchFlights} />
        </div> 
      </div>
    )
  }
}

export default Flights