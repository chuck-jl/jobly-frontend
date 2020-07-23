import React from "react";
import defaultLogo from "./default-logo.png";
import {Link} from "react-router-dom";

const JobCard = ({item={}}) =>{
    return (
        <Link className="Card card" to={`companies/${item.handle}`}>
            <div className="card-body">
                <h6 className="card-title d-flex justify-content-between">
                    <span className="text-capitalize">{item.name}</span>
                    <img src={item.logo_url || defaultLogo} alt={`${item.name} Logo`} />
                </h6>
                <p>{item.description}</p>
            </div>
        </Link>
    )
}

export default JobCard;