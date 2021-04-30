import React, { Component } from 'react'
import moment from "moment"

type acceptedProps = {
   token: any
   myFlights: any
   fetchFlights: Function
}



export class FlightsCard extends Component<acceptedProps, {}> {
   constructor(props: acceptedProps) {
      super(props)
   }

   deleteFlight = async (id: number) => {
      await fetch(`http://localhost:3000/flight/${id}`, {
         method: "DELETE",
         headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.token}`
         })
      })
      return this.props.fetchFlights() // updating flight list after one is deleted
   }
   
   componentDidUpdate = () => {
      // console.log(this.props.myFlights)
   }

   render() {
      let dateFormat = "MM/DD/YYYY"
      return (
         <div>
            <div className="flex justify-center flex-wrap">
               {this.props.myFlights.length > 0 ? (
                  <>
                  {this.props.myFlights.map((flight: any) => {
                     return (
                        <div
                        // className="m-4 p-4 max-w-sm border rounded shadow-lg bg-gray-50"
                        className='mx-8 my-12 w-72 rounded-1xl bg-white border shadow-md overflow-hidden'
                        key={flight.id}
                        >
                           <div>
                              <p className="mt-5 text-2xl text-gray-800 text-center mb-3 font-serif">
                                 {flight.airline}
                              </p>
                              <div className='grid grid-rows-7 grid-cols-2'>
                                 <p className='col-start-1 col-end-2 ml-3'>Flight Number:</p>
                                 <p className="col-start-2 col-end-3 justify-self-center font-serif">
                                    {flight.flightNumber}
                                 </p>
                                 <p className='col-start-1 col-end-2 row-start-2 ml-3'>Flight Date:</p>
                                 <p className="col-start-2 col-end-3 row-start-2 justify-self-center font-serif">
                                    {/* {flight.date !== null
                                       ? flight.date.split('-').reverse().join('-')
                                       : flight.date
                                    } */}
                                    {moment(flight.date).format(dateFormat)}
                                 </p>
                                 <p className='col-start-1 col-end-2 row-start-3 ml-3'>Origin:</p>
                                 <p className="col-start-2 col-end-3 row-start-3 justify-self-center">
                                    {flight.originAirport}
                                 </p>
                                 <p className='col-start-1 col-end-2 row-start-4 ml-3'>Destination:</p>
                                 <p className="col-start-2 col-end-3 row-start-4 justify-self-center font-serif">
                                    {flight.destAirport}
                                 </p>
                                 <p className='col-start-1 col-end-2 row-start-5 ml-3'>Flight Miles:</p>
                                 <p className="col-start-2 col-end-3 row-start-5 justify-self-center font-serif">
                                    {flight.flightMiles}
                                 </p>
                                 <p className='col-start-1 col-end-2 row-start-6 ml-3'>Flight Time:</p>
                                 <p className="col-start-2 col-end-3 row-start-6 justify-self-center font-serif">
                                    {flight.flightTime}
                                 </p>
                              </div>
                              <div className='flex justify-center mb-3'>
                                 <button
                                    className="focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-2 px-4 mx-1 mt-4 mb-2 rounded-full shadow-md text-pink-200 font-sans"
                                    // onClick={() => {
                                    // cocktailsToUpdate === Infinity
                                    //    ? setCocktailsToUpdate(cocktail.id)
                                    //    : setCocktailsToUpdate(Infinity);
                                    // }}
                                 >
                                 Update
                                 </button>
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
                                    className="focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-2 px-4 mx-1 mt-4 mb-2 rounded-full shadow-md text-pink-200 font-sans"
                                    onClick={() => this.deleteFlight(flight.id)}
                                 >
                                 Delete
                                 </button>
                                 {/* )} */}
                              </div>
                           </div>
                        </div>
                     );
                  })}
                  </>
               ) : <h3 className='mt-3'>You have flown zero miles. Create a flight!</h3>}
            </div>
         </div>
      )
   }
}

export default FlightsCard
