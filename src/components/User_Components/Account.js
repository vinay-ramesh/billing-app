import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUsers } from "../../actions/userActions";

const Account = (props) => {
    const dispatch = useDispatch()

    const usersList = useSelector((state) => {
        return state.users
    })

    useEffect(() => {
        dispatch(asyncGetUsers())
    }, [dispatch])

    return (
        <div>
            <h2>Account Details</h2>
            <h3>User - {usersList.username}</h3>
            <h4>Type of Business- {usersList.businessName}</h4>
        </div>
    )
}

export default Account