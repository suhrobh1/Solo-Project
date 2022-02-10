import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import Header from './Header';



const DisplayOneVehicle = (props) =>{

    const {id, loggedIn, setLoggedIn} = props;
    const [vehicle, setVehicle] = useState({})

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
           <Header link={"/new"} linkText={"Add a new vehicle"} titleText={"Rent My Ride"} />

            <img src={vehicle.image} alt="vehicle image" 
            style={{width:"150px", height:"150px"}}/>
            <p>{vehicle.genre}</p>
            <p>{vehicle.yearReleased}</p>
            <p>{vehicle.rating}</p>
            <p>{vehicle.company}</p>


            {
                loggedIn?
                    <button onClick={deleteVehicle}>
                        Delete {vehicle.title}
                    </button>
                :null
            }


            
        </div>
    )
}


export default DisplayOneVehicle;