import React from "react";
import BillForm from "./BillForm";
import { useHistory } from "react-router-dom";

const BillContainer = (props) => {
    const history = useHistory()

    const handleViewAllBill = () => {
        history.push("/bill/all")
    }
    return (
        <div className="container-fluid p-2">
            <BillForm />
            <div className="container p-2">
                <button onClick={handleViewAllBill}>View All Bills</button>
            </div>
        </div>
    )
}

export default BillContainer