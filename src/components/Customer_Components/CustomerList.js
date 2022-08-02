import React, { useEffect, useState } from "react";
import CustomerItem from "./CustomerItem"
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCustomers } from "../../actions/customerActions";

const CustomerList = (props) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [sort, setSort] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetCustomers())
    }, [dispatch])

    const totalCustomers = useSelector((state) => {
        return state.customers
    })

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredCust = totalCustomers.filter((ele) => {
        return ele.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div>
            {/* <input type="text" placeholder="search by name" value={searchTerm} onChange={handleChange}
            /> */}
            <h3>Total customers - {totalCustomers.length}</h3>
            {totalCustomers.length === 0 ? (
                <div>
                    <h3>No customers found</h3>
                    <p>Add your first customer</p>
                </div>
            ) : (
                <CustomerItem totalCustomers={totalCustomers} />
            )}
            {/* {
                totalCustomers.length > 0 ? (
                    filteredCust.length > 0 ? (filteredCust.map((ele, index) => {
                        return (<CustomerItem key={index} {...ele} />)
                    })) : (
                        <h3>No matching results found</h3>
                    )
                ) : (
                    <div>
                        <h3>No movies found</h3>
                        <h3>Add Your First movie</h3>
                    </div>
                )
            } */}
        </div>
    )
}

export default CustomerList