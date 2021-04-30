import React, { Component } from 'react'

type acceptedProps = {
   token: any
}

// interface DeleteFlights {

// }

export class DeleteFlights extends Component<acceptedProps, {}> {
   constructor(props: acceptedProps) {
      super(props)
   }

   // deleteFlight = (id: any) => {
   //    fetch(`http://localhost:3000/flight/${id}`, {
   //        method: "PUT",
   //        headers: new Headers ({
   //            'Content-Type': 'application/json',
   //            Authorization: `Bearer ${this.props.token}`
   //        })
   //    })
   //    .then(() => {this.props.getFlights})
   //  }

   render() {
      return (
         <div>
            <h3>Edit</h3>
         </div>
      )
   }
}

export default DeleteFlights
