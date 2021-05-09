import React, { Component } from 'react'
import moment from 'moment' // formats date on card
import { CreateBlogPostsState } from '../CRUD/CreateBlogPosts'

type acceptedProps = {
  token: string | null
  blogData: []
  fetchBlog: Function
  editBlog: Function
  updateOn: Function
}

interface BlogsCardState extends CreateBlogPostsState {
  id: number
  // editMode: boolean
  // blog: []
  // testing: []
  // blogData: []
}

export class BlogsCard extends Component<acceptedProps, BlogsCardState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      id: Infinity,
      blog: [],
      date: '',
      title: '',
      entry: '',
      // editMode: false,
      // blog: [],
      // testing: [],
      // blogData: [],
    }
  }

  // editBlog = async (id: any) => {
  //   // e.preventDefault()
  //   console.log('edit working?')
  //   try {
  //     const response = await fetch(`http://localhost:3000/blog/${id}`, {
  //       method: 'PUT',
  //       headers: new Headers({
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${this.props.token}`,
  //       }),
  //       body: JSON.stringify({
  //         date: this.state.date,
  //         title: this.state.title,
  //         entry: this.state.entry,
  //       }),
  //     })
  //     const data = await response.json()
  //     console.log(data)
  //     // this.props.updateOff()
  //     this.props.fetchBlog() // calling flight library again after updating new blog
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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

  render() {
    let dateFormat = 'MM/DD/YYYY'
    return (
      <div className='bg-opacity-100'>
        <div className='flex justify-center flex-wrap'>
          {this.props.blogData.length > 0 ? (
            <>
              {this.props.blogData.map((post: any, index: number) => {
                // console.log(post)
                return (
                  <div>
                    <div
                      key={index}
                      className='bg-gray-200 bg-opacity-60 overflow-hidden shadow-2xl rounded-lg h-90 w-1/2 my-4'
                    >
                      {post.entry}
                      {/* <div className='w-96 block h-full bg-opacity-50'> */}
                      {/* <div className='bg-white dark:bg-gray-800 w-full p-4'> */}
                      {/* <p className='text-indigo-500 text-md font-medium px-2'>
                      {moment(post.date).format(dateFormat)}
                    </p> */}
                      {/* <p>{post.entry}</p> */}
                      {/* 
                      <p className='bg-opacity-60 text-indigo-800 text-2xl font-medium px-2'>
                        {post.title}
                      </p>
                      <div>
                        <p className='bg-green-200 text-gray-800 text-md p-3 rounded-md'>
                          {post.entry}
                        </p>
                      </div> */}
                      {/* <div>
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
                        ) : (  */}
                      <div className='flex justify-center'>
                        <button
                          className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
                          onClick={() => {
                            this.props.editBlog(post)
                            this.props.updateOn()
                          }}
                        >
                          Update
                        </button>
                        <button
                          className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
                          onClick={(e) => this.deleteBlog(e, post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  // </div>
                )
              })}
            </>
          ) : (
            <>
              <h3>Create a blog post!</h3>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default BlogsCard
