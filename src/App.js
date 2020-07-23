import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import useLocalStorage from './hook/useLocalStorage';
import Navigation from './Navigation';
import Routes from './Routes';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';

export const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
  const [ currentUser, setCurrentUser ] = useState(null);


  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(()=>{
    async function getCurrentUser(){
      try{
        let {username} = decode(token);
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      }catch(e){
        setCurrentUser(null);
      }
    }
    getCurrentUser();
  },[token])

  const handleLogOut =()=>{
    setToken(null);
    setCurrentUser(null);
  }

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUser, setCurrentUser }}>
				<div className="App">
					<Navigation logout={handleLogOut} />
          <Routes setToken={setToken} />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
