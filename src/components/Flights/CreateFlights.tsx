import React, { Component } from 'react'
// import { FlightsInfo } from '../../types'

type acceptedProps = {
  token: any
  fetchFlights: () => void
}

interface FlightsState {
  [key: string]: string | number | boolean | Date
  airline: string
  flightNumber: number | string //'' for empty input value on initialization
  originAirport: string
  destAirport: string
  flightMiles: number | string //'' for empty input value on initialization
  flightTime: string
  international: boolean
  date: Date
  // setDate: (e: any) => void;
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      // Flights: []
      airline: '',
      flightNumber: '', //'' so input value initializes empty (instead of 0)
      originAirport: '',
      destAirport: '',
      flightMiles: '', //'' so input value initializes empty (instead of 0)
      flightTime: '',
      international: false,
      date: new Date(),
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

  newFlight = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
          date: this.state.date,
          international: this.state.international,
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
  inputToUppercase = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.value = ('' + e.target.value).toUpperCase()
  }

  //handles input fields onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
    // this.setState({ [e.target.name] : e.target.value })
    console.log(value)
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
                  value={this.state.airline}
                  name='airline'
                  onChange={this.handleChange}
                  onInput={this.inputToUppercase}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightNumber'>
                <input
                  id='flightNumber'
                  type='number' // only nums allowed in input field
                  min='0' //prevents negative nums
                  className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Flight #'
                  value={this.state.flightNumber}
                  name="flightNumber"
                  onChange={this.handleChange}
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
                  value={this.state.originAirport}
                  onChange={this.handleChange}
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
                  value={this.state.destAirport}
                  onChange={this.handleChange}
                  onInput={this.inputToUppercase}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightMiles'>
                <input
                  id='flightMiles'
                  type='number' // only nums allowed in input field
                  min='0' // prevents negative nums
                  className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                  placeholder='Flight Miles'
                  name='flightMiles'
                  value={this.state.flightMiles}
                  onChange={this.handleChange}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightTime'>
                <input
                  id='flightTime'
                  type='time'
                  className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                  placeholder='Flight Time'
                  // onChange={e => this.setState({ flightTime: e.target.value })}
                  value={this.state.flightTime}
                  name='flightTime'
                  onChange={this.handleChange}
                  // defaultValue={''}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='date'>
              <input
                id='date'
                type='date'
                // required type='date'
                className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                placeholder='Date'
                value={this.state.date}
                name='date'
                required pattern="\d{4}-\d{2}-\d{2}" //for unsupported browser
                onChange={this.handleChange}
                // defaultValue={''}
              />
              </label>
            </div>
            <div className='flex flex-col'>
              <label 
                htmlFor='international' className='international flex flex-row items-center text-gray-400'>
                International:
                <input
                  id='international'
                  type='checkbox'
                  className='p-4 ml-3 mr-1 checked:bg-blue-600 checked:border-transparent'
                  checked={this.state.international}
                  name='international'
                  onChange={this.handleChange}
                  // defaultChecked={false}
                />
              </label>
            </div>
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
