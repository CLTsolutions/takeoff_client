import React, { Component } from 'react'

type acceptedProps = {
  token: any
  fetchBlog: () => void
}

export interface CreateBlogPostsState {
  date: string
  title: string
  entry: string
}

//prettier-ignore
export class CreateBlogPosts extends Component<acceptedProps, CreateBlogPostsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      date: '',
      title: '',
      entry: '',
    }
  }

  newBlog = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/blog`, {
        method: 'POST',
        body: JSON.stringify({
          date: this.state.date,
          title: this.state.title,
          entry: this.state.entry,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        }),
      })
      const data = await response.json()
      console.log(data)
      // resets input fields after submit
      this.setState({
        date: '',
        title: '',
        entry: '',
      })
      // calling blog library again after creating new flight
      this.props.fetchBlog()
    } catch (err) {
      console.log(err)
    }
  }

  //handles input fields onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.value
    const name = target.name
    //prettier-ignore
    this.setState(({ [name]: value } as unknown) as Pick<CreateBlogPostsState, keyof CreateBlogPostsState>)
    console.log(value)
  }

  render() {
    return (
      <div className='bg-indigo-200 bg-opacity-50 max-w-2xl mx-auto p-5 md:p-12 rounded-lg shadow-2xl w-1/2 my-6'>
        <form className='space-y-3' onSubmit={this.newBlog}>
          <div className='flex flex-col text-center'>
            <label htmlFor='title'>
              <input
                id='title'
                type='text'
                className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent'
                value={this.state.title}
                name='title'
                placeholder='Title'
                onChange={this.handleChange}
                // defaultValue={""}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='date'>
              <input
                id='date'
                type='date'
                className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent'
                value={this.state.date}
                name='date'
                placeholder='Date'
                onChange={this.handleChange}
                // defaultValue={""}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='entry'>
              <textarea
                id='entry'
                className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent'
                value={this.state.entry}
                name='entry'
                placeholder='Entry'
                onChange={e => this.setState({ entry: e.target.value })}
                // defaultValue={""}
              />
            </label>
          </div>
          <button
            type='submit'
            className='py-2 px-4  bg-indigo-400 hover:bg-indigo-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-1/3 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default CreateBlogPosts
