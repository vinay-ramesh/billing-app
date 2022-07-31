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
        .min(10)
        .max(10)
        .required("Phone number cannot be blank"),
    email: Yup.string()
        .email()
        .required("Provide Email Id")
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
            <h3>Add Customer</h3>
            <form onSubmit={formik.handleSubmit}>
                <label>Name</label><br />
                <input
                    type="text"
                    placeholder="Ex : Demo"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name="name"
                />
                <div class="h4 invalid-feedback">
                    {formik.errors.name}
                </div>

                <label>Mobile</label><br />
                <input
                    type="text"
                    placeholder="Ex : 9876543210"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    name="mobile"
                />
                <div class=" h4 invalid-feedback">
                    {formik.errors.mobile}
                </div>


                <label>Email</label><br />
                <input
                    type="text"
                    placeholder="Ex : demo@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                />
                <div class=" h4 invalid-feedback">
                    {formik.errors.email}
                </div>

                {/* <input type="submit" class="btn btn-primary float-start" /> */}
                <div className="col-md-12 mt-3">
                    <button type="submit" class="btn btn-primary float-start" onClick={formik.handleSubmit} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CustomerForm