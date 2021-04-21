import React, { Component } from 'react'

type acceptedProps = {
   token: any
}

interface CreateFlightsState {
  airline: string
  flightNumber: number
  originAirport: string
  destAirport: string
  flightMiles: string
  flightTime: number
  international: boolean
  date: number
}

class Flights extends Component<acceptedProps, CreateFlightsState> {
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
        'Authorization': `Bearer ${this.props.token}`
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
        <h2 className='text-center'>Creating Flights:</h2>
        <div className='bg-white bg-opacity-50 max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl w-1/2'>
          <form
            className='space-y-3'
            onSubmit={this.newFlight}
          >
            <div className='flex flex-col'>
              <label>
              <input
                type='text'
                className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                placeholder='Airline'
                onChange={e => this.setState({ airline: e.target.value })}
              />
              </label>
            </div>
            <div className='flex flex-col'>
              <label>
              <input
                type='text'
                className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                placeholder='Flight #'
                onChange={e => this.setState({ flightNumber: parseInt(e.target.value) })}
              />
              </label>
            </div>
            <div className='flex flex-col'>
              <label className='flex flex-row items-center'>
                International
              <input
                type='checkbox'
                className='p-4 ml-3 mr-1 checked:bg-blue-600 checked:border-transparent'
                // checked={isStirred}
                name='stirred'
                onChange={e => this.setState({ international: e.target.checked })}
              />
              </label>
            </div>
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
              className='block mx-auto focus:outline-none focus:ring-2 focus:border-purple-500 bg-red-500 hover:bg-red-300 py-1 px-4 mt-4 rounded-full shadow-md text-red-200 font-sans'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Flights
