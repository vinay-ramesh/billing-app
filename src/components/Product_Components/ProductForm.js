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
            <h3>Add Product</h3>
            <form onSubmit={formik.handleSubmit}>
                <label>Product Name</label><br />
                <input
                    type="text"
                    name="name"
                    placeholder="ex: Ambuja cement "
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <div class="h4 invalid-feedback">
                    {formik.errors.name}
                </div>

                <label>Product Price</label><br />
                <input
                    type="text"
                    name="price"
                    placeholder="Price in INR/-"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                />
                <div class="h4 invalid-feedback">
                    {formik.errors.price}
                </div>

                {/* <input type="submit" value="save" /> */}
                <div className="col-md-12 mt-3">
                    <button type="submit" class="btn btn-primary float-left" onClick={formik.handleSubmit} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm