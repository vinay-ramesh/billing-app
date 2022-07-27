const productInitialState = []

const productReducer = (state = productInitialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT": {
            return [...state, { ...action.payload }]
        }

        case "GET_PRODUCT": {
            return [...action.payload]
        }

        case "DELETE_PRODUCT": {
            return state.filter((ele) => {
                return ele._id !== action.payload
            })
        }

        case "EDIT_PRODUCT": {
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

export default productReducer