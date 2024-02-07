import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {title, id, isStarred, date} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-list">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button
          type="button"
          onClick={onClickStar}
          data-testId="star"
          className="star-btn"
        >
          <img src={starImgUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">date: {date}</p>
    </li>
  )
}
export default AppointmentItem
