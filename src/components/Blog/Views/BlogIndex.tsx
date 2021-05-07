import React, { Component } from 'react'
import BlogCard from './BlogCard'
import CreateBlogPosts from '../CRUD/CreateBlogPosts'

type acceptedProps = {
  token: any
}

interface BlogIndexState {
  blog: string
  blogData: []
}

export class BlogIndex extends Component<acceptedProps, BlogIndexState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      blog: '',
      blogData: [],
    }
  }

  // wrapped in if to check if there's a token before it runs
  fetchBlog = async () => {
    // console.log(this.props)
    if (this.props.token) {
      try {
        const response = await fetch(`http://localhost:3000/blog/mine`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
          },
        })
        const data = await response.json()
        this.setState({ blogData: data })
        console.log('fetchingBlogs?', data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  componentDidMount = () => {
    // console.log(localStorage.getItem('sessionToken'))
    // this.fetchFlights()
    this.fetchBlog()
  }

  // eli added because token wasn't being passed before fetch called
  // calling fetch again until token passes
  componentDidUpdate(prev: acceptedProps) {
    if (prev.token !== this.props.token) {
      // this.fetchFlights()
      this.fetchBlog()
      console.log(this.props.token)
    }
  }

  render() {
    return (
      <div>
        <h2 className='text-center'>Blog Lives Here:</h2>
        <CreateBlogPosts token={this.props.token} fetchBlog={this.fetchBlog} />
        <BlogCard
          token={this.props.token}
          fetchBlog={this.fetchBlog}
          blogData={this.state.blogData}
        />
      </div>
    )
  }
}

export default BlogIndex
