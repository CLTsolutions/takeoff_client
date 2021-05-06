import { Modal } from 'antd'
import React, { Component } from 'react'
import FlightsCard from '../Views/FlightsCard'
import { FlightsState } from '../CRUD/CreateFlights'
// import * as HtmlDurationPicker from 'html-duration-picker'

interface acceptedProps {
  // id: number
  // myFlights: []
  token: any
  updateOff: () => void
  fetchFlights: () => void
  updateFlight: any
  open: boolean
}

interface EditFlightsModalState extends FlightsState {
  isModalVisible: boolean
}
//prettier-ignore
export class EditFlightsModal extends Component<acceptedProps, EditFlightsModalState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      isModalVisible: true,
      // id: Infinity,
      // showModal: false,
      flights: [],
      airline: '',
      flightNumber: '', //'' so input value initializes empty (instead of 0)
      originAirport: '',
      destAirport: '',
      flightMiles: '', //'' so input value initializes empty (instead of 0)
      flightTime: '',
      international: false,
      // date: new Date()
      date: '',
    }
  }

  editFlight = async (id: any) => {
    // e.preventDefault()
    console.log('random')
    try {
      const response = await fetch(
        `http://localhost:3000/flight/${this.props.updateFlight.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            airline: this.state.airline,
            flightNumber: this.state.flightNumber,
            originAirport: this.state.originAirport,
            destAirport: this.state.destAirport,
            flightMiles: this.state.flightMiles,
            flightTime: this.state.flightTime,
            date: this.state.date,
            international: this.state.international,
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
          }),
        }
      )
      const data = await response.json()
      console.log(data)
      console.log(id)
      this.props.updateOff()
      // this.setState({ flights: data })
      this.props.fetchFlights() // calling flight library again after updating new flight
    } catch (err) {
      console.log(err)
    }
  }

  // changes input field to uppercase
  inputToUppercase = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.value = ('' + e.target.value).toUpperCase()
  }

  // handles input fields onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    //prettier-ignore
    this.setState(({ [name]: value } as unknown) as Pick<FlightsState,keyof FlightsState>)
    console.log(value)
  }

  //  // for duration input field in form
  // ngAfterViewInit() {
  //    HtmlDurationPicker.init();
  // }

  handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e)
    this.setState({ isModalVisible: false })
  }

  handleCancel = () => {
    // this.setState({ isModalVisible: false })
    this.props.updateOff()
    // this.setState({isModalVisible: !this.state.isModalVisible})
  }

  render() {
    return (
      <div>
        <div>
          {/* <Button type="primary" onClick={this.showModal}>Open Modal</Button> */}
          <Modal
            title='Update Flight Information'
            visible={true}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            // footer={null}
            footer={[
              <button
                key='back'
                onClick={this.handleCancel}
                className='block mx-auto focus:outline-none focus:ring-2 focus:border-purple-500 bg-red-500 hover:bg-red-300 py-1 px-4 mt-4 rounded-full shadow-md text-red-200 font-sans'
              >
                Cancel
              </button>,
              <button
                type='submit'
                className='block mx-auto focus:outline-none focus:ring-2 focus:border-purple-500 bg-red-500 hover:bg-red-300 py-1 px-4 mt-4 rounded-full shadow-md text-red-200 font-sans'
              >
                Submit
              </button>,
            ]}
          >
            {console.log(this.state.airline)}
            <form
              className='space-y-3'
              onSubmit={e => {
                e.preventDefault()
                {
                  this.editFlight(e)
                }
                // {this.props.fetchFlights()}
              }}
            >
              <div className='flex flex-col'>
                {/*'htmlFor links input to label by corresponding id for screen readers */}
                <label htmlFor='airline'>
                  <input
                    id='airline'
                    type='text'
                    className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Airline'
                    value={this.state.airline}
                    name='airline'
                    onChange={this.handleChange}
                    onInput={this.inputToUppercase}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='flightNumber'>
                  <input
                    id='flightNumber'
                    type='number' // only nums allowed in input field
                    min='0' //prevents negative nums
                    className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                    placeholder='Flight #'
                    value={this.state.flightNumber}
                    name='flightNumber'
                    onChange={this.handleChange}
                    // defaultValue={''}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='originAirport'>
                  <input
                    id='originAirport'
                    type='text'
                    className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Origin Airport'
                    name='originAirport'
                    value={this.state.originAirport}
                    onChange={this.handleChange}
                    onInput={this.inputToUppercase}
                    // defaultValue={''}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='destAirport'>
                  <input
                    id='destAirport'
                    type='text'
                    className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Destination Airport'
                    name='destAirport'
                    value={this.state.destAirport}
                    onChange={this.handleChange}
                    onInput={this.inputToUppercase}
                    // defaultValue={''}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='flightMiles'>
                  <input
                    id='flightMiles'
                    type='number' // only nums allowed in input field
                    min='0' // prevents negative nums
                    className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Flight Miles'
                    name='flightMiles'
                    value={this.state.flightMiles}
                    onChange={this.handleChange}
                    // defaultValue={''}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='flightTime'>
                  <input
                    id='flightTime'
                    type='text'
                    // min='0'
                    // max='24'
                    className='html-duration-picker w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                    data-hide-seconds
                    placeholder='Flight Time'
                    value={this.state.flightTime}
                    name='flightTime'
                    onChange={this.handleChange}
                    // defaultValue={''}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='date'>
                  <input
                    id='date'
                    type='date'
                    // required type='date'
                    className='w-full border-2 border-transparent p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Date'
                    value={this.state.date}
                    name='date'
                    //  required pattern="\d{4}-\d{2}-\d{2}" //for unsupported browsers
                    onChange={this.handleChange}
                    // defaultValue={''}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label
                  htmlFor='international'
                  className='international flex flex-row items-center text-gray-400'
                >
                  International:
                  <input
                    id='international'
                    type='checkbox'
                    className='p-4 ml-3 mr-1 checked:bg-blue-600 checked:border-transparent'
                    checked={this.state.international}
                    name='international'
                    onChange={this.handleChange}
                    // defaultChecked={false}
                  />
                </label>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default EditFlightsModal
