import './App.css';
import {Router} from '@reach/router';
import LogReg from './views/LogReg';
import Profile from './components/Profile';
import DisplayAllVehicles from './components/DisplayAllVehicles';
import DisplayOneVehicle from './components/DisplayOneVehicle';
import AddNewVehicle from './components/AddNewVehicle';
import UpdateVehicle from './components/UpdateVehicle';
import { useState } from 'react';
import RentPage from './components/RentPage';


function App() {

  const[loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Router>
        <LogReg path = "/logReg" user = {user} setUser = {setUser}/>
        <DisplayAllVehicles path="/" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} user = {user} setUser = {setUser}/>
        <AddNewVehicle path="/new" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user}/>
        <DisplayOneVehicle path="/vehicle/:id" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} user = {user} setUser = {setUser}/>
        <UpdateVehicle path="/vehicle/edit/:id" setUser = {setUser} user = {user}/>
        <Profile path="/user/profile/:username" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}user = {user} setUser = {setUser}/>
        <RentPage path ="/vehicle/rent/:id" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} user = {user} setUser = {setUser}/>
      </Router>
    </div>
  );
}

export default App;
