import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncInitialUserDetailsFetch } from "./actions/userActions"
import NavBar from "./components/NavBar"
import './Style.css'


const App = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    const allBills = useSelector((state) => {
        return state.bills
    })

    const userAccount = useSelector((state) => {
        return state.users
    })

    const allCustomers = useSelector((state) => {
        return state.customers
    })

    const allProducts = useSelector((state) => {
        return state.products
    })
    const isTokenFound = localStorage.hasOwnProperty("token")

    console.log("isloading", isLoading)
    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        if (isTokenFound) {
            dispatch(asyncInitialUserDetailsFetch(setIsLoading))
        } else {
            setIsLoading(!isLoading)
        }
    }, [setIsLoading])



    useEffect(() => {
        if (localStorage.getItem("token")) {
            handleLogin()
        }

    }, [])


    return (
        <>
            {
                !isLoading && (
                    <>
                        <div>
                            <div>
                                <NavBar
                                    handleLogin={handleLogin}
                                    isLoggedIn={isLoggedIn}
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default App
