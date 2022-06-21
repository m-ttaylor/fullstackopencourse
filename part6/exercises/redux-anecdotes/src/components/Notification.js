import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(({ notification} ) => notification.message )
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: props.notification !== '' ? '' : 'hidden'
  }
  return (
    <div style={style}>
      { props.notification }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message
  }
}

export default connect(mapStateToProps, null)(Notification)