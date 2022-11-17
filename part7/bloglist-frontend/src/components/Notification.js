import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  let style

  if (notification === null) {
    style = { ...style, display: 'none' }
  }

  return (
    <div style={style}>
      <Alert variant='success'>{notification}</Alert>
    </div>
  )
}

export default Notification
