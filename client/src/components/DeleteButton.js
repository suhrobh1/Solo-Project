import React from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const DeleteButton = (props)=>{

    
    const {id, vehicleList, setVehicleList} = props;

    const deleteFilter = (id)=>{
        setVehicleList(vehicleList.filter((vehicle, index) => vehicle._id !== id))
    }

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/vehicles/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
               
                if(vehicleList){ 
                    deleteFilter(id)
                }
                else{ 
                    navigate("/")
                }
            })
            .catch((err) => console.log(err))
    }
    
    return(
        <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 mt-4 border border-red-500 hover:border-transparent rounded" onClick={deleteHandler}>Delete</button>
    )
}

export default DeleteButton;