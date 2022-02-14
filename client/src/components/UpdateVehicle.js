import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import VehicleForm from './VehicleForm';
import Header from './Header';


const UpdateVehicle = (props)=>{

    const {id, user, setUser} = props;

    const [editedVehicle, setEditedVehicle] = useState({
        make: "",
        model: "",
        year: "",
        rate: "",
        image: "",
        currentCity: "",
        currentState: ""
    })

    const [errors, setError] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/vehicles/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setEditedVehicle(res.data)
            })
            .catch((err)=>{
                console.log(err);
            });
    }, [])

const editSubmitHandler = (e)=>{
    e.preventDefault();

    axios.put(`http://localhost:8000/api/vehicles/${id}`,editedVehicle)
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
                link={"/home"}
                linkText={"Return Home"}
                titleText={"Edit a Vehicle!"}
                setUser = {setUser} user = {user}
            />

            <VehicleForm 
            vehicle={editedVehicle}
            setVehicle={setEditedVehicle}
            submitHandler={editSubmitHandler}
            errors={errors}
            //button in our Form.js will show different text 
                //depending on which parent component is currently rendering
            buttonText={"Update Vehicle"}
            />
        </div>
    )
}

export default UpdateVehicle;