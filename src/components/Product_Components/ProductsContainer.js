import React from "react";
import ProductForm from "./ProductForm";
import ProductsList from "./ProductsList";

const ProductsContainer = (props) => {
    return (
        <div className="container text-center">
            <div className="row p-5">
                <div className="col-md-4">
                    <ProductForm />
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <ProductsList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsContainer