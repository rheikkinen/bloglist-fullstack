import '../css/Notification.css'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  } else {
    window.scrollTo(0, 0)
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
