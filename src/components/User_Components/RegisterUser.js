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
    businessName: Yup.string(),
    address: Yup.string()
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
        <div>
            <h3>Register with us</h3>
            <form>
                <label>Username</label> <br />
                <input type="text"
                    placeholder="Ex : Demo"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    name="username"
                /> {formik.errors.username}
                <br /> <br />

                <label>Email</label> <br />
                <input type="email"
                    placeholder="Ex : demo@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                /> {formik.errors.email}
                <br /> <br />

                <label>Password</label> <br />
                <input type="password"
                    placeholder="Ex : Demo@123"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name="password"
                /> {formik.errors.password}
                <br /> <br />

                <label>Business</label> <br />
                <input type="text"
                    placeholder="Ex : Resturant"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    name="businessName"
                /> <br /> <br />

                <label>Address</label> <br />
                <input type="text"
                    placeholder="Ex : HSR layout, Banglore"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    name="address"
                /> <br /> <br />
                {/* <input type="submit" /> */}
                <button type="submit" onClick={formik.handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default RegisterUser