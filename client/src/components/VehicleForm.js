import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

const VehicleForm = (props) => {
  const { vehicle, setVehicle, submitHandler, errors, buttonText } = props;

  const [file, setFile] = useState(null);

  const onChangeHandler = (e) => {
    const newStateObject = { ...vehicle };
    newStateObject[e.target.name] = e.target.value;

    setVehicle(newStateObject);
  };

  const onFileChange = (e) => {
    console.log(e.target.file);
  };
  return (
    <div class="flex-column mx-auto m-10 w-1/2 bg-blue-50 shadow-md rounded">
      <form class=" px-20 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
        <h2 class="text-lg mb-10">Add Vehicle</h2>
        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Make</label>
          </div>
          <div class="w-1/3">
            <input
              class=" border rounded w-full py-2 px-2"
              class=" border rounded w-full py-2 px-2"
              value={vehicle.make}
              name="make"
              onChange={(e) => onChangeHandler(e)}
              type="text"
            />
          </div>
          {errors.make ? <span>{errors.make.message}</span> : null}
        </div>

        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Model</label>
          </div>
          <div class="w-1/3">
            <input
              class=" border rounded w-full py-2 px-2"
              value={vehicle.model}
              name="model"
              onChange={(e) => onChangeHandler(e)}
              type="text"
            />
          </div>
          {errors.model ? <span>{errors.model.message}</span> : null}
        </div>

        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Make Year</label>
          </div>
          <div class="w-1/3">
            <input
              class=" border rounded w-full py-2 px-2"
              value={vehicle.year}
              name="year"
              onChange={onChangeHandler}
              type="number"
            />
          </div>
          {errors.year ? <span>{errors.year.message}</span> : null}
        </div>

        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Daily Rate</label>
          </div>
          <div class="w-1/3">
            <input
              class=" border rounded w-full py-2 px-2"
              value={vehicle.rate}
              name="rate"
              onChange={onChangeHandler}
              type="number"
            />
          </div>
          {errors.rate ? <span>{errors.rate.message}</span> : null}
        </div>

        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Image URL</label>
          </div>
          <div class="w-2/3">
            <input
              class=" border rounded w-full py-2 px-2"
              value={vehicle.image}
              name="image"
              onChange={onChangeHandler}
              type="text"
            />
          </div>
          {errors.image ? <span>{errors.image.message}</span> : null}
        </div>

        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Image Upload</label>
          </div>
          {errors.image ? <span>{errors.image.message}</span> : null}
          <div class="w-2/3">
            <input
              class=" border rounded w-full py-2 px-2"
              value={file}
              name="image"
              onChange={onFileChange}
              type="file"
            />
          </div>
        </div>

        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Current City</label>
          </div>
          <div class="w-2/3">
            <input
              class=" border rounded w-full py-2 px-2"
              value={vehicle.currentCity}
              name="currentCity"
              onChange={onChangeHandler}
              type="text"
            />
          </div>
          {errors.currentCity ? (
            <span>{errors.currentCity.message}</span>
          ) : null}
        </div>

        <div class="md:flex md:items-center mb-3">
          <div class="md:w-1/3">
            <label class="font-bold">Current State</label>
          </div>
          <div class="w1/4">
            <select
              class=" border rounded w-full py-2 px-2"
              value={vehicle.currentState}
              onChange={onChangeHandler}
              name="currentState"
            >
              <option value="none" defaultValue hidden>
                State
              </option>
              <option value="AK">AK</option>
              <option value="MA">MA</option>
              <option value="WA">WA</option>
              <option value="OR">OR</option>
              <option value="FL">FL</option>
              <option value="CA">CA</option>
              <option value="MN">MN</option>
            </select>
          </div>
          {errors.currentState ? (
            <span>{errors.currentState.message}</span>
          ) : null}
        </div>

        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 mr-2 border border-blue-500 hover:border-transparent rounded">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;
