import React from "react";
import ProductForm from "./ProductForm"

const EditProduct = (props) => {
    const { _id, name, price, handleToggle } = props
    return (
        <div>
            <ProductForm _id={_id} name={name} price={price} handleToggle={handleToggle} />
        </div>
    )
}

export default EditProduct