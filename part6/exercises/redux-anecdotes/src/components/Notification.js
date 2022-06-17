import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification} ) => notification.message )
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notification !== '' ? '' : 'hidden'
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification