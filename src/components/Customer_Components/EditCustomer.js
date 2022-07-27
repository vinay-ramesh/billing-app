import React from "react";
import CustomerForm from "./CustomerForm";

const EditCustomer = (props) => {
    const { _id, name, mobile, handleCustomerToggle, email } = props
    return (
        <div>
            <CustomerForm _id={_id} name={name} mobile={mobile} email={email} handleCustomerToggle={handleCustomerToggle} />
        </div>
    )
}

export default EditCustomer