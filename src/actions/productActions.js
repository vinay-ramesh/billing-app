import axios from "axios"

export const startPostProduct = (formData) => {
    return (dispatch) => {
        axios.post(`http://dct-pos-app.herokuapp.com/api/products`, formData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                // console.log(result)
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(postProduct(result))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const postProduct = (productData) => {
    return {
        type: "ADD_PRODUCT",
        payload: productData
    }
}


export const startGetProduct = () => {
    return (dispatch) => {
        axios.get(`http://dct-pos-app.herokuapp.com/api/products`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(getProducts(result))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const getProducts = (productDetails) => {
    return {
        type: "GET_PRODUCT",
        payload: productDetails
    }
}

export const startDeletePost = (_id) => {
    return (dispatch) => {
        axios.delete(`http://dct-pos-app.herokuapp.com/api/products/${_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                // console.log("productDelete", result)
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(deleteProduct(_id))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const deleteProduct = (productId) => {
    return {
        type: "DELETE_PRODUCT",
        payload: productId
    }
}

export const startEditProduct = (id, formData) => {
    return (dispatch) => {
        axios.put(`http://dct-pos-app.herokuapp.com/api/products/${id}`, formData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                // console.log(result)
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(editProduct(result))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const editProduct = (data) => {
    return {
        type: "EDIT_PRODUCT",
        payload: data
    }
}