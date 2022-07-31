import React from "react";
import CustomerForm from "./CustomerForm";

const EditCustomer = (props) => {
    const { editCustomer, handleCustomerToggle } = props
    return (
        <div>
            <CustomerForm _id={editCustomer._id} name={editCustomer.name} mobile={editCustomer.mobile} email={editCustomer.email} handleCustomerToggle={handleCustomerToggle} />
        </div>
    )
}

export default EditCustomer 