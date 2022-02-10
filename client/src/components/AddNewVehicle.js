import React, {useState} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import VehicleForm from './VehicleForm';
import Header from './Header';

const AddNewVehicle = (props) =>{


    const {loggedIn} = props;
    const [errors, setError] = useState({})

    const [newVehicle, setNewVehicle] = useState({
        make: "",
        model: "",
        year: "",
        rate: "",
        image: "",
        currentCity: "",
        currentState: ""
    })

    const newSubmitHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/vehicles",
        newVehicle, {withCredentials:true})
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/home");
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            setError(err.response.data.errors)
        })
    }

    return(
        <div>
            <Header
                link={"/"}
                linkText={"Return Home"}
                titleText={"Add a Vehicle!"}
            />
            {
                loggedIn? 
                    <VehicleForm 
                        vehicle={newVehicle}
                        setVehicle={setNewVehicle}
                        submitHandler={newSubmitHandler}
                        errors={errors}
                        buttonText={"Add Vehicle"}
                        />
                :
                <div>
                    <h3>Please log in to add a vehicle!</h3>
                </div>  
            }
            
        </div>
    )
}

export default AddNewVehicle;