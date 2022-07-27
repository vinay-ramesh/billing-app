import React from "react";
import { Link, Route, withRouter } from "react-router-dom"
import Home from "./Home"
import RegisterUser from "./User_Components/RegisterUser"
import LoginUser from "./User_Components/LoginUser"
import Account from "./User_Components/Account";
import MyCustomer from "./Customer_Components/MyCustomer";
import MyProducts from "./Product_Components/MyProducts";
import MyBills from "./Bill_Components/MyBills";

const NavBar = (props) => {
    const { isLoggedIn, handleLogin } = props

    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link> </li>
                {
                    isLoggedIn ? (
                        <React.Fragment>
                            <li><Link to="/users/account">Account</Link></li>
                            <li><Link to="/customers">Customers</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/bills">Billing</Link></li>
                            <li><Link to="#" onClick={() => {
                                alert("Successfully logged out")
                                handleLogin()
                                props.history.push("/")
                            }}>logout</Link></li> <br />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li><Link to="/users/register">Register</Link></li>
                            <li><Link to="/users/login">login</Link></li>
                        </React.Fragment>
                    )
                }
            </ul>

            <Route path="/" component={Home} exact={true} />
            <Route path="/users/account" component={Account} exact={true} />
            <Route path="/users/register" component={RegisterUser} exact={true} />
            <Route path="/users/login" render={(props) => {
                return <LoginUser {...props} handleLogin={handleLogin} />
            }} exact={true} />
            <Route path="/customers" component={MyCustomer} />
            <Route path="/products" component={MyProducts} />
            <Route path="/bills" component={MyBills} />
        </div>
    )
}

/* const wrappedComponent = withRouter(NavBar)
export default wrappedComponent */

export default withRouter(NavBar)