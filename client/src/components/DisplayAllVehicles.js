import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from '@reach/router';
import Header from './Header';
import  DeleteButton  from './DeleteButton';
import Footer from './Footer';
import { Testimonials } from './Testimonials';

const DisplayAllVehicles = (props) =>{

    const{user, setUser} = props;
    const {loggedIn, setLoggedIn} = props;
    const [vehicleList, setVehicleList] = useState([]);
    
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
                console.log("User data from db------------",res.data);
                setUser(res.data);
                setLoggedIn(true)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteVehicle = (idFromBelow)=>{
        setVehicleList(vehicleList.filter((vehicle, index)=>vehicle._id !== idFromBelow))
    }

    return(
        <div  >
            <div>
                <Header  link={"/new"} linkText={"Add Vehicle"} titleText={"Rent My Car"} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user} />
            </div>    
                <p class="text-xl m-10">Available For Rent</p>
                <div class=" mx-8 mt-15 flex flex-wrap mx-auto w-2/3 justify-between bg-blue-50 shadow-md rounded ">
                    {
                        vehicleList.map((vehicle, index)=>(
                            
                            <div class="flex-column m-5 w-60 border-2 border-grey-200 rounded p-2 hover:shadow-xl" key={index}>
                                
                                <Link to={`/vehicle/${vehicle._id}`}>
                                    <p >{vehicle.make} {vehicle.model}</p>
                                    <img src={vehicle.image} alt="Vehicle picture" class ="object-cover w-full" />
                                </Link>
                                { 
                                
                                    console.log("CREATED BY ID____",vehicle.createdBy._id, vehicle.model),
                                    console.log("USER____", user._id)
                                
                                }
                            
                                <div>
                                    {
                                        loggedIn ? 
                                            user._id == vehicle.createdBy._id?
                                                <div>
                                                    <Link class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 mr-2 border border-blue-500 hover:border-transparent rounded" to={`/vehicle/edit/${vehicle._id}`}>Edit</Link>
                                                    <DeleteButton 
                                                    id={vehicle._id}
                                                    vehicleList={vehicleList}
                                                    setVehicleList={setVehicleList}
                                                    />
                                                </div>
                                            : null
                                        : null
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <Testimonials/>
                <Footer/>
        </div>
    )
}

export default DisplayAllVehicles;