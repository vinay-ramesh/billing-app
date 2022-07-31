import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Email required!!"),
    password: Yup.string()
        .min(8)
        .max(128)
        .required("Enter Password!!")
})

const LoginUser = (props) => {
    const { handleLogin } = props
    const [serverError, setServerError] = useState("")

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validateOnChange: false,
        validationSchema: loginSchema,

        onSubmit: (formData, { resetForm }) => {
            // console.log(formData)
            axios.post(`http://dct-pos-app.herokuapp.com/api/users/login`, formData)
                .then((response) => {
                    // console.log(response.data) {errors: 'invalid email or password'}
                    if (response.data.errors) {
                        setServerError(response.data.errors)
                    } else {
                        // console.log(response.data)
                        alert("Successfully logged in")
                        localStorage.setItem("token", response.data.token)
                        handleLogin()
                        props.history.push("/users/account")
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
            resetForm()
        }
    })
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="col-md-6 text-center">
                <h2 className="col-md-12 mt-4">Login</h2>
                {serverError && <p>{serverError}</p>}
                <form onSubmit={formik.handleSubmit}>
                    <input class="form-control"
                        type="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        name="email"
                    />
                    <div class=" h4 invalid-feedback">
                        {formik.errors.email}
                    </div>

                    <div className="col-md-12 mt-3">
                        <input class="form-control"
                            type="password"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
                        />
                    </div>
                    <div class="h4 invalid-feedback">
                        {formik.errors.password}
                    </div>

                    <div className="col-md-12 mt-3 ">
                        <button type="submit" class="btn btn-primary float-start">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginUser