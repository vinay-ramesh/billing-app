import React from "react";
import BillForm from "./BillForm";
import { useHistory } from "react-router-dom";

const BillContainer = (props) => {
    const history = useHistory()

    const handleViewAllBill = () => {
        history.push("/bill/all")
    }
    return (
        <div>
            <div>
                <button onClick={handleViewAllBill}>View All</button>
            </div>

            <BillForm />
        </div>
    )
}

export default BillContainer