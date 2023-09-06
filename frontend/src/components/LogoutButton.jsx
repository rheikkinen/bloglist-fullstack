const LogoutButton = ({ setUser, setLoggedIn, setNotification }) => {
    const handleLogout = () => {
        window.localStorage.removeItem('loggedUserDetails')
        setUser(null)
        setLoggedIn(false)
        setNotification({
            message: 'Successfully logged out',
            type: 'success'
        })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default LogoutButton