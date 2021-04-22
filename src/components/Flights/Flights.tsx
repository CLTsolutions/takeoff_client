import React, { Component } from 'react'
import CreateFlights from './CreateFlights'

type acceptedProps = {
  token: any
}

interface FlightsState {
  myFlights: []
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      myFlights: []
    }
  }

  
  // fetchFlights = () => {
    //    fetch(`http://localhost:3000/flight/`, {
      //       method: 'GET',
  //       headers: new Headers({
  //          'Content-Type': 'application/json',
  //          'Authorization': `Bearer ${this.props.token}`
  //       })
  //    })
  //    .then(res => res.json())
  //    .then(data => console.log(data))
  //    .catch(err => console.log(err))
  // }
  fetchMyFlights = () => {
    fetch(`http://localhost:3000/flight/mine`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({ myFlights: data })
      // console.log(this.state.myFlights);
    })
  }

  componentDidMount() {
    console.log(this.props.token)
    this.fetchMyFlights()
  }
  
  render() {
    return (
      <div>
        <h2 className='text-center mt-5'>Flights Library Lives Here:</h2>
        {/* {this.fetchMyFlights()} */}
        <div className='flex justify-between flex-wrap'>
          {this.state.myFlights.map((flight: any, index: number) => (
            <p className='mt-5' key={index}>{flight.airline}</p>
          ))}
        </div>
      </div>
    )
  }
}

export default Flights
