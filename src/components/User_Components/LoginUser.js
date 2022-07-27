import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Email required"),
    password: Yup.string()
        .min(8)
        .max(128)
        .required("Enter Password")
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

        onSubmit: (formData, { resetForm, setErrors }) => {
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
                        props.history.push("/account")
                        handleLogin()
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
            resetForm()
        }
    })
    return (
        <div>
            <h2>Login</h2>
            {serverError && <p>{serverError}</p>}
            <form onSubmit={formik.handleSubmit}>

                <input type="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                /> {formik.errors.email}
                <br /><br />

                <input type="password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name="password"
                /> {formik.errors.password}
                <br /><br />

                <input type="submit" />
            </form>
        </div>
    )
}

export default LoginUser