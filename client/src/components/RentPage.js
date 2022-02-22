import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from "./Header";

const RentPage = (props) => {
  const { id, loggedIn, setLoggedIn, user, setUser } = props;
  const today = new Date();

  const [vehicle, setVehicle] = useState({});
  const [vehicleSpecs, setVehicleSpecs] = useState([]);
  const [confirmBook, setConfirmBook] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [order, setOrder] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [rentalDuration, setRentalDuration] = useState(0);
  const [dateErrorStart, setDateErrorStart] = useState(false);
  const [dateErrorEnd, setDateErrorEnd] = useState(false);
  const [startDateProper, setStartDateProper ] = useState('');
  const [endDateProper, setEndDateProper] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/vehicles/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setVehicle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // setting user state for login validation
    axios
      .get("http://localhost:8000/api/users/secure", { withCredentials: true })
      .then((res) => {
        console.log("User data from db------------", res.data);
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=Nissan&model=Altima`
      )
      .then((res) => {
        console.log(res);
        console.log("Data from API", res.data.vehicle[0]);
        setVehicleSpecs(res.data.vehicle[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const bookVehicle = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/orders",
        {
          startDate: startDate,
          endDate: endDate,
          rentalDuration: rentalDuration,
          totalCost: totalCost,
          model: vehicle.model,
          image: vehicle.image,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setOrder(res.data);
        console.log(res);
        setConfirmBook(
          `${vehicle.model} has been booked! \n Booking confirmation: ORDENR NUMBER (.id from backend)`
        );
        setErrors({});
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
    setEndDate("");
    setStartDate("");
    setSubmitted(true);
  };
  

  const startDateHandler = (e) => {
    const startDate = e.target.value;
    setStartDate(startDate);
    const startDateProper = new Date(startDate.replace(/-/g, "/"));
    setStartDateProper(startDateProper);
    if (startDateProper < today) {
      setDateErrorStart(true);
    } else {
      setDateErrorStart(false);
    }
  };

  const endDateHandler = (e) => {
    const endDate = e.target.value;
    setEndDate(endDate);
    const endDateProper = new Date(endDate.replace(/-/g, "/"));
    setEndDateProper(endDateProper);
    const today = new Date();
    if (endDateProper < today) {
      setDateErrorEnd(true);
    } else {
      setDateErrorEnd(false);
      const duration = Math.abs(endDateProper - startDateProper) / 86400000;
      setRentalDuration(duration);
      const total = duration * vehicle.rate;
      setTotalCost(total);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Header
        link={"/"}
        linkText={"Home"}
        titleText={"Rent My Car"}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setUser={setUser}
        user={user}
      />
      <div class="flex-column mx-auto m-10 w-2/3 bg-blue-50 shadow-md rounded">
        <div class="flex items-center">
          <div class="w-1/2">
            <img
              src={vehicle.image}
              alt="vehicle image"
              class="object-cover w-full p-2"
            />
          </div>
          <div class="flex-column p-10 justify-start w-1/2">
            <p class="font-bold text-2xl mb-3">
              {vehicle.make} {vehicle.model}
            </p>
            <div class="flex justify-between">
              <p>Rental rate:</p>
              <p>${vehicle.rate}</p>
            </div>
            <div class="flex justify-between">
              <p>Location:</p>
              <p>
                {vehicle.currentCity}, {vehicle.currentState}
              </p>
            </div>
            <p class="text-xs italic mb-2 mt-6">
              Data below provided by USDE. May not be available for all makes.
            </p>
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
        <div>
          <form onSubmit={bookVehicle}>
            <div class="ml-6 flex items-center justify-self-center">
              <div class="flex items-center mb-3 w-1/2 ">
                <div class="w-1/4">
                  <label class="font-bold">Rent start</label>
                </div>
                <div class="w-full">
                  <input
                    class="border rounded w-1/2 py-2 px-2"
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => startDateHandler(e)}
                  />
                  {dateErrorStart ? (
                    <span class=" text-xs bg-red-200 shadow-md border rounded">
                      Please pick a future start date!
                    </span>
                  ) : null}
                </div>
              </div>
              <div class="flex items-center mb-3 w-1/2">
                <div class="w-1/4">
                  <label class="font-bold">Rent end</label>
                </div>
                <div class="w-full">
                  <input
                    class="border rounded w-1/2 py-2 px-2"
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => endDateHandler(e)}
                  />
                </div>
                {dateErrorEnd ? (
                  <span class=" text-xs bg-red-200 shadow-md border rounded">
                    Please pick a future end date!
                  </span>
                ) : null}
              </div>
            </div>
            <div class="m-4">
              {submitted && loggedIn ? (
                <p>
                  {vehicle.model} has been booked! Booking confirmation:{" "}
                  {order._id}
                </p>
              ) : (
                <p>
                  Total cost for {rentalDuration} for ${totalCost}.
                </p>
              )}
              {!loggedIn ? (
                <p>Please log in again as session has expired!</p>
              ) : null}
            </div>
            <div className="center">
              <button
                class="mb-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 mr-2 border border-blue-500 hover:border-transparent rounded"
                onClick={() => navigate(`/vehicle/rent/${id}`)}
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentPage;
