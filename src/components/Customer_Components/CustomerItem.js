import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncRemoveCustomers } from "../../actions/customerActions";
import EditCustomer from "./EditCustomer";

const CustomerItem = (props) => {
    const { totalCustomers } = props
    const [toggleCustomer, setToggleCustomer] = useState(false)
    const [editCustomer, setEditCustomer] = useState({})
    const dispatch = useDispatch()

    const handleCustomerRemove = (id) => {
        const confirmRemoveCustomer = window.confirm("Are you sure??")
        if (confirmRemoveCustomer) {
            dispatch(asyncRemoveCustomers(id))
        }
    }

    const handleCustomerToggle = (id) => {
        setToggleCustomer(!toggleCustomer)

        id && (setEditCustomer(totalCustomers.filter(cus => cus._id === id)[0]))
        /* const bob = totalCustomers.filter(cus => cus._id === id)[0]
        console.log("bob", bob) */
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                {
                    toggleCustomer ? (
                        <div>
                            <EditCustomer handleCustomerToggle={handleCustomerToggle}
                                editCustomer={editCustomer} />
                            <button onClick={handleCustomerToggle}><i class="bi bi-x-square"></i></button>
                        </div>
                    ) : (
                        <div>
                            <table className="table table-hover table-striped">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        totalCustomers.map((cust, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{cust.name}</td>
                                                    <td>{cust.email}</td>
                                                    <td>{cust.mobile}</td>
                                                    <td><button onClick={() => { handleCustomerToggle(cust._id) }}><i class="bi bi-pencil-fill"></i></button></td>
                                                    <td><button onClick={() => {
                                                        handleCustomerRemove(cust._id)
                                                    }}><i class="bi bi-trash3-fill"></i></button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div >
                    )
                }
            </div >
        </div>
    )
}

export default CustomerItem