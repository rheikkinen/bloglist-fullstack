import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  } else {
    window.scrollTo(0, 0)
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
