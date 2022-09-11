import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store/configureStore";
import { /* asyncGetUsers */ asyncInitialUserDetailsFetch } from "./actions/userActions"
/* import { startGetProduct } from "./actions/productActions"
import { asyncGetCustomers } from "./actions/customerActions"
import { startGetBill } from "./actions/billActions"; */


const store = configureStore()
console.log("state", store.getState())

store.subscribe(() => {
    console.log("state updated", store.getState())
})

if (localStorage.getItem("token")) {
    // store.dispatch(asyncGetUsers())
    // store.dispatch(asyncGetCustomers())
    // store.dispatch(startGetProduct())
    // store.dispatch(startGetBill())
    store.dispatch(asyncInitialUserDetailsFetch())
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);
