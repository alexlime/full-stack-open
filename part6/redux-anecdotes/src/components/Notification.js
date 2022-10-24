import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification.content

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

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification