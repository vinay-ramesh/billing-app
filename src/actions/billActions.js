import axios from "axios"

export const startPostBill = (form, updateBill) => {
    return (dispatch) => {
        axios.post(`http://dct-pos-app.herokuapp.com/api/bills`, form, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(postBill(result))
                    updateBill(result)
                }
            })
            .catch((err) => console.log(err.message))
    }
}

export const postBill = (data) => {
    return {
        type: "POST_BILL",
        payload: data
    }
}

export const startGetBill = () => {
    return (dispatch) => {
        axios.get(`http://dct-pos-app.herokuapp.com/api/bills`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty("errors")) {
                    alert(result.message)
                } else {
                    dispatch(getBill(result))
                }
            })
            .catch((err) => console.log(err.message))
    }
}

export const getBill = (data) => {
    return {
        type: "GET_BILL",
        payload: data
    }
}