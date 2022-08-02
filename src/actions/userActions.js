import axios from "axios"
import { getBill } from "./billActions"
import { getCustomer } from "./customerActions"
import { getProducts } from "./productActions"


export const asyncGetUsers = () => {
    return (dispatch) => {
        axios.get("http://dct-pos-app.herokuapp.com/api/users/account", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const users = response.data
                dispatch(setUsers(users))
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const setUsers = (users) => {
    return {
        type: "GET_USERS",
        payload: users
    }
}


export const asyncInitialUserDetailsFetch = (setIsLoading) => {
    return (dispatch) => {
        const apiList = ["http://dct-pos-app.herokuapp.com/api/customers", "http://dct-pos-app.herokuapp.com/api/products", "http://dct-pos-app.herokuapp.com/api/bills", "http://dct-pos-app.herokuapp.com/api/users/account"]

        axios.all(apiList.map(api => axios.get(api, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })))
            .then(responses => {
                setIsLoading && setIsLoading(false)
                const resultArray = responses.map(res => res.data)
                const actions = [getCustomer, getProducts, getBill, setUsers]

                actions.forEach((action, index) => {
                    dispatch(action(resultArray[index]))
                })

            })
            .catch((err) => {
                console.log(err)
            })
    }
}