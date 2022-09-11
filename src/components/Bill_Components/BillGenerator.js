import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import ReactToPdf from "react-to-pdf"

const BillGenerator = (props) => {
    const ref = React.createRef()
    const params = useParams()

    const allBills = useSelector((state) => {
        return state.bills.filter(bill => bill._id === params.billId)[0] //billId from - redirect function
    })

    const allCustomers = useSelector((state) => {
        return state.customers.filter(cust => cust._id === allBills.customer)[0] //customer - from bill
    })

    const allProducts = useSelector((state) => {
        return state.products
    })

    const billProducts = allBills.lineItems.map((item) => {
        const result = allProducts.filter(prod => prod._id === item.product)[0] //product - from bill
        result.quantity = item.quantity
        result.subTotal = item.subTotal
        // console.log("resultGenerator", result)
        return result
    })

    return (
        <div>
            <button onClick={() => {
                props.history.push("/bills")
            }}><i class="bi bi-skip-backward"></i>Back</button>
            <div ref={ref}>
                <h2>{allCustomers.name}</h2>
                <ul>
                    {
                        billProducts.map((prod, index) => {
                            return (
                                <div>
                                    <h4>Product - {prod.name}</h4>
                                    <h5>Sub Total - {prod.subTotal}</h5>
                                </div>
                            )
                        })
                    }
                </ul>
                <h3>Total - {allBills.total}</h3>
            </div>

            <div>
                <ReactToPdf targetRef={ref} filename="bill.pdf" >
                    {
                        ({ toPdf }) => (
                            <button onClick={toPdf}>Download</button>
                        )
                    }
                </ReactToPdf>
            </div>
        </div>
    )

}

export default BillGenerator