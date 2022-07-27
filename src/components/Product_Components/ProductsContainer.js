import React from "react";
import ProductForm from "./ProductForm";
import ProductsList from "./ProductsList";

const ProductsContainer = (props) => {
    return (
        <div>
            <ProductsList />
            <ProductForm />
        </div>
    )
}

export default ProductsContainer