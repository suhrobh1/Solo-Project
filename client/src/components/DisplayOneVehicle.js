import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import Header from './Header';
import RentPage from './RentPage';



const DisplayOneVehicle = (props) =>{
    const {id, loggedIn, setLoggedIn, user, setUser, socket } = props;
    const [vehicle, setVehicle] = useState({})
    const [vehicleSpecs, setVehicleSpecs] = useState([]);


    const [messageList, setMessageList] = useState([]);
    const [content, setContent] = useState("");

    // useEffect also populate your comments
    useEffect(()=>{
        console.log('grabbing the car id', id)
        axios.get(`http://localhost:8000/api/vehicles/${id}`)
            .then((res)=>{
                // console.log(res);
                console.log("this is my car", res.data);

                setVehicle(res.data);
                // useEffect also populate your comments in messageList
                // setMessageList(res.data.messages);
                
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])
    console.log('MY VEHICLE')
    console.log(vehicle)
    
    useEffect(() => {//API stuff
        axios.get(`https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=${vehicle.make}&model=${vehicle.model}`)
            .then((res) => {
                console.log(res);
                console.log("Data from API",res.data.vehicle[0]);
                setVehicleSpecs(res.data.vehicle[0]);
            })
            .catch((err)=>{
                console.log(err)
            })
        axios.get(`http://localhost:8000/api/messages`)
            .then((res) => {
                console.log(" axios call to get all messages", res.data);
                
                setMessageList(res.data.filter((message, index) => id === message.associatedVehicle));
            })
            .catch((err)=> {
                console.log(err);
            })
        }, [vehicle])

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
    
    const deleteVehicle = () =>{
        axios.delete(`http://localhost:8000/api/vehicles/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(() => {
        socket.on("Update_chat_likes", (data)=> {
            console.log("Socket updated list", data);
            setMessageList(data);
        })
    }, [])
    
    const addMessage= ()=>{
        console.log("user info:_____", user.username)
        axios.post(`http://localhost:8000/api/messages`, {content, associatedVehicle:id, author:user.username })
            .then((res) => {
               setMessageList([...messageList, res.data]);
            })
            .catch((err)=> {
                console.log(err);
            })
            setContent("");
    }

    const likeMessage = (messageFromBelow)=>{
        axios.put(`http://localhost:8000/api/messages/${messageFromBelow._id}`,
        {
            likes: messageFromBelow.likes + 1
        }
        )
        .then((res)=>{
            // console.log(res.data);

            let updatedMessageList = messageList.map((message, index)=>{
                
                if(message === messageFromBelow){
                    let messageHolder = {...res.data};
                    return messageHolder;
                }
                return message;
            });
            
            // setMessageList(updatedMessageList);
            socket.emit("Update_chat", updatedMessageList)
        })
    }

   // console.log("=======================")
    // console.log(messageList)

    return(
        <div>
           <Header link={"/new"} linkText={"Add a new vehicle"} titleText={"Rent My Car"} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user}/>
            <div class="flex-column mx-auto m-10 w-2/3 bg-blue-50 shadow-md rounded">
                <div class="flex items-center">
                    <div class="w-1/2">
                        <img src={vehicle.image} alt="vehicle image" class="object-cover w-full p-2" />
                    </div>
                    <div class="flex-column p-10 justify-start w-1/2">
                        <p class="font-bold text-2xl mb-3" >{vehicle.make} {vehicle.model}</p>
                        <div class="flex justify-between">
                            <p>Rental rate:</p>
                            <p>${vehicle.rate}</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Location:</p>
                            <p>{vehicle.currentCity}, {vehicle.currentState}</p>
                        </div>
                            <p class="text-xs italic mb-2 mt-6">Data below provided by USDE. May not be available for all makes.</p>
                        <div class="flex justify-between">
                            <p>MPG City:</p>
                            <p>{vehicleSpecs.city08}</p>
                        </div>
                        <div class="flex justify-between">
                            <p>MPG Highway:</p>
                            <p>{vehicleSpecs.highway08}</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Transmission:</p>
                            <p>{vehicleSpecs.trany}</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Fuel Type:</p>
                            <p>{vehicleSpecs.fuelType}</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Drive Train:</p>
                            <p>{vehicleSpecs.drive}</p>
                        </div>
                    </div>
                </div>
                    <button class="mb-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 mr-2 border border-blue-500 hover:border-transparent rounded" onClick={()=>navigate(`/vehicle/rent/${id}`)}>Rent</button>
            </div>
                <div class="flex-column justify-center mx-auto m-10 p-5 w-2/3 bg-teal-50 shadow-md rounded">
                        <h1 class="flex justify-center text-xl m-8">Customer Reviews</h1>
                        {

                            loggedIn? 
                                <div class="flex-column justify-self-center">
                                    <input class="border rounded w-full py-2 px-2 h-20" type="text"  value = {content} onChange={(e) =>setContent(e.target.value)}/>
                                    <button onClick={addMessage} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 mr-2 border border-blue-500 hover:border-transparent rounded">Submit</button>
                                </div>
                                :<p>Please log in to write a review!</p>
                        }      
                        
                    {
                        messageList ?
                            messageList.map((message, index) => (
                                
                                <div key={index}>
                                    <div class="flex-column mx-auto bg-yellow-50 shadow-md rounded w-3/4">
                                        <p class="flex alignt-self-left font-bold m-2">{message.author}:</p>
                                        <div class="flex justify-between items-center p-2">
                                            <p class="italic">{message.content}</p>
                                            <button onClick={(e)=>likeMessage(message)} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 mr-2 border border-blue-500 hover:border-transparent rounded" >Like {message.likes}</button>
                                        </div>
                                    </div>
                                </div>
                                
                            ))
                        : null
                    }
                </div>
                
        </div>
    )
}


export default DisplayOneVehicle;