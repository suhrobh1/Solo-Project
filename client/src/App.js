import './App.css';
import {Router} from '@reach/router';
import LogReg from './views/LogReg';
import Profile from './components/Profile';
import DisplayAllVehicles from './components/DisplayAllVehicles';
import DisplayOneVehicle from './components/DisplayOneVehicle';
import AddNewVehicle from './components/AddNewVehicle';
import UpdateVehicle from './components/UpdateVehicle';
import { useState, useEffect } from 'react';
import RentPage from './components/RentPage';
import io from 'socket.io-client';


function App() {


  const [socket, setSocket] = useState(()=> io(":8000"));

  useEffect(()=>{
    socket.on("connect", ()=> {
      console.log("socket in the client", socket.id)
    })

    return()=>socket.disconnect(true);
  }, [])

  const[loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Router>
        <LogReg path = "/logReg" user = {user} setUser = {setUser}/>
        <DisplayAllVehicles path="/" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} user = {user} setUser = {setUser}/>
        <AddNewVehicle path="/new" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user}/>
        <DisplayOneVehicle path="/vehicle/:id" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} user = {user} setUser = {setUser} socket = {socket}/>
        <UpdateVehicle path="/vehicle/edit/:id" setUser = {setUser} user = {user}/>
        <Profile path="/user/profile/:username" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}user = {user} setUser = {setUser}/>
        <RentPage path ="/vehicle/rent/:id" loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} user = {user} setUser = {setUser}/>
      </Router>
    </div>
  );
}

export default App;
