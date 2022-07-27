import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startDeletePost } from "../../actions/productActions";
import EditProduct from "./EditProduct";

const ProductsItem = (props) => {
    const { _id, name, price } = props
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()


    const handleRemoveProduct = (productId) => {
        const confirmRemoveProduct = window.confirm("Are you sure?")
        if (confirmRemoveProduct) {
            dispatch(startDeletePost(productId))
        }
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            {
                toggle ? (
                    <div>
                        <EditProduct _id={_id} name={name} price={price} handleToggle={handleToggle} />
                        <button onClick={handleToggle}>cancel</button>
                    </div>
                ) : (
                    <div>
                        <h2>{name} - {price}</h2>
                        <button onClick={() => {
                            handleRemoveProduct(_id)
                        }}>Remove</button>
                        <button onClick={handleToggle}>edit</button>
                    </div >
                )
            }
        </div >
    )
}

export default ProductsItem