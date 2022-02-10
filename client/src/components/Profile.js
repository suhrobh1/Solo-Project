import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import Header from './Header';

const Profile = (props) =>{

    const {username, loggedIn, setLoggedIn} = props;
    const [userVehicleList, setUserVehicleList] = useState([]);
    const [user, setUser] = useState({});
   
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/vehiclesByUser/${username}`,  {withCredentials: true})
       
            .then((res) =>{
                console.log("Message 7:", res.data);
                setUserVehicleList(res.data);
                setLoggedIn(true);
            })
            .catch((err)=>{
                console.log(err); 
                
            })
    }, [])

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/users/secure`,  {withCredentials: true})
       
            .then((res) =>{
                console.log("Message 8:", res.data);
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err); 
            })
    }, [])


    return(
        <div style={{textAlign:"center"}}>
             <Header link={"/home"} linkText={"Home"} titleText={"Rent My Ride"} loggedIn= {loggedIn}/>
            {
              loggedIn ? 
                <div>
                    <h1>Welcome {user.firstName}</h1>
                        {
                            userVehicleList.map((vehicle, index) => {
                                return(
                                    <div key = {index}>
                                        <h3>{vehicle.make} {vehicle.model}</h3>
                                        <p>{vehicle.year}</p>
                                        <p>{vehicle.rate}</p>
                                        <img src={vehicle.image} alt="Vehicle picture" style={{width:"150px", height:"150px"}} />
                                        <p>{vehicle.currentCity}</p>
                                        <p>{vehicle.currentState}</p>
                                    </div>
                                )
                            })
                        
                        }
                </div>
            :
                <div>
                    <h3>Please log in to see your profile!</h3>
                </div> 
           } 
        </div>
    )
}


export default Profile;