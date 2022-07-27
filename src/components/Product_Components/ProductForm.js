import React from "react";
import { useDispatch } from "react-redux"
import { useFormik } from "formik";
import * as Yup from "yup"
import { startEditProduct, startPostProduct } from "../../actions/productActions";

const productRegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(3)
        .max(64)
        .required("Prodcut name cannot be blank!!"),
    price: Yup.string()
        .required("Provide Pice!")
})

const ProductForm = (props) => {
    const { _id, name: productName, price: mrp, handleToggle } = props

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: productName ? productName : "",
            price: mrp ? mrp : ""
        },
        onSubmit: (formData, { resetForm }) => {

            if (productName) {
                dispatch(startEditProduct(_id, formData))
                handleToggle()
            } else {
                dispatch(startPostProduct(formData))

            }
            resetForm()
        },
        validationSchema: productRegisterSchema,
        validateOnChange: false
    })
    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>Product Name</label><br />
                <input
                    type="text"
                    name="name"
                    placeholder="ex: Ambuja cement "
                    value={formik.values.name}
                    onChange={formik.handleChange}
                /><br /><br />

                <label>Product Price</label><br />
                <input
                    type="text"
                    name="price"
                    placeholder="Price in INR/-"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                /><br /><br />

                <input type="submit" value="save" />
            </form>
        </div>
    )
}

export default ProductForm