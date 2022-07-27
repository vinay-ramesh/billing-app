import React from "react";
import { useDispatch } from "react-redux"
import { useFormik } from "formik";
import * as Yup from "yup"
import { asyncPostCustomer } from "../../actions/customerActions";
import { startEditCustomer } from "../../actions/customerActions"

const cutsomerRegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(4)
        .max(128)
        .required("Provide Customer Name"),
    mobile: Yup.number()
        /* .min(10)
        .max(10) */
        .required("Number cannot be blank"),
    email: Yup.string()
        .email()
})

const CustomerForm = (props) => {
    const { _id, name: customerName, mobile: cellNumber, handleCustomerToggle, email: mail } = props
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: customerName ? customerName : "",
            mobile: cellNumber ? cellNumber : "",
            email: mail ? mail : ""
        },
        onSubmit: (formData, { resetForm }) => {
            if (customerName) {
                dispatch(startEditCustomer(_id, formData))
                handleCustomerToggle()
            } else {
                dispatch(asyncPostCustomer(formData))
            }
            resetForm()
        },
        validationSchema: cutsomerRegisterSchema,
        validateOnChange: false
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Name</label><br />
                <input
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name="name"
                /> {formik.errors.name}
                <br /><br />

                <label>Mobile</label><br />
                <input
                    type="text"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    name="mobile"
                /> {formik.errors.mobile}
                <br /><br />

                <label>Email</label><br />
                <input
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                /> {formik.errors.email}
                <br /><br />

                <input type="submit" />
            </form>
        </div>
    )
}

export default CustomerForm