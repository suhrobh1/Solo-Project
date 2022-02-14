import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import Header from './Header';


const RentPage = (props) =>{

    const {id, loggedIn, setLoggedIn, user, setUser} = props;

    const [vehicle, setVehicle] = useState({})
    const [vehicleSpecs, setVehicleSpecs] = useState([]);
    const [confirmBook, setConfirmBook] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [order, setOrder]= useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [rentalDuration, setRentalDuration] = useState(0);


    useEffect(()=>{
        
        axios.get(`http://localhost:8000/api/vehicles/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setVehicle(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [])
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


        const bookVehicle = (e) =>{
            e.preventDefault();
            
            axios.post("http://localhost:8000/api/orders",{
                    startDate: startDate,
                    endDate: endDate,
                    rentalDuration: rentalDuration,
                    totalCost: totalCost,
                    model: vehicle.model,
                    image:vehicle.image
                },{withCredentials: true})
                    .then((res) => {
                        setOrder(res.data);
                        console.log(res);
                        setConfirmBook(`${vehicle.model} has been booked! \n Booking confirmation: ORDENR NUMBER (.id from backend)`);
                        setErrors({});
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        setErrors(err.response.data.errors);
                    });
                    setEndDate("");
                    setStartDate("");
                    setSubmitted(true);
        }

        const endDateHandler = (e) => {
            const endDate = e.target.value;
            setEndDate(endDate);
            console.log(e.target.value);
            console.log("_____________________________START____________________________________");
            console.log("Rate", vehicle.rate);
            const startDateProper = new Date(startDate.replace(/-/g, '/'));
            const endDateProper = new Date(endDate.replace(/-/g, '/'));
            console.log(startDateProper);
            console.log(endDateProper);
            const duration = (Math.abs(endDateProper - startDateProper)/86400000);
            setRentalDuration(duration);
            const total =(duration * vehicle.rate);
            setTotalCost(total);
            console.log("Rate again", vehicle.rate);
            console.log("Rental duration",duration);
            console.log("Total cost",total);
            console.log("_____________________________END____________________________________");
        }

    return(
        <div style={{textAlign:"center"}}>
            <div>
                <Header link={"/home"} linkText={"Home"} titleText={"Rent My Ride"}  loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user} />

                <img src={vehicle.image} alt="vehicle image" class = "w30 h-30"/>
                <p>{vehicle.make} {vehicle.model}</p>
                <p>Rental rate: ${vehicle.rate}</p>
                <p>Data provided by USDE.</p>
                <p>MPG City: {vehicleSpecs.city08} </p>
                <p>MPG Highway: {vehicleSpecs.highway08} </p>
                <p>Transmission: {vehicleSpecs.trany} </p>
                <p>Fuel Type: {vehicleSpecs.fuelType} </p>
                <p>Drive Train: {vehicleSpecs.drive} </p>
                
            </div>

            <div>
                <form onSubmit={bookVehicle}>
                    <div>
                        <label>Rent start</label>
                        {/* {errors.startDate? (
                            <span className="error-text">
                                {errors.startDate.message}
                            </span>
                        ) : null} */}
                        <input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>

                    <div>
                        <label>Rent end</label>
                        {/* {errors.endDate ? (
                            <span className="error-text">
                                {errors.endDate.message}
                            </span>
                        ) : null} */}
                        <input type="date" name="endDate" value={endDate} onChange={(e) => endDateHandler(e)} />
                    </div>
                    {
                        submitted && loggedIn ? 
                            <p>{vehicle.model} has been booked! Booking confirmation: {order._id}</p>
                        :
                            <p>Total cost for {rentalDuration} for ${totalCost}.</p>
                    }
                    {
                        !loggedIn?
                            <p>Please log in again as session has expired!</p>
                        : null
                    }

                    <div className="center">
                        <button>Book</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}


export default RentPage;