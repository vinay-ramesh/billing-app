import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUsers } from "../../actions/userActions";
import images from "../../images/billing-software.png"

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
            {/* <div className="container col-md-6">
                <div className="d-flex justify-content-center align-items-center">
                    <div class="card mt-10">
                        <div class="card-body">
                            <h2>Account Details</h2>
                            <h3>User - {usersList.username}</h3>
                            <h4>Type of Business- {usersList.businessName}</h4>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div class="card text-bg-light">
                <img src={images} class="card-img" alt="img" />
                <div class="card-img-overlay">
                    <h2>Account Details</h2>
                    <h3 class="card-title"><i class="bi bi-person-square">User</i> - {usersList.username}</h3>
                    <h4 class="card-text"><i class="bi bi-briefcase-fill">Type of Business</i>- {usersList.businessName}</h4>
                    <p class="card-text">Last updated 3 mins ago</p>
                </div>
            </div> */}
            <div className="container col-md-6">
                <div className="d-flex justify-content-center align-items-center p-5">
                    <div class="card mb-3" style={{ maxWidth: "540px" }}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={images} class="img-fluid rounded-start" alt="img" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h2>Account Details</h2>
                                    <h3 class="card-title"><i class="bi bi-person-square">User</i> - {usersList.username}</h3>
                                    <h4 class="card-text"><i class="bi bi-briefcase-fill">Type of Business</i>- {usersList.businessName}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Account