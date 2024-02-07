import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.isState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredList = () => {
    const {isFilterActive, appointmentList} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  renderAppointmentList = () => {
    const getFilteredList = this.getFilteredList()

    return getFilteredList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleIsStarred={this.toggleIsStarred}
      />
    ))
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredStarredBtn = isFilterActive
      ? 'filter-active-bg'
      : 'filter-inactive-bg'
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="">Add Appointment</h1>
          <div className="appointments-container">
            <form className="form" onSubmit={this.onAddAppointment}>
              <div>
                <label htmlFor="titleInput" className="label">
                  Title
                </label>
                <input
                  type="text"
                  className="input"
                  value={titleInput}
                  placeholder="Title"
                  id="titleInput"
                  onChange={this.onChangeTitle}
                />
              </div>
              <div>
                <label htmlFor="dateInput" className="label">
                  date
                </label>
                <input
                  type="date"
                  className="input"
                  id="dateInput"
                  value={dateInput}
                  placeholder="dd/mm/yyy"
                  onChange={this.onChangeDateInput}
                />
              </div>
              <button type="submit" className="button">
                add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="header-filter-container">
            <h1>Appointments </h1>
            <button
              className={`starred-btn ${filteredStarredBtn}`}
              onClick={this.onFilter}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">{this.renderAppointmentList()}</ul>
        </div>
      </div>
    )
  }
}
export default Appointments
