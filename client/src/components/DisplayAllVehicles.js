import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from '@reach/router';
import Header from './Header';
import  DeleteButton  from './DeleteButton';

const DisplayAllVehicles = (props) =>{

    const {loggedIn, setLoggedIn} = props;
    const [vehicleList, setVehicleList] = useState([]);
    const [user, setUser] = useState({});
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/vehicles")
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setVehicleList(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    } , [])


    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteVehicle = (idFromBelow)=>{
        setVehicleList(vehicleList.filter((vehicle, index)=>vehicle._id !== idFromBelow))
    }

    return(
        <div style={{textAlign:"center"}}>
            <div>
                <Header link={"/new"} linkText={"Add a new vehicle"} titleText={"Rent My Ride"} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
                
                <Link to={`/user/profile/${user.username}`}> My Profile</Link>
            </div>
            {
                vehicleList.map((vehicle, index)=>(
                    <div key={index}>
                        <Link to={`/vehicle/${vehicle._id}`}>
                            <p>{vehicle.make} {vehicle.model}</p>
                            <img src={vehicle.image} alt="Vehicle picture" style={{width:"150px", height:"150px"}} />
                        </Link>
                        

                        <div>
                            {
                                loggedIn? 
                                    <div>
                                        <Link to={`/vehicle/edit/${vehicle._id}`}>Edit</Link>
                                        <DeleteButton 
                                        id={vehicle._id}
                                        vehicleList={vehicleList}
                                        setVehicleList={setVehicleList}
                                        />
                                    </div>
                                : null
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAllVehicles;