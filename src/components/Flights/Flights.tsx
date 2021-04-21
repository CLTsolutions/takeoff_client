import React, { Component } from 'react'

type acceptedProps = {
   token: any
}

// interface FlightsState {

// }

class Flights extends Component<acceptedProps, {}> {
   constructor(props: acceptedProps) {
      super(props)
   }

   fetchFlights = () => {
      fetch('http://localhost:3000/flight/', {
         method: 'GET',
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.token}`
         })
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
   }

   render() {
      return (
         <div>
            <h2 className='text-center mt-5'>Flights Library Lives Here:</h2>
            {this.fetchFlights()}
         </div>
      )
   }
}

export default Flights
