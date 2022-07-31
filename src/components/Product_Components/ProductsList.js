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
        <div className="container">
            <h3 className="text-start">Total Products - {totalProducts.length}</h3>
            {totalProducts.length === 0 ? (
                <div>
                    <h3>No products found</h3>
                    <p>Add your first product</p>
                </div>
            ) : (
                <div className="row">
                    {totalProducts.map((ele, _id) => {
                        return <ProductsItem key={ele._id} {...ele} />
                    })}
                </div>
            )}
        </div>
    )
}

export default ProductsList