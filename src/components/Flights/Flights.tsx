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

  deleteFlight = (id: any) => {
    fetch(`http://localhost:3000/flight/${id}`, {
        method: "DELETE",
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        })
    })
    .then(() => this.fetchMyFlights())
  }
  
  render() {
    return (
      <div>
        <CreateFlights token={this.props.token} getFlights={this.fetchMyFlights} />
        <h2 className='text-center my-2'>Flights Library Lives Here:</h2>
        {/* {this.fetchMyFlights()} */}
        {/* <div className='flex flex-row flex-wrap'>
          {this.state.myFlights.map((flight: any, index: number) => (
            <p className='mt-5 mx-2 border-4' key={index}>{flight.airline}</p>
          ))}
        </div> */}
        <div className="flex justify-center flex-wrap">
          {this.state.myFlights.length > 0 ? (
            <>
              {this.state.myFlights.map((flight: any) => {
                return (
                  <div
                    // className="m-4 p-4 max-w-sm border rounded shadow-lg bg-gray-50"
                    className='mx-8 my-12 w-72 rounded-1xl bg-white border shadow-md overflow-hidden'
                    key={flight.id}
                  >
                    <p className="mt-5 text-2xl text-gray-800 text-center mb-3 font-serif">
                      {flight.airline}
                    </p>
                    <p className="text-md text-center font-serif mb-5">
                      {flight.originAirport}
                    </p>
                    <p className="text-md text-center font-serif mb-5">
                      {flight.destAirport}
                    </p>
                    <p className="text-md text-center font-serif mb-5">
                      {flight.flightMiles}
                    </p>
                    <p className="text-md text-center font-serif mb-5">
                      {flight.flightNumber}
                    </p>
                    <p className="text-md text-center font-serif mb-5">
                      {flight.flightTime}
                    </p>
                    {/* <div className="mb-2"> */}
                      {/* <button
                        className="focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-1 px-4 mx-1 mt-4 rounded-full shadow-md text-pink-200 font-sans"
                        onClick={() => {
                          cocktailsToUpdate === Infinity
                            ? setCocktailsToUpdate(cocktail.id)
                            : setCocktailsToUpdate(Infinity);
                        }}
                      >
                        Update
                      </button> */}
                      {/* below toggles to update form when update button is clicked */}
                      {/*  {cocktailsToUpdate === cocktail.id ? (
                        <UpdateModal
                          updateCocktail={updateCocktail}
                          cocktail={cocktail}
                          id={cocktail.id}
                          fetchDrinks={fetchDrinks}
                          setCocktailsToUpdate={setCocktailsToUpdate}
                        />
                      ) : ( */}
                      <button
                        className="focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-1 px-4 mx-1 mt-4 rounded-full shadow-md text-pink-200 font-sans"
                        onClick={() => this.deleteFlight(flight.id)}
                      >
                        Delete
                      </button>
                      {/* )} */}
                    {/* </div> */}
                    <br />
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    )
  }
}

export default Flights
