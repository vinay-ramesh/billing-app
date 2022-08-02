import React from "react";
import { Route, withRouter } from "react-router-dom"
import Home from "./Home"
import RegisterUser from "./User_Components/RegisterUser"
import LoginUser from "./User_Components/LoginUser"
import Account from "./User_Components/Account";
import MyCustomer from "./Customer_Components/MyCustomer";
import MyProducts from "./Product_Components/MyProducts";
import images from "../images/logo.jpg"
import BillGenerator from "./Bill_Components/BillGenerator"
import BillContainer from "./Bill_Components/BillContainer";
import ViewBills from "./Bill_Components/ViewBills"

const NavBar = (props) => {
    const { isLoggedIn, handleLogin } = props

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <h1><img src={images} alt="logo" width="10%" height="10%" className="d-inline-block align-text-top" />Billing App</h1>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 nav-container justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {
                                isLoggedIn ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/users/account">Account</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/customers">Customers</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/products">Products</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/bills">Billing</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" onClick={() => {
                                                alert("Successfully logged out")
                                                handleLogin()
                                                props.history.push("/")
                                                localStorage.removeItem("token")
                                            }}>Logout</a>
                                        </li>
                                    </>
                                ) : (
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/users/register">Register</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/users/login">Login</a>
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
            <Route path="/bills" component={BillContainer} />
            <Route path="/billing/:billId" component={BillGenerator} />
            <Route path="/bill/all" component={ViewBills} />
        </div >
    )
}

/* const wrappedComponent = withRouter(NavBar)
export default wrappedComponent */

export default withRouter(NavBar)
