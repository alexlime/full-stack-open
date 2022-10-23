// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  const notification = props.notification

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if ( notification === null) {
    style = { ...style, display: 'none' }  
  }

  return (
    <div style={style}>
      { notification }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// export default Notification
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification