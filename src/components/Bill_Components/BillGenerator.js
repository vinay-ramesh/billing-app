import React from "react";
import { useSelector } from "react-redux";

const BillGenerator = (props) => {
    const { newBill } = props
    // console.log("insideBill generator", newBill)
    const customers = useSelector((state) => {
        return state.customers
    })
    const products = useSelector((state) => {
        return state.products
    })

    const bills = useSelector((state) => {
        return state.bills
    })


    const customer = customers.filter(ele => ele._id === newBill.customer)[0]
    // console.log("cust", customer) // /* cust {_id: '62dbb315f31135001606971d', name: 'Rahul', mobile: '1234567890', email: '', user: '62dbb2f0f31135001606971c', …}createdAt: "2022-07-23T08:36:37.585Z"email: ""mobile: "1234567890"name: "Rahul"updatedAt: "2022-07-23T08:36:37.585Z"user: "62dbb2f0f31135001606971c"__v: 0_id: "62dbb315f31135001606971d"[[Prototype]]: Object */

    // console.log("products", products)
    const singleCustomerBill = () => {
        const currentBill = bills.filter((ele) => {
            return ele.customer === newBill.customer
        })
        // console.log("currentBill", currentBill)
        /* currentBill (2) [{…}, {…}]  for a sigle customer - inside bills */
        return currentBill.map((bill) => {
            const generatedBill = bill.lineItems.map((ele) => { /* ele = line Items obj */
                const singleProductDetails = products.filter((prod) => {
                    return prod._id === ele.product
                })[0]
                // console.log("singleProductDetails", singleProductDetails)
                return { quantity: ele.quantity, subTotal: ele.subTotal, ...singleProductDetails }
            })
            // console.log("generatedBill", generatedBill)
            return {
                customerName: customer.name,
                productsDetail: generatedBill,
                billId: bill._id,
                Total: bill.total
            }
        })

    }
    // console.log("singleCustomerBill", singleCustomerBill())

    const allCustomerBill = () => {
        return bills.map((bill) => {
            const customer = customers.filter(ele => ele._id === bill.customer)[0]
            const generatedBill = bill.lineItems.map((ele) => { /* ele = line Items obj */
                const singleProductDetails = products.filter((prod) => {
                    return prod._id === ele.product
                })[0]
                // console.log("singleProductDetails", singleProductDetails)
                return { quantity: ele.quantity, subTotal: ele.subTotal, ...singleProductDetails }
            })
            // console.log("generatedBill", generatedBill)
            return {
                customerName: customer.name,
                productsDetail: generatedBill,
                billId: bill._id,
                Total: bill.total
            }
        })

    }
    console.log("single cuostomer", singleCustomerBill())
    console.log("all cuostomer", allCustomerBill())

    return (
        <div>
            {
                singleCustomerBill().map(bill => {
                    return (
                        <>
                            <h6>{bill.customerName}</h6>

                            <ul>
                                {bill.productsDetail.map((prod, index) => {
                                    return (
                                        <li key={index}>
                                            {prod.name} * {prod.quantity}
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    )
                })
            }
        </div>
    )
}

export default BillGenerator