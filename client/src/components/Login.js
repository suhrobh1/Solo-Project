import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Header from './Header';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {user, setUser} = props;

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log("Message 6:", res.data);
                setUser(res.data);
                navigate(`/user/profile/${res.data.userLoggedIn}`);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div>
            <Header
                link={"/"}
                linkText={"Return Home"}
                titleText={"Rent My Car"}
                setUser = {setUser} user = {user}
            />

            <div class="flex-column mx-auto m-10 w-1/3 bg-sky-100 shadow-md rounded">

                <h1  class="text-2xl pt-4">Login</h1>
                <p className="error-text">{errorMessage ? errorMessage : ""}</p>
                <form class=" px-20 pt-6 pb-8 mb-4" onSubmit={login}>
                    <div class="md:flex md:items-center mb-3">
                        <div class="md:w-1/3">
                            <label class="font-bold">Email</label>
                        </div>
                        <div class="w-2/3">
                            <input class=" border rounded w-full py-2 px-2" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-3">
                        <div class="md:w-1/3">
                            <label class="font-bold">Password</label>
                        </div>
                        <div class="w-2/3">
                            <input class=" border rounded w-full py-2 px-2"  type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div className="center">
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-4 border border-blue-500 hover:border-transparent rounded">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login