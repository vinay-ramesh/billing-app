import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup"
import { startPostBill } from "../../actions/billActions";

const billValidationSchema = Yup.object().shape({
    date: Yup.date()
        .required("Provide date of billing!"),
    customer: Yup.string()
        .required("Provide Customer Info!")
})

const BillForm = (props) => {
    const [formFields, setFormFields] = useState([{
        product: "", quantity: ""
    }])
    const dispatch = useDispatch()
    const history = useHistory()

    const reDirect = (billId) => {
        history.push(`/billing/${billId}`)
    }

    const formik = useFormik({
        initialValues: {
            date: "",
            customer: ""
        },
        onSubmit: (form, { resetForm }) => {
            // console.log({ ...form, lineItems: formFields })
            dispatch(startPostBill({ ...form, lineItems: formFields }, reDirect))
            resetForm()
        },
        validationSchema: billValidationSchema,
        validateOnChange: false
    })

    const customersInfo = useSelector((state) => {
        return state.customers
    })

    const productsInfo = useSelector((state) => {
        return state.products
    })

    // wrt product and quantity 
    const handleChange = (e, index) => {
        e.preventDefault()
        let data = [...formFields]
        data[index][e.target.name] = e.target.value
        setFormFields(data)
    }

    const handleAddMore = () => {
        let addData = {
            product: "", quantity: ""
        }
        setFormFields([...formFields, addData])
    }

    const handleRemove = (index) => {
        let data = [...formFields]
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <div className="container">
            <h3>Bill Form</h3>
            <form onSubmit={formik.handleSubmit}>
                <label>Enter Date</label> <br />
                <input
                    name="date"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                />
                <div className="h4 invalid-feedback">
                    {formik.errors.date}
                </div>

                <label>Customer</label><br />
                <select onChange={formik.handleChange} name="customer" >
                    <option value="">Select Customer</option>
                    {customersInfo.map((customer, index) => {
                        return <option value={customer._id} key={index}>{customer.name}</option>
                    })}
                </select>
                {
                    formFields.map((product, index) => {
                        return (
                            <div key={index}>
                                <label>Product</label>
                                <select
                                    onChange={(e) => {
                                        handleChange(e, index)
                                    }} name="product" >
                                    <option value="">Select product</option>
                                    {
                                        productsInfo.map((ele) => {
                                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                                        })
                                    }
                                </select>


                                <label>Quantity</label>
                                <input
                                    name="quantity"
                                    type="number"
                                    placeholder="ex: 1"
                                    value={product.quantity}
                                    onChange={(e) => {
                                        handleChange(e, index)
                                    }}
                                />

                                {formFields.length > 1 && <button className="btn btn-primary float-left" onClick={() => {
                                    handleRemove(index)
                                }}>Remove</button>}
                            </div>
                        )
                    })
                }
                <button type="button" onClick={handleAddMore}>Add More</button>
                <input type="submit" value="save" />
            </form>
        </div>
    )
}

export default BillForm