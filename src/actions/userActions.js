import axios from "axios"


export const asyncGetUsers = () => {
    return (dispatch) => {
        axios.get("http://dct-pos-app.herokuapp.com/api/users/account", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const users = response.data
                // console.log(users)
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