import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import Header from './Header';
import RentPage from './RentPage';



const DisplayOneVehicle = (props) =>{
    const{user, setUser} = props;
    const {id, loggedIn, setLoggedIn} = props;
    const [vehicle, setVehicle] = useState({})
    const [vehicleSpecs, setVehicleSpecs] = useState([]);

    useEffect(()=>{
        //This id is very important. We were able to send it from AllVehicles to here 
            //via our Link element. Our Link uses the path that was set in our Router in app.js.
        // It looked like this "/vehicle/:id"
        // The id can be destructured from props. (LOOK AT YOUR DEV TOOLS FOR THIS COMPONENT)
        // We destructure it and use it as our request's params as set in our controller!
        axios.get(`http://localhost:8000/api/vehicles/${id}`)
        // axios.get("http://localhost:8000/api/vehicles/" + id)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setVehicle(res.data);

            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])
    console.log("TESTING:", vehicle.model);

    useEffect(() => {
        axios.get(`https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=Nissan&model=Altima`)
            .then((res) => {
                console.log(res);
                
                console.log("Data from API",res.data.vehicle[0]);
                setVehicleSpecs(res.data.vehicle[0]);
            })
            .catch((err)=>{
                console.log(err)
            })
        }, [])
    



    const deleteVehicle = () =>{

        axios.delete(`http://localhost:8000/api/vehicles/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                navigate("/home");
            })
            .catch((err)=>{
                console.log(err)
            })

    }




    return(
        <div style={{textAlign:"center"}}>
           <Header link={"/new"} linkText={"Add a new vehicle"} titleText={"Rent My Ride"} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user}/>

            <img src={vehicle.image} alt="vehicle image" 
            style={{width:"150px", height:"150px"}}/>
            <p>{vehicle.make} {vehicle.model}</p>
            <p>Rental rate: ${vehicle.rate}</p>
            <p>Data provided by USDE.</p>
            <p>MPG City: {vehicleSpecs.city08} </p>
            <p>MPG Highway: {vehicleSpecs.highway08} </p>
            <p>Transmission: {vehicleSpecs.trany} </p>
            <p>Fuel Type: {vehicleSpecs.fuelType} </p>
            <p>Drive Train: {vehicleSpecs.drive} </p>


            {/* {
                loggedIn?
                    user._id == vehicle.createdBy._id?
                        <button onClick={deleteVehicle}>
                            Delete {vehicle.title}
                        </button>
                    :null
                :null
            } */}

            <button onClick={()=>navigate(`/vehicle/rent/${id}`)}>Rent</button>
            
        </div>
    )
}


export default DisplayOneVehicle;