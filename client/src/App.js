import './App.css';
import {Router} from '@reach/router';
import LogReg from './views/LogReg';
import Profile from './components/Profile';
import DisplayAllVehicles from './components/DisplayAllVehicles';
import DisplayOneVehicle from './components/DisplayOneVehicle';
import AddNewVehicle from './components/AddNewVehicle';
import UpdateVehicle from './components/UpdateVehicle';
import { useState } from 'react';


function App() {

  const[loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <LogReg path = "/"/>
        <DisplayAllVehicles path="/home" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} />
        <AddNewVehicle path="/new" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
        <DisplayOneVehicle path="/vehicle/:id" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
        <UpdateVehicle path="/vehicle/edit/:id" />
        <Profile path="/user/profile/:username" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
      </Router>
    </div>
  );
}

export default App;
