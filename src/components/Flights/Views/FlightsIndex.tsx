import React, { Component } from 'react'
import FlightsCard from './FlightsCard'
import CreateFlights from '../CRUD/CreateFlights'
import EditFlightsModal from '../CRUD/EditFlightsModal'
import './FlightIndex.css'

type acceptedProps = {
  token: any
}

interface FlightsState {
  myFlights: []
  // myFlights: Array<number>
  updateActive: boolean
  updateFlight: string
  open: boolean
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      myFlights: [],
      open: true,
      updateActive: false,
      updateFlight: '',
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
      const data = await response.json()
      this.setState({ myFlights: data })
      console.log(this.state.myFlights)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    // console.log(this.props.token)
    this.fetchFlights() // triggering a rerender to display newly created flights
  }

  editFlight = (flight: any) => {
    this.setState({ updateFlight: flight })
  }

  updateOn = () => {
    this.setState({ updateActive: true })
  }

  updateOff = () => {
    this.setState({ updateActive: false })
  }

  render() {
    return (
      <div className='bg'>
        <div className='flex flex-col md:flex-row h-screen'>
          {/* <div className='items-center lg:block w-full md:w-1/2 xl:w-1/2'> */}
          <div className='items-center lg:w-1/3 md:w-full'>
            <CreateFlights
              token={this.props.token}
              fetchFlights={this.fetchFlights}
            />
          </div>
          {/* <div className='items-center w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/2 px-6 lg:px-16 xl:px-12'> */}
          <div className='items-center lg:w-2/3 md:w-full'>
            <FlightsCard
              token={this.props.token}
              myFlights={this.state.myFlights}
              fetchFlights={this.fetchFlights}
              editFlight={this.editFlight}
              updateOn={this.updateOn}
            />
            {this.state.updateActive ? (
              <EditFlightsModal
                token={this.props.token}
                fetchFlights={this.fetchFlights}
                updateFlight={this.state.updateFlight}
                updateOff={this.updateOff}
                open={this.state.open}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Flights
