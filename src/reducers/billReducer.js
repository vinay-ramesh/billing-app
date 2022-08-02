const initialBill = []

const billReducer = (state = initialBill, action) => {
    switch (action.type) {
        case "POST_BILL": {
            return [...state, { ...action.payload }]
        }
        case "GET_BILL": {
            return [...action.payload]
        }
        case "DELETE_BILL": {
            return state.filter((bill) => {
                return bill._id !== action.payload
            })
        }
        default: {
            return state
        }
    }
}

export default billReducer