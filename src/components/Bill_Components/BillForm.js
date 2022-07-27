import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup"

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

    const formik = useFormik({
        initialValues: {
            date: "",
            customer: ""
        },
        onSubmit: (form, { resetForm }) => {
            console.log({ ...form, lineItems: formFields })
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
        <div>
            <h3>Bill form</h3>
            <form onSubmit={formik.handleSubmit}>
                <label>Enter Date</label> <br />
                <input
                    name="date"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                />{formik.errors.date}
                <br /><br />

                <label>Customer</label><br />
                <select onChange={formik.handleChange} name="customer" >
                    <option value="">Select Customer</option>
                    {customersInfo.map((customer, _id) => {
                        return <option value={customer._id} key={customer._id}>{customer.name}</option>
                    })}
                </select>

                {
                    formFields.map((product, index) => {
                        return (
                            <div>
                                <select onChange={(e) => {
                                    handleChange(e, index)
                                }} name="product" >
                                    <option value="">Select product</option>
                                    {
                                        productsInfo.map((ele) => {
                                            return <option value={ele._id}>{ele.name}</option>
                                        })
                                    }
                                </select>

                                <input
                                    name="quantity"
                                    type="number"
                                    placeholder="ex: 1"
                                    value={product.quantity}
                                    onChange={(e) => {
                                        handleChange(e, index)
                                    }}
                                />
                                <br /><br />
                                {formFields.length > 1 && <button onClick={() => {
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