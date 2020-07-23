import React,{useContext, useState} from "react";
import UserContext from "./UserContext";
import JoblyApi from "./JoblyApi";
import Alert from "./Alert";

const Profile = ()=>{
    const {currentUser,setCurrentUser} = useContext(UserContext);
    const [userForm, setUserForm] = useState({
        username: currentUser.username,
        password: "",
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        email: currentUser.email || "",
        photo_url: currentUser.photo_url || "",
        errors:[],
        saveConfirmed: false
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserForm(data=>({
            ...data,
            [name]:value,
            errors: []
        }))
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            setUserForm(data=>({...data, saveConfirmed:false, errors:[]}))
            let updateData = {
                first_name: userForm.first_name || undefined,
                last_name: userForm.last_name || undefined,
                email: userForm.email || undefined,
                photo_url: userForm.photo_url || undefined,
                password: userForm.password
            }
            let username = userForm.username;
            let updatedUser = await JoblyApi.saveProfile(username, updateData);
            console.log("user updated", updatedUser);
            setCurrentUser(updatedUser);
            setUserForm(data=>({...data, saveConfirmed:true, password:"", errors:[]}))

        }catch(errors){
            setUserForm(data=>({...data, errors}));
        }
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <p className="form-control-plaintext">{userForm.username}</p>
                        </div>
                        
                        <div className="form-group">
                            <label>First Name</label>
                            <input className="form-control" value={userForm.first_name} name="first_name" onChange={handleChange}/>
                        </div>
                        
                        <div className="form-group">
                            <label>Last Name</label>
                            <input className="form-control" value={userForm.last_name} name="last_name" onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" value={userForm.email} name="email" onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Photo URL</label>
                            <input className="form-control" value={userForm.photo_url} name="photo_url" onChange={handleChange}/>
                        </div>

                        <hr className="my-3"></hr>
                        
                        <div className="form-group">
                            <label>Re-enter Password</label>
                            <input className="form-control" type="password" name="password" value={userForm.password} onChange={handleChange}/>
                        </div>
                        
                        {userForm.errors.length ? 
                            (<Alert type="danger" messages={userForm.errors} />) : null
                        }
                        
                        {userForm.saveConfirmed ? 
                            (<Alert type="success" messages={["User updated successfully."]} />) : null
                        }

                        <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;