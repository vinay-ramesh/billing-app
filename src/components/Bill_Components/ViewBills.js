import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { startDeleteBill } from "../../actions/billActions"

const ViewBills = (props) => {
    const dispatch = useDispatch()
    const allBills = useSelector((state) => {
        return state.bills
    })

    const allCustomers = useSelector((state) => {
        return state.customers
    })

    const allProducts = useSelector((state) => {
        return state.products
    })

    const allCustomerBills = (props) => {
        const bills = allBills.map(bill => {
            const customerDetails = allCustomers.filter(cus => {
                return cus._id === bill.customer
            })[0]
            if (customerDetails) {
                const newBill = bill.lineItems.map(item => {
                    const details = allProducts.filter(prod => prod._id === item.product)[0]
                    return {
                        quantity: item.quantity,
                        subTotal: item.subTotal,
                        ...details
                    }
                })
                return {
                    customerName: customerDetails.name,
                    billId: bill._id,
                    products: newBill,
                    total: bill.total
                }
            } else {
                return { error: "Bill not Found" }
            }
        })
        return bills.filter(bil => !bil.error).flat()
    }

    const currentProductDetails = allCustomerBills()

    const handleDeleteBill = (id) => {
        dispatch(startDeleteBill(id))
    }

    return (
        <div>
            {
                currentProductDetails.map((ele, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <h4>Customer - {ele.customerName}</h4>
                            </div>
                            <div >
                                <ol>
                                    {ele.products.map((item, index) => {
                                        return (
                                            <li key={index}>{`${item.name} - ${item.quantity} - ${item.subTotal}`}</li>
                                        )
                                    })}
                                </ol>
                            </div>
                            <h4>Total - {ele.total}</h4>
                            <div>
                                <button onClick={() => {
                                    handleDeleteBill(ele.billId)
                                }}>X</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ViewBills