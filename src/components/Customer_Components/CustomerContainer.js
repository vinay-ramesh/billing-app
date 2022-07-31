import React from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList"


const CustomerContainer = (props) => {
    return (
        <div className="container col-md-12 col-sm-12">
            <div className="customer-container">
                <CustomerList />
                <CustomerForm />
            </div>
        </div>
    )
}

export default CustomerContainer