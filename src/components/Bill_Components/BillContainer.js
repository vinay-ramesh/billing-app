import React, { useState } from "react";
import BillForm from "./BillForm";
import BillGenerator from "./BillGenerator";

const BillContainer = (props) => {
    const [newBill, setNewBill] = useState("")

    const updateBill = (data) => {
        // console.log("bill", data)
        setNewBill(data)
    }

    const handleGenerateNew = () => {
        setNewBill("")
    }

    const handleViewBill = () => {
        setNewBill("All")
    }

    return (
        <div>
            <div>
                <button onClick={handleGenerateNew}>Generate New</button>
                <button onClick={handleViewBill}>View All</button>
            </div>

            {newBill ? <BillGenerator newBill={newBill} /> : <BillForm updateBill={updateBill} />}
        </div>
    )
}

export default BillContainer