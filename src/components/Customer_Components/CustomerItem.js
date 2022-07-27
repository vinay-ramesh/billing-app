import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncRemoveCustomers } from "../../actions/customerActions";
import EditCustomer from "./EditCustomer";

const CustomerItem = (props) => {
    const { _id, name, mobile, email } = props
    const [toggleCustomer, setToggleCustomer] = useState(false)
    const dispatch = useDispatch()

    const handleCustomerRemove = (id) => {
        const confirmRemoveCustomer = window.confirm("Are you sure??")
        if (confirmRemoveCustomer) {
            dispatch(asyncRemoveCustomers(id))
        }
    }

    const handleCustomerToggle = () => {
        setToggleCustomer(!toggleCustomer)
    }

    return (
        <div>
            {
                toggleCustomer ? (
                    <div>
                        <EditCustomer _id={_id} name={name} mobile={mobile} handleCustomerToggle={handleCustomerToggle} email={email} />
                        <button onClick={handleCustomerToggle}>cancel</button>
                    </div>
                ) : (
                    <div>
                        <h3>{name} - {mobile}</h3>
                        <button onClick={() => {
                            handleCustomerRemove(_id)
                        }}>Remove</button>
                        <button onClick={handleCustomerToggle}>Edit</button>
                    </div >
                )
            }
        </div >
    )
}

export default CustomerItem