import React, { Component } from 'react'
import moment from 'moment' // formats date on card
import EditFlightsModal from '../CRUD/EditFlightsModal'
// import EditFlights from '../CRUD/EditFlights'
import { FlightsState } from '../CRUD/CreateFlights'

type acceptedProps = {
  token: any
  myFlights: []
  fetchFlights: (e: any) => any //from flightIndex
  // isVisible: boolean
  editFlight: any
  updateOn: Function
}

interface FlightCardState extends FlightsState {
  id: any
  // showModal: boolean
}

export class FlightsCard extends Component<acceptedProps, FlightCardState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      id: Infinity,
      flights: [],
      airline: '',
      flightNumber: '', //'' so input value initializes empty (instead of 0)
      originAirport: '',
      destAirport: '',
      flightMiles: '', //'' so input value initializes empty (instead of 0)
      flightTime: '',
      international: false,
      date: '',
    }
  }

  deleteFlight = async (e: any, id: number) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/flight/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
    return this.props.fetchFlights(e) // updating flight list after one is deleted
  }

  render() {
    let dateFormat = 'MM/DD/YYYY'
    return (
      <div>
        <div className='flex justify-center flex-wrap'>
          {this.props.myFlights.length > 0 ? (
            <>
              {this.props.myFlights.map((flight: any, index: number) => {
                // console.log(flight)
                // console.log(index)
                return (
                  <div
                    className='mx-8 my-12 w-72 rounded-1xl bg-white border shadow-md overflow-hidden'
                    key={index}
                  >
                    <div>
                      <p className='mt-5 text-2xl text-gray-800 text-center mb-3 font-serif'>
                        {flight.airline}
                      </p>
                      <div className='grid grid-rows-8 grid-cols-2'>
                        <p className='col-start-1 col-end-2 ml-3'>
                          Flight Number:
                        </p>
                        <p className='col-start-2 col-end-3 justify-self-center font-serif'>
                          {flight.flightNumber}
                        </p>
                        <p className='col-start-1 col-end-2 row-start-2 ml-3'>
                          Flight Date:
                        </p>
                        <p className='col-start-2 col-end-3 row-start-2 justify-self-center font-serif'>
                          {moment(flight.date).format(dateFormat)}
                        </p>
                        <p className='col-start-1 col-end-2 row-start-3 ml-3'>
                          Origin:
                        </p>
                        <p className='col-start-2 col-end-3 row-start-3 justify-self-center'>
                          {flight.originAirport}
                        </p>
                        <p className='col-start-1 col-end-2 row-start-4 ml-3'>
                          Destination:
                        </p>
                        <p className='col-start-2 col-end-3 row-start-4 justify-self-center font-serif'>
                          {flight.destAirport}
                        </p>
                        <p className='col-start-1 col-end-2 row-start-5 ml-3'>
                          Flight Miles:
                        </p>
                        <p className='col-start-2 col-end-3 row-start-5 justify-self-center font-serif'>
                          {flight.flightMiles}
                        </p>
                        <p className='col-start-1 col-end-2 row-start-6 ml-3'>
                          Flight Time:
                        </p>
                        <p className='col-start-2 col-end-3 row-start-6 justify-self-center font-serif'>
                          {flight.flightTime}
                        </p>
                        <p className='col-start-1 col-end-2 row-start-7 ml-3'>
                          International:
                        </p>
                        {flight.international === true ? (
                          <p className='col-start-2 col-end-3 row-start-7 justify-self-center font-serif'>
                            Yes
                          </p>
                        ) : (
                          <p className='col-start-2 col-end-3 row-start-7 justify-self-center font-serif'>
                            No
                          </p>
                        )}
                      </div>
                      <div className='flex justify-center mb-3'>
                        <button
                          className='focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-2 px-4 mx-1 mt-4 mb-2 rounded-full shadow-md text-pink-200 font-sans'
                          onClick={() => {
                            this.props.editFlight(flight)
                            this.props.updateOn()
                            console.log(flight.id)
                          }}
                        >
                          Update
                        </button>
                        <button
                          className='focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-2 px-4 mx-1 mt-4 mb-2 rounded-full shadow-md text-pink-200 font-sans'
                          onClick={e => this.deleteFlight(e, flight.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <h3 className='mt-3'>
              You have flown zero miles. Create a flight!
            </h3>
          )}
        </div>
      </div>
    )
  }
}

export default FlightsCard
