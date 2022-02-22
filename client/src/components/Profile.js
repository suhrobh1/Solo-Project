import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from "./Header";
import DeleteButton from "./DeleteButton";
import Footer from "./Footer";

const Profile = (props) => {
  const { username, loggedIn, setLoggedIn, user, setUser } = props;
  const [userVehicleList, setUserVehicleList] = useState([]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/vehiclesByUser/${username}`, {
        withCredentials: true,
      })

      .then((res) => {
        console.log("Message 7:", res.data);
        setUserVehicleList(res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/secure`, { withCredentials: true })
      .then((res) => {
        console.log("Message 8:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8000/api/ordersByUser/${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Message 9:", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteOrderFilter = (id) => {
    setOrders(orders.filter((order, index) => order._id !== id));
    console.log(orders._id);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/orders/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        if (orders) {
          deleteOrderFilter(id);
        } else {
          navigate("/user/profile/:username");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header
        link={"/"}
        linkText={"Home"}
        titleText={"Rent My Car"}
        loggedIn={loggedIn}
        setUser={setUser}
        user={user}
      />
      {loggedIn ? (
        <div>
          <h1 class="flex justify-center text-xl m-8">
            Welcome {user.firstName}
          </h1>
          <div class="border-2 border-sky-200 rounded m-2 p-3">
            <h2 class="text-lg flex mb-10">My Inventory</h2>
            <div class="flex justify-around">
              {userVehicleList.map((vehicle, index) => {
                return (
                  <div class="flex-row justify-center" key={index}>
                    <div class=" flex border-2 border-grey-200 rounded p-2 hover:shadow-xl">
                      <div class="w-60">
                        <h3 class="font-bold mb-2">
                          {vehicle.make} {vehicle.model}
                        </h3>
                        <img
                          src={vehicle.image}
                          alt="Vehicle picture"
                          class="w-30 h-30"
                        />
                        <p>Make year: {vehicle.year}</p>
                        <p>Daily rate: ${vehicle.rate}</p>
                      </div>
                    </div>
                    <Link
                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 mr-2 border border-blue-500 hover:border-transparent rounded"
                      to={`/vehicle/edit/${vehicle._id}`}
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      id={vehicle._id}
                      vehicleList={userVehicleList}
                      setVehicleList={setUserVehicleList}
                    />
                  </div>
                );
              })}
            </div>
            <button
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 border border-blue-500 hover:border-transparent rounded"
              onClick={(e) => navigate("/new")}
            >
              Add Vehicle
            </button>
          </div>
          <div class="border-2 border-sky-200 rounded m-2 p-3">
            <h2 class="text-lg flex mb-10">My Rental History</h2>
            <div class="flex justify-around">
              {orders.map((order, index) => {
                return (
                  <div class="flex-row justify-center" key={index}>
                    <div class="flex-column w-60 border-2 border-grey-200 rounded p-2 hover:shadow-xl">
                      <p class="font-bold mb-2">{order.model}</p>
                      <img
                        src={order.image}
                        alt="vehicle image"
                        class="object-cover w-full"
                      />
                      <p>Order ID: {order._id}</p>
                      <p>Cost: ${order.totalCost}</p>
                    </div>
                    <button
                      class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 mt-4 border border-red-500 hover:border-transparent rounded"
                      onClick={(e) => deleteHandler(order._id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 class="m-8 text-xl">Please log in to see your profile!</h3>
        </div>
      )}
      <Footer/>
    </div>
  )
};

export default Profile;
