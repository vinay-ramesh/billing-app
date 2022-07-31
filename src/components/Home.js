import React from "react";
import images from "../images/6662.jpg"

const Home = (props) => {
    return (
        <div>
            {/* <div className="container justify-content-centre align-items-left">
                {<h2>Welcome All</h2>}
            </div> */}

            <div className="images"  >
                {<img src={images} class="img-fluid" style={{ height: "100%", width: "100%" }} alt="Responsive image"></img>}
            </div>
        </div>
    )
}

export default Home