import React, { Component } from 'react'
import BlogsCard from './BlogsCard'

type acceptedProps = {
  token: string | null
}

interface ReviewsIndexState {
  // id: any
  blog: string
}

export class ReviewsIndex extends Component<acceptedProps, ReviewsIndexState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      // id: '',
      blog: '',
    }
  }

  componentDidMount() {
    // this.fetchBlogs()
  }

  //   fetchReviews = async (): Promise<void> => {
  //     // e.preventDefault()
  //     try {
  //       const response = await fetch(`http://localhost:3000/flight/user`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${this.props.token}`,
  //         },
  //       })
  //       const data = await response.json()
  //       this.setState({ blog: data })
  //       console.log(this.state.blog)
  //       return data
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  fetchBlogs = (id: any) => {
    console.log(this.props.token)
    fetch(`http://localhost:3000/flight/${flight.id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('hello')
        console.log('this is the data we want', res)
        this.setState({ blog: res.blog })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h2 className='text-center'>Blog Lives Here:</h2>
        {/* {() => this.fetchBlogs()} */}
        {/* {this.fetchBlogs} */}
        <BlogsCard token={this.props.token} />
      </div>
    )
  }
}

export default ReviewsIndex
