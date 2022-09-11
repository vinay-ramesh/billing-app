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
        const confirmRemoveProduct = window.confirm("Are you sure?")
        if (confirmRemoveProduct) {
            dispatch(startDeleteBill(id))
        }
    }

    return (
        <div className="container-box">
            <div className="p-5">
                <button onClick={() => {
                    props.history.push("/bills")
                }}><i className="bi bi-skip-backward"></i>Back
                </button>
                {
                    currentProductDetails.map((ele, index) => {
                        return (
                            <div key={index}>
                                <div className="container text-centre">
                                    <div className="row">
                                        <div className="col-md-4 p-2">
                                            <div className="card">
                                                <div>
                                                    <h4>Customer - {ele.customerName}</h4>
                                                </div>
                                                <div>
                                                    {ele.products.map((item, index) => {
                                                        return (
                                                            <p key={index}>{`${item.name} - ${item.quantity} - ${item.subTotal}`}</p>
                                                        )
                                                    })}
                                                </div>
                                                <h5>Total - {ele.total}</h5>
                                                <div>
                                                    <button onClick={() => {
                                                        handleDeleteBill(ele.billId)
                                                    }}>X</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ViewBills

{/* <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><i className="bi bi-box"></i> - {name}</h5>
                            <h6 className="card-subtitle mb-2"><i className="bi bi-currency-rupee"></i> - {price}</h6>
                            <button onClick={handleToggle}><i className="bi bi-pencil-fill"></i></button>
                            <button onClick={() => {
                                handleRemoveProduct(_id)
                            }}><i className="bi bi-trash3-fill"></i></button>
                        </div>
                    </div> */}

/* 
<div className="card">
                                                <div>
                                                    <h4>Customer - {ele.customerName}</h4>
                                                </div>
                                                <div>
                                                    {ele.products.map((item, index) => {
                                                        return (
                                                            <p key={index}>{`${item.name} - ${item.quantity} - ${item.subTotal}`}</p>
                                                        )
                                                    })}
                                                </div>
                                                <h5>Total - {ele.total}</h5>
                                                <div>
                                                    <button onClick={() => {
                                                        handleDeleteBill(ele.billId)
                                                    }}>X</button>
                                                </div>
                                            </div>
 */