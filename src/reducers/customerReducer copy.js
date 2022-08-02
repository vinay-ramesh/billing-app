import { startEditProduct } from "../actions/productActions"

const customerInitialState = {
    customers: [],
    isLoading: true
}
const customerReducer = (state = customerInitialState, action) => {
    switch (action.type) {
        case "POST_CUSTOMERS": {
            return { ...state, customers: [...action.payload] }
        }

        case "GET_CUSTOMER": {
            return { ...state, customers: [...action.payload], isLoading: false }
        }

        case "DELETE_CUSTOMER": {
            const newCustomers = state.customers.filter((ele) => {
                // console.log("deleteObjRed", ele)
                return ele._id !== action.payload
            })
            return { ...startEditProduct, customers: [...newCustomers] }
        }

        case "EDIT_CUSTOMER": {
            const newCustomers = state.customers.map((ele) => {
                if (ele._id === action.payload._id) {
                    return { ...ele, ...action.payload }
                } else {
                    return { ...ele }
                }
            })
            return { ...startEditProduct, customers: [...newCustomers] }
        }
        default: {
            return state
        }
    }
}

export default customerReducer