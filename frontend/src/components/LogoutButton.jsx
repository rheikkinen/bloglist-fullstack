const LogoutButton = ({ setUser, setLoggedIn }) => {
    const handleLogout = () => {
        window.localStorage.removeItem('loggedUserDetails')
        setUser(null)
        setLoggedIn(false)
    }

    return (
        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default LogoutButton