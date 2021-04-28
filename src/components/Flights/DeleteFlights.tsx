import React, { Component } from 'react'

type acceptedProps = {
   token: any
   getFlights: () => void
}

// interface DeleteFlights {

// }

export class DeleteFlights extends Component<acceptedProps, {}> {
   constructor(props: acceptedProps) {
      super(props)
   }

   deleteFlight = (id: any) => {
      fetch(`http://localhost:3000/flight/${id}`, {
          method: "DELETE",
          headers: new Headers ({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.props.token}`
          })
      })
      // .then(() => this.fetchFlights())
      .then(() => {this.props.getFlights})
    }

   render() {
      return (
         <div>
            
         </div>
      )
   }
}

export default DeleteFlights
