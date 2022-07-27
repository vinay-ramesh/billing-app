import axios from "axios"

export const asyncPostCustomer = (customer) => {
    return (dispatch) => {
        axios.post(`http://dct-pos-app.herokuapp.com/api/customers`, customer, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    // console.log("customer data", result)
                    dispatch(setCustomer(result))
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const setCustomer = (customers) => {
    return {
        type: "POST_CUSTOMERS",
        payload: customers
    }
}

export const asyncGetCustomers = () => {
    return (dispatch) => {
        axios.get(`http://dct-pos-app.herokuapp.com/api/customers`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                console.log("Get Users", result)
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(getCustomer(result))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const getCustomer = (customer) => {
    return {
        type: "GET_CUSTOMER",
        payload: customer
    }
}

export const asyncRemoveCustomers = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-pos-app.herokuapp.com/api/customers/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                // console.log("resultDelete", result)
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(removeCustomer(id))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const removeCustomer = (data) => {
    return {
        type: "DELETE_CUSTOMER",
        payload: data
    }
}

export const startEditCustomer = (_id, formData) => {
    return (dispatch) => {
        axios.put(`http://dct-pos-app.herokuapp.com/api/customers/${_id}`, formData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(editCustomer(result))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const editCustomer = (data) => {
    return {
        type: "EDIT_CUSTOMER",
        payload: data
    }
}

