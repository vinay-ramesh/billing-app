import React from "react"
import CustomerContainer from "./CustomerContainer"

const MyCustomer = (props) => {

    return (
        <div>
            <h2 className=" container justify-content-centre align-items-centre">My Customers</h2>
            <CustomerContainer />
        </div>
    )
}

export default MyCustomer