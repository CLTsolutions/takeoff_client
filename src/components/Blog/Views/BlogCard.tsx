import React, { Component } from 'react'
import moment from 'moment' // formats date on card
import { CreateBlogPostsState } from '../CRUD/CreateBlogPosts'

type acceptedProps = {
  token: string | null
  fetchBlog: Function
  blogData: []
}

interface BlogsCardState extends CreateBlogPostsState {
  id: number
  editMode: boolean
  // blog: []
  // testing: []
  // blogData: []
}

export class BlogsCard extends Component<acceptedProps, BlogsCardState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      id: Infinity,
      date: '',
      title: '',
      entry: '',
      editMode: false,
      // blog: [],
      // testing: [],
      // blogData: [],
    }
  }

  editBlog = async (id: any) => {
    // e.preventDefault()
    console.log('edit working?')
    try {
      const response = await fetch(`http://localhost:3000/blog/${id}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        }),
        body: JSON.stringify({
          date: this.state.date,
          title: this.state.title,
          entry: this.state.entry,
        }),
      })
      const data = await response.json()
      console.log(data)
      // this.props.updateOff()
      this.props.fetchBlog() // calling flight library again after updating new blog
    } catch (err) {
      console.log(err)
    }
  }

  deleteBlog = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/blog/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
    return this.props.fetchBlog() // updating blog list after one is deleted
  }

  // populates update field for update
  // getBlogDetails = async (id: number) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/blog/${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         date: this.state.date,
  //         title: this.state.title,
  //         entry: this.state.entry,
  //       }),
  //       headers: new Headers({
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${this.props.token}`,
  //       }),
  //     })
  //     const data = await response.json()
  //     console.log(data)
  //     this.setState({
  //       id: data.id,
  //       date: data.date,
  //       title: data.title,
  //       entry: data.entry,
  //     })
  //     // this.props.updateOff()
  //     // this.setState({ flights: data })
  //     this.props.fetchBlog() // calling flight library again after updating new flight
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  editMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    })
    console.log('edit mode on?')
  }

  renderEdit = () => {
    return <div></div>
  }

  render() {
    let dateFormat = 'MM/DD/YYYY'
    return (
      <div className='flex justify-center flex-wrap'>
        {this.props.blogData.length !== 0 ? (
          <>
            {this.props.blogData.map((post: any, index: number) => {
              // console.log(index.flightId)
              // this.fetchByFlight(index.flightId)
              console.log(post)
              return (
                <div
                  key={index}
                  className='overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 m-auto'
                >
                  <div className='w-full block h-full'>
                    <div className='bg-white dark:bg-gray-800 w-full p-4'>
                      <p className='text-indigo-500 text-md font-medium'>
                        {moment(post.date).format(dateFormat)}
                      </p>
                      <p className='text-indigo-800 text-xl font-medium mb-2'>
                        {post.title}
                      </p>
                      <p className='text-gray-800 font-light text-md'>
                        {post.entry}
                      </p>
                      <div>
                        {this.state.editMode ? (
                          <div>
                            <input
                              type='text'
                              defaultValue={this.state.title}
                            />
                            <button
                              className='focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-2 px-4 mx-1 mt-4 mb-2 rounded-full shadow-md text-pink-200 font-sans'
                              // onClick={e => this.deleteBlog(e, post.id)}
                              onClick={() => this.editBlog(post.id)}
                            >
                              Update
                            </button>
                          </div>
                        ) : (
                          <button
                            className='focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-2 px-4 mx-1 mt-4 mb-2 rounded-full shadow-md text-pink-200 font-sans'
                            // onClick={e => this.deleteBlog(e, post.id)}
                            onClick={this.editMode}
                          >
                            Update
                          </button>
                        )}
                        <button
                          className='focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-500 hover:bg-pink-300 py-2 px-4 mx-1 mt-4 mb-2 rounded-full shadow-md text-pink-200 font-sans'
                          onClick={e => this.deleteBlog(e, post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <h4 className='text-center'>Create a blog post!</h4>
        )}
      </div>
    )
  }
}

export default BlogsCard
