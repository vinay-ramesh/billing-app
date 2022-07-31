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
        <div className="col-sm-4">
            {
                toggle ? (
                    <div>
                        <EditProduct _id={_id} name={name} price={price} handleToggle={handleToggle} />
                        <button onClick={handleToggle}>cancel</button>
                    </div>
                ) : (
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><i class="bi bi-box"></i> - {name}</h5>
                            <h6 class="card-subtitle mb-2"><i class="bi bi-currency-rupee"></i> - {price}</h6>
                            <button onClick={handleToggle}><i class="bi bi-pencil-fill"></i></button><vr />
                            <button onClick={() => {
                                handleRemoveProduct(_id)
                            }}><i class="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductsItem