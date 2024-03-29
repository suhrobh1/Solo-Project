import React, {useState, useEffect} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import VehicleForm from './VehicleForm';
import Header from './Header';

const AddNewVehicle = (props) =>{


    const {loggedIn, setLoggedIn, user,  setUser} = props;
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
            navigate("/");
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            setError(err.response.data.errors)
        })
    }

    useEffect(() => {// setting user state for login validation
        axios.get("http://localhost:8000/api/users/secure",
            { withCredentials: true }
        )
            .then((res) => {
                console.log("User data from db------------",res.data);
                setUser(res.data);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return(
        <div>
            <Header
                link={"/"}
                linkText={"Return Home"}
                titleText={"Rent My Car"}
                setUser = {setUser} user = {user}
                loggedIn = {loggedIn}
                setLoggedIn = {setLoggedIn}
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
                    <h3 class="m-8 text-xl">Please log in to add a vehicle!</h3>
                </div>  
            }
            
        </div>
    )
}

export default AddNewVehicle;