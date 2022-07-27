import React, { useEffect } from "react";
import ProductsItem from "./ProductsItem";
import { useDispatch, useSelector } from "react-redux";
import { startGetProduct } from "../../actions/productActions";

const ProductsList = (props) => {
    const dispatch = useDispatch()

    const totalProducts = useSelector((state) => {
        return state.products
    })

    useEffect(() => {
        dispatch(startGetProduct())
    }, [dispatch])

    return (
        <div>
            <h2>Total Products - {totalProducts.length}</h2>
            {totalProducts.length === 0 ? (
                <div>
                    <h4>No products found</h4>
                    <p>Add your first product</p>
                </div>
            ) : (
                <ul>
                    {totalProducts.map((ele, _id) => {
                        return <ProductsItem key={ele._id} {...ele} />
                    })}
                </ul>
            )}
        </div>
    )
}

export default ProductsList