import { connect } from 'react-redux'

const Notification = (props) => {
  const notificationStyle = {
    color: props.errorState ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (props.message === null) {
    return null
  }

  return (
    <div className="notification" style={notificationStyle}>
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    errorState: state.notification.errorState,
  }
}

export default connect(mapStateToProps, null)(Notification)
