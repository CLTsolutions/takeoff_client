import React, { Component } from 'react'

type acceptedProps = {
   token: any
}

interface FlightsState {
  airline: string
  flightNumber: number
  originAirport: string
  destAirport: string
  flightMiles: string
  flightTime: number
  international: boolean
  date: number
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      airline: '',
      flightNumber: 0,
      originAirport: '',
      destAirport: '',
      flightMiles: '',
      flightTime: 0,
      international: false,
      date: 0,
    }
  }

  newFlight = (e: any) => {
    e.preventDefault()
    fetch('http://localhost:3000/flight/', {
      method: 'POST',
      body: JSON.stringify({
        airline: this.state.airline,
        flightNumber: this.state.flightNumber,
        originAirport: this.state.originAirport,
        destAirport: this.state.destAirport,
        flightMiles: this.state.flightMiles,
        flightTime: this.state.flightTime,
        international: this.state.international,
        date: this.state.date,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>Here will be flights:</h1>
        <form
          className='flex flex-col space-y-3'
          onSubmit={this.newFlight}
        >
          <label>
            <input
              type='text'
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              placeholder='Airline'
              onChange={e => this.setState({ airline: e.target.value })}
            />
          </label>
          <label>
            <input
              type='text'
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              placeholder='Flight #'
              onChange={e => this.setState({ flightNumber: parseInt(e.target.value) })}
            />
          </label>
          {/* <label>
            <input
              type='text'
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              placeholder='Glass Type'
              onChange={e => setGlassType(e.target.value)}
            />
          </label>
          <label>
            <textarea
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              placeholder='Ingredients'
              onChange={e => setIngredients(e.target.value)}
            />
          </label>
          <label>
            <textarea
              className='w-full border-2 border-white p-2 rounded outline-none focus:border-purple-500'
              placeholder='Measurements'
              onChange={e => setMeasurements(e.target.value)}
            />
          </label>
          <label className='flex flex-row items-center'>
            Stirred
            <input
              type='checkbox'
              className='p-4 ml-3 mr-1'
              checked={isStirred}
              name='stirred'
              onChange={e => setIsStirred(e.target.checked)}
            />{' '}
            Yes
          </label> */}
          <button
            type='submit'
            className='focus:outline-none focus:ring-1 focus:border-purple-500 bg-red-500 hover:bg-red-300 py-1 px-4 mx-1 mt-4 rounded-full shadow-md text-red-200 font-sans'
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default Flights
