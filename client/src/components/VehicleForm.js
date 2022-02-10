import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';



const VehicleForm = (props) => {

    const {vehicle, setVehicle, submitHandler, errors, buttonText} = props;


    const onChangeHandler = (e)=>{

        const newStateObject = {...vehicle};
        newStateObject[e.target.name]  = e.target.value;

        console.log("e.target.name = ", e.target.name)
        console.log("e.target.value = ", e.target.value)

        setVehicle(newStateObject);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>

                <div>
                    <label>Make</label>
                    <input value={vehicle.make} name="make" onChange={(e) => onChangeHandler(e)} type="text" />

                    {
                        errors.make ?
                            <span>{errors.make.message}</span>
                            : null
                    }
                </div>

                <div>
                    <label>Model</label>
                    <input value={vehicle.model} name="model" onChange={(e) => onChangeHandler(e)} type="text" />

                    {
                        errors.model ?
                            <span>{errors.model.message}</span>
                            : null
                    }
                </div>

                <div>
                    <label>Make Year</label>
                    <input value={vehicle.year} name="year" onChange={onChangeHandler} type="number" />
                    {
                        errors.year?
                            <span>{errors.year.message}</span>
                            : null
                    }
                </div>

                <div>
                    <label>Rate</label>
                    <input value={vehicle.rate} name="rate" onChange={onChangeHandler} type="number" />
                    {
                        errors.rate?
                            <span>{errors.rate.message}</span>
                            : null
                    }
                </div>

                <div>
                    <label>Image</label>
                    <input value={vehicle.image} name="image" onChange={onChangeHandler} type="text" />

                    {
                        errors.image ?
                            <span>{errors.image.message}</span>
                            : null
                    }
                </div>

                <div>
                    <label>Current City</label>
                    <input value={vehicle.currentCity} name="currentCity" onChange={onChangeHandler} type="text" />

                    {
                        errors.currentCity ?
                            <span>{errors.currentCity.message}</span>
                            : null
                    }
                </div>

                <div>
                    <label>Current State</label>
                    <select value={vehicle.currentState} onChange={onChangeHandler} name="currentState">
                        <option value="none" defaultValue hidden>State</option>
                        <option value="AK">AK</option>
                        <option value="MA">MA</option>
                        <option value="WA">WA</option>
                        <option value="OR">OR</option>
                        <option value="FL">FL</option>
                        <option value="CA">CA</option>
                        <option value="MN">MN</option>
                    </select>
                    {
                        errors.currentState ?
                            <span>{errors.currentState.message}</span>
                            : null
                    }

                </div>

                <button>{buttonText}</button>


            </form>

        </div>
    )
}


export default VehicleForm;