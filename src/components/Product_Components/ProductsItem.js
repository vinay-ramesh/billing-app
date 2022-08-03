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
        <div className="col-sm-4 p-2">
            {
                toggle ? (
                    <div>
                        <EditProduct _id={_id} name={name} price={price} handleToggle={handleToggle} />
                        <button onClick={handleToggle}>cancel</button>
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><i className="bi bi-box"></i> - {name}</h5>
                            <h6 className="card-subtitle mb-2"><i className="bi bi-currency-rupee"></i> - {price}</h6>
                            <button onClick={handleToggle}><i className="bi bi-pencil-fill"></i></button>
                            <button onClick={() => {
                                handleRemoveProduct(_id)
                            }}><i className="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductsItem