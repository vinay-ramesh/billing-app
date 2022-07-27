const customerInitialState = []

const customerReducer = (state = customerInitialState, action) => {
    switch (action.type) {
        case "POST_CUSTOMERS": {
            return [...state, { ...action.payload }]
        }

        case "GET_CUSTOMER": {
            return [...action.payload]
        }

        case "DELETE_CUSTOMER": {
            return state.filter((ele) => {
                // console.log("deleteObjRed", ele)
                return ele._id !== action.payload
            })
        }

        case "EDIT_CUSTOMER": {
            return state.map((ele) => {
                if (ele._id === action.payload._id) {
                    return { ...ele, ...action.payload }
                } else {
                    return { ...ele }
                }
            })
        }
        default: {
            return state
        }
    }
}

export default customerReducer