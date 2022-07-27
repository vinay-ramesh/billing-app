import React from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList"


const CustomerContainer = (props) => {
    return (
        <div>
            <CustomerList />
            <CustomerForm />
        </div>
    )
}

export default CustomerContainer