const LogoutButton = ({ setUser, setLoggedIn, showNotification }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserDetails')
    setUser(null)
    setLoggedIn(false)
    showNotification('Successfully logged out', 'success')
  }

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default LogoutButton
