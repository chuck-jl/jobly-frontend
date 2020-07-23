import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.scss';
import UserContext from './UserContext';

const Navigation = ({ logout }) => {
	const { currentUser } = useContext(UserContext);
	const loggedInView = () => {
		return (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/companies">
					    Companies
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/jobs">
						Jobs
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/profile">
						Profile
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/" onClick={logout}>
						Logout
					</NavLink>
				</li>
			</ul>
		);
	};
	const notLoggedInView = () => {
		return (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/login">
						Login
					</NavLink>
				</li>
			</ul>
		);
	};

	return (
		<nav className="Navigation navbar navbar-expand-md">
			<Link to="/" className="navbar-brand">
				Jobly
			</Link>
			{currentUser ? loggedInView() : notLoggedInView()}
		</nav>
	);
};

export default Navigation;
