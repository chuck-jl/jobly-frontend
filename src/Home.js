import React,{useContext} from "react";
import {Link} from "react-router-dom";
import "./Home.css";
import UserContext from "./UserContext";

const Home = ()=>{
    const {currentUser}= useContext(UserContext);
    return (
        <div className="Home">
            <div className="Container text-center" style={{position:"absolute", left:"40%"}}>
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place.</p>
                   {currentUser ? 
                   (<h3>Welcome Back: {currentUser.first_name}</h3>) :
                   (<Link className="btn btn-primary font-weight-bold" to="/login">
                       Log in
                   </Link>) 
                }
            </div>
        </div>
    )
}

export default Home;