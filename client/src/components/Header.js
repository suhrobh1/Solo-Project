import React, {useState} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import carLogo from './assets/carLogo.png';



const Header = (props)=>{


    const {link, linkText, titleText, loggedIn, setLoggedIn, user, setUser} = props;

    const logout = (e) => {
       
        axios.post( "http://localhost:8000/api/users/logout",{}, {withCredentials: true, },)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
                setUser("");
            })
            .catch((err) => {
                console.log(err);
            });
            setLoggedIn(false);
    };

    const login = (e) => {
        navigate("/logReg");
    };





    return(
        <div class = " h-20 bg-gray-50 flex flex-row justify-between shadow-lg">
            <Link class = "self-center" to={"/"}><div class= "flex flex-row justify-between  w-30">
                <img class="h-8 self-center ml-8" src={carLogo} alt = "CarLogo"/>
                <h1 class = "self-center ml-4 font-sans text-2xl">{titleText}</h1>
            </div>
            </Link>
            <div class= "flex flex-row justify-between  w-55 items-center mr-8">
              <Link class= "hover:text-blue-600 mr-4 hover:text-lg hover:shaddow-2xl font-sans" to={link}>{linkText}</Link>
              <Link class="hover:text-blue-600 mr-4 hover:text-lg font-sans" to={`/user/profile/${user.username}`}> My Profile</Link>
                {
                    loggedIn?
                        <button class= "hover:text-blue-600 mr-4 hover:text-lg mr-4  font-sans" onClick={logout}>Logout</button>
                    :   <button class= "hover:text-blue-600 mr-4 hover:text-lg mr-4 font-sans " onClick={login}>Login</button>
                }
            </div>
            
        </div>
        
    )
}


export default Header;