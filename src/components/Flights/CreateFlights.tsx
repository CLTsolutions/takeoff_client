import React, { Component } from 'react'
// import { FlightsInfo } from '../../types'

type acceptedProps = {
  token: any
  // fetchFlights: () => void
  fetchFlights: (() => any)
}

interface FlightsState {
  [key: string]: string | number
  airline: string
  flightNumber: number
  originAirport: string
  destAirport: string
  flightMiles: number
  flightTime: string
  // international: boolean
  // date: Date
  // setDate: (e: any) => void;
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      // Flights: []
      airline: '',
      flightNumber: 0,
      originAirport: '',
      destAirport: '',
      flightMiles: 0,
      flightTime: '',
      // international: false,
      // date: new Date(),
      // setDate: (date) => this.setState({ date: date })
    }
  }

  // newFlight = (e: any) => {
  //   e.preventDefault()
  //   fetch(`http://localhost:3000/flight/`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       airline: this.state.airline,
  //       flightNumber: this.state.flightNumber,
  //       originAirport: this.state.originAirport,
  //       destAirport: this.state.destAirport,
  //       flightMiles: this.state.flightMiles,
  //       flightTime: this.state.flightTime,
  //       // date: this.state.date,
  //       // international: this.state.international,
  //     }),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.props.token}`,
  //     }),
  //   })
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .then(() => this.props.fetchFlights()) // calling flight library again after creating new flight
  //   .catch(err => console.log(err))
  // }

  newFlight = async (e: any) => {
    e.preventDefault()
    try { 
      const response = await fetch(`http://localhost:3000/flight/`, {
        method: 'POST',
        body: JSON.stringify({
          airline: this.state.airline,
          flightNumber: this.state.flightNumber,
          originAirport: this.state.originAirport,
          destAirport: this.state.destAirport,
          flightMiles: this.state.flightMiles,
          flightTime: this.state.flightTime,
          // date: this.state.date,
          // international: this.state.international,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`,
        }),
      })
      const data = await response.json();
      console.log(data)
      return this.props.fetchFlights() // calling flight library again after creating new flight
    } catch (err) {
      console.log(err)
    }
  }

  // changes form input to uppercase
  inputToUppercase = (e: any) => {
    e.target.value = ('' + e.target.value).toUpperCase()
  }

  handleInputFields = (e: any) => {
    // const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
    // this.setState({ [e.target.name] : e.target.value })
  }

  // handleChangeDate = (date: any) => this.setState({ date: date })

  render() {
    return (
      <div>
        <h2 className='text-center'>Creating Flights:</h2>
        <div className='bg-white bg-opacity-50 max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl w-1/2'>
          <form className='space-y-3' onSubmit={this.newFlight}>
            <div className='flex flex-col'>
              {/*'htmlFor links input to label by corresponding id for screen readers */}
              <label htmlFor='airline'>
                <input
                  id='airline'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                  placeholder='Airline'
                  name='airline'
                  onChange={this.handleInputFields}
                  onInput={this.inputToUppercase}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightNumber'>
                <input
                  id='flightNumber'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Flight #'
                  name="flightNumber"
                  onChange={this.handleInputFields}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='originAirport'>
                <input
                  id='originAirport'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                  placeholder='Origin Airport'
                  name='originAirport'
                  onChange={this.handleInputFields}
                  onInput={this.inputToUppercase}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='destAirport'>
                <input
                  id='destAirport'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                  placeholder='Destination Airport'
                  name='destAirport'
                  onChange={this.handleInputFields}
                  onInput={this.inputToUppercase}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightMiles'>
                <input
                  id='flightMiles'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                  placeholder='Flight Miles'
                  name='flightMiles'
                  onChange={this.handleInputFields}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label className='flightTime'>
                <input
                  id='flightTime'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                  placeholder='Flight Time'
                  // onChange={e => this.setState({ flightTime: e.target.value })}
                  name='flightTime'
                  onChange={this.handleInputFields}
                  // defaultValue={''}
                />
              </label>
            </div>
            {/* 
            <div className='flex flex-col'>
              <label>
              <input
                type='date'
                className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                placeholder='Date'
                // onChange={date => this.setState({ date: date.target.value })}
                onChange={date => this.setState({ new Date(date) })}
                // onChange={this.handleFields}
                // defaultValue={''}
              />
              </label>
            </div>
            
            <div className='flex flex-col'>
              <label className='flex flex-row items-center text-gray-400'>
                International
              <input
                type='checkbox'
                className='p-4 ml-3 mr-1 checked:bg-blue-600 checked:border-transparent'
                // checked={isStirred}
                name='international'
                onChange={e => this.setState({ international: e.target.checked })}
                // onChange={this.handleFields}
                defaultChecked={false}
              />
              </label>
            </div> */}
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
