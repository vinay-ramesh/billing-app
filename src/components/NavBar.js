import React from "react";
import { Route, withRouter } from "react-router-dom"
import Home from "./Home"
import RegisterUser from "./User_Components/RegisterUser"
import LoginUser from "./User_Components/LoginUser"
import Account from "./User_Components/Account";
import MyCustomer from "./Customer_Components/MyCustomer";
import MyProducts from "./Product_Components/MyProducts";
import MyBills from "./Bill_Components/MyBills";
import images from "../images/logo.jpg"

const NavBar = (props) => {
    const { isLoggedIn, handleLogin } = props

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <h1><img src={images} alt="logo" width="10%" height="10%" class="d-inline-block align-text-top" />Billing App</h1>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mb-2 mb-lg-0 nav-container justify-content-end">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {
                                isLoggedIn ? (
                                    <>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="/users/account">Account</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="/customers">Customers</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="/products">Products</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="/bills">Billing</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="#" onClick={() => {
                                                alert("Successfully logged out")
                                                handleLogin()
                                                props.history.push("/")
                                                localStorage.removeItem("token")
                                            }}>Logout</a>
                                        </li>
                                    </>
                                ) : (
                                    <React.Fragment>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="/users/register">Register</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="/users/login">Login</a>
                                        </li>
                                    </React.Fragment>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav >

            <Route path="/" component={Home} exact={true} />
            <Route path="/users/account" component={Account} exact={true} />
            <Route path="/users/register" component={RegisterUser} exact={true} />
            <Route path="/users/login" render={(props) => {
                return <LoginUser {...props} handleLogin={handleLogin} />
            }} exact={true} />
            <Route path="/customers" component={MyCustomer} />
            <Route path="/products" component={MyProducts} />
            <Route path="/bills" component={MyBills} />
        </div >
    )
}

/* const wrappedComponent = withRouter(NavBar)
export default wrappedComponent */

export default withRouter(NavBar)
