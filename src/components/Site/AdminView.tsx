import React, { Component } from 'react'

export class AdminView extends Component {
  render() {
    return (
      <div>
        <h3>
          This is an admin view that only admins can see. You must be an admin!
        </h3>
      </div>
    )
  }
}

export default AdminView
