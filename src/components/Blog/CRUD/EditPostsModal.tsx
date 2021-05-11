import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { CreateBlogPostsState } from '../CRUD/CreateBlogPosts'

type acceptedProps = {
  token: any
  updateOff: () => void
  fetchBlog: () => void
  updateBlog: any
  open: boolean
}

export interface UpdateBlogPostsState extends CreateBlogPostsState {
  isModalVisible: boolean
  // date: string
  // title: string
  // entry: string
}

//prettier-ignore
export class UpdateBlogPosts extends Component<acceptedProps, UpdateBlogPostsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      isModalVisible: true,
      blog: [],
      // date: '',
      // title: '',
      // entry: '',
      date: this.props.updateBlog.date,
      title: this.props.updateBlog.title,
      entry: this.props.updateBlog.entry,
    }
  }

  editBlog = async (id: any) => {
    console.log('edit working?')
    try {
      const response = await fetch(`http://localhost:3000/blog/${this.props.updateBlog.id}`, {
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

  //handles input fields onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    // const value = target.type === 'checkbox' ? target.checked : target.value
    const value = target.value
    const name = target.name
    //prettier-ignore
    this.setState(({ [name]: value } as unknown) as Pick<UpdateBlogPostsState, keyof UpdateBlogPostsState>)
    console.log(value)
  }

  modalToggle = () => {
    this.setState({ isModalVisible: false })
    this.props.updateOff()
  }

  render() {
    return (
      <div>
    {/* <Button color="danger" onClick={this.modalToggle}>Submit</Button> */}
    <Modal isOpen={this.state.isModalVisible} toggle={this.modalToggle}>
    <ModalHeader toggle={this.modalToggle}>Update your blog post.</ModalHeader>
    <ModalBody>
      {/* <div className='bg-indigo-200 bg-opacity-50 max-w-2xl mx-auto p-5 md:p-12 rounded-lg shadow-2xl w-1/2 my-6'> */}
        {/* <form className='space-y-3' onSubmit={this.editBlog}> */}
          <div className='flex flex-col text-center'>
            <label htmlFor='blogTitle'>
              <input
                id='blogTitle'
                type='text'
                className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                value={this.state.title}
                name='title'
                placeholder='Title'
                onChange={this.handleChange}
                // defaultValue={""}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='blogDate'>
              <input
                id='blogDate'
                type='date'
                className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                value={this.state.date}
                name='date'
                placeholder='Date'
                onChange={this.handleChange}
                // defaultValue={""}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='blogEntry'>
              <textarea
                id='blogEntry'
                className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                value={this.state.entry}
                name='entry'
                placeholder='Entry'
                onChange={e => this.setState({ entry: e.target.value })}
                // defaultValue={""}
              />
            </label>
          </div>
        {/* </form> */}
        {/* </div> */}
        </ModalBody>
          {/* <button
            type='submit'
            className='py-2 px-4  bg-indigo-400 hover:bg-indigo-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-1/3 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
          >
            Submit
          </button> */}
          <ModalFooter>
          <button
            className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
            onClick={(id: any) => {
              this.editBlog(id)
              this.modalToggle()
            }}
          >
            Update
          </button>
          <button
            className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
            onClick={this.modalToggle}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}

export default UpdateBlogPosts
