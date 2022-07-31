import React, { useState, useEffect } from "react"
import NavBar from "./components/NavBar"
import './Style.css'

const App = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            handleLogin()
        }
    }, [])

    return (
        <div>
            {/* <h1>Billing App</h1> */}
            <NavBar
                handleLogin={handleLogin}
                isLoggedIn={isLoggedIn}
            />
        </div>
    )
}

export default App