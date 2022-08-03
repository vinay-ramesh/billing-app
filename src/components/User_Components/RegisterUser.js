import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios"

//setting up validations schema
const registrationSchema = Yup.object().shape({
    username: Yup.string()
        .min(4)
        .max(64)
        .required("Username is required!"),
    email: Yup.string()
        .email()
        .required("Email required!"),
    password: Yup.string()
        .min(8)
        .max(128)
        .required("Provide password!"),
    businessName: Yup.string()
        .required("Business required"),
    address: Yup.string()
        .required("Address name required")
})

const RegisterUser = (props) => {
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            businessName: "",
            address: ""
        },
        onSubmit: (formData, { resetForm }) => {
            console.log(formData, "formdata")
            axios.post(`http://dct-pos-app.herokuapp.com/api/users/register`, formData)
                .then((response) => {
                    const result = response.data
                    // console.log(result)
                    if (result.hasOwnProperty("errors")) {
                        console.log(result.message)
                    } else {
                        alert("successfully created an account")
                        props.history.push("/login")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            resetForm()
        },
        validationSchema: registrationSchema,
        validateOnChange: false
    })

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <div className="col-md-6">
                <h2 className="col-md-12 mt-4 text-center">Register with us</h2>
                <form>
                    <div>
                        <label>Username</label> <br />
                        <input type="text"
                            class="form-control"
                            placeholder="Ex : Demo"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            name="username"
                        /> <div className="h4 invalid-feedback">
                            {formik.errors.username}
                        </div>
                    </div>

                    <div>
                        <label>Email</label> <br />
                        <input type="email"
                            class="form-control"
                            placeholder="Ex : demo@gmail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name="email"
                        /> <div className="h4 invalid-feedback">
                            {formik.errors.email}
                        </div>
                    </div>

                    <div>
                        <label>Password</label> <br />
                        <input type="password"
                            class="form-control"
                            placeholder="Ex : Demo@123"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
                        /> <div className="h4 invalid-feedback">
                            {formik.errors.password}
                        </div>
                    </div>

                    <div>
                        <label>Business</label> <br />
                        <input type="text"
                            class="form-control"
                            placeholder="Ex : Resturant"
                            value={formik.values.businessName}
                            onChange={formik.handleChange}
                            name="businessName"
                        /><div className="h4 invalid-feedback">
                            {formik.errors.businessName}
                        </div>
                    </div>

                    <div>
                        <label>Address</label> <br />
                        <input type="text"
                            class="form-control"
                            placeholder="Ex : HSR layout, Banglore"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            name="address"
                        />
                        <div className="h4 invalid-feedback">
                            {formik.errors.address}
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-primary float-start" onClick={formik.handleSubmit} >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterUser