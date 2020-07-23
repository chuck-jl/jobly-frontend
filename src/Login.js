import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import Alert from './Alert';
import JoblyApi from './JoblyApi';

const Login = ({ setToken }) => {
	const history = useHistory();
	const [ authView, setAuthView ] = useState('login');
	const [ loginInfo, setLoginInfo ] = useState({
		username: '',
		password: '',
		first_name: '',
		last_name: '',
		email: '',
		errors: []
	});

	const handleChange = (e) => {
		const {name, value}= e.target
		setLoginInfo((l) => ({
			...l,
			[name]: value
		}));
    };
    
    const handleSubmit = async (e) =>{
		e.preventDefault();
        let data;
        let endpoint;
        if(authView==="login"){
            data={
                username: loginInfo.username,
                password: loginInfo.password
            };
            endpoint="login";
        }else{
            data={
                username: loginInfo.username,
                password: loginInfo.password,
                first_name:loginInfo.first_name,
                last_name:loginInfo.last_name,
                email:loginInfo.email
            }
            endpoint="register";
        }
        let token;
        try{
			token = await JoblyApi[endpoint](data);
        }catch(errors){
            return setLoginInfo(l=>({...l, errors}))
        }
		setToken(token);
        history.push("/companies");
    }

	const signupFields = (
		<div>
			<div className="form-group">
				<label>First name</label>
				<input
					name="first_name"
					className="form-control"
					value={loginInfo.first_name}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Last name</label>
				<input name="last_name" className="form-control" value={loginInfo.first_name} onChange={handleChange} />
			</div>

			<div className="form-group">
				<label>Email</label>
				<input
					name="email"
					type="email"
					className="form-control"
					value={loginInfo.email}
					onChange={handleChange}
				/>
			</div>
		</div>
	);

	return (
		<div className="Login">
			<div className="Container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
				<div className="d-flex justify-content-end">
					<div className="btn-group">
						<button
							className={`btn btn-primary ${authView === 'login' ? 'active' : ''}`}
							onClick={() => {
								setAuthView('login');
							}}
						>
							Login
						</button>
						<button
							className={`btn btn-primary ${authView === 'signup' ? 'active' : ''}`}
							onClick={() => {
								setAuthView('signup');
							}}
						>
							Signup
						</button>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Username</label>
								<input
									name="username"
									className="form-control"
									value={loginInfo.username}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group">
								<label>Password</label>
								<input
									name="password"
									type="password"
									className="form-control"
									value={loginInfo.password}
									onChange={handleChange}
								/>
							</div>

                            {authView === 'signup'? signupFields: ""}
                            {loginInfo.errors.length ? 
                               <Alert messages={loginInfo.errors} />:""
                            }

                            <button className="btn btn-primary float-right" type="submit" onClick={handleSubmit}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
