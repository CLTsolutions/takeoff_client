import React, { Component } from 'react'
import FlightsCard from './FlightsCard'
import CreateFlights from '../CRUD/CreateFlights'
import EditFlightsModal from '../CRUD/EditFlightsModal'

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
    // e.preventDefault()
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
      <div>
        <CreateFlights
          token={this.props.token}
          fetchFlights={this.fetchFlights}
        />
        <h2 className='text-center my-2'>Flights Library Lives Here:</h2>
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
    )
  }
}

export default Flights
