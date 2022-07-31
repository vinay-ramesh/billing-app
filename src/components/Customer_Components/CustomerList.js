import React, { useEffect } from "react";
import CustomerItem from "./CustomerItem"
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCustomers } from "../../actions/customerActions";

const CustomerList = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetCustomers())
    }, [dispatch])

    const totalCustomers = useSelector((state) => {
        return state.customers
    })

    return (
        <div>
            <h3>Total customers - {totalCustomers.length}</h3>
            {totalCustomers.length === 0 ? (
                <div>
                    <h3>No customers found</h3>
                    <p>Add your first customer</p>
                </div>
            ) : (
                <CustomerItem totalCustomers={totalCustomers} />
            )}
        </div>
    )
}

export default CustomerList