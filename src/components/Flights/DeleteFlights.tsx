import React, { Component } from 'react'

type acceptedProps = {
   token: any
   fetchMyFlights: () => void
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
      // .then(() => this.fetchMyFlights())
      .then(() => {this.props.fetchMyFlights})
    }

   render() {
      return (
         <div>
            
         </div>
      )
   }
}

export default DeleteFlights
