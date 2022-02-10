import React, {useState} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';



const Header = (props)=>{


    const {link, linkText, titleText, loggedIn, setLoggedIn} = props;

    const logout = (e) => {
       
        axios.post( "http://localhost:8000/api/users/logout",{}, {withCredentials: true, },)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
            });
            setLoggedIn(false);
    };

    const login = (e) => {
        navigate("/");
    };





    return(
        <div>
            <h1 style={{ fontSize: "20px", marginLeft: "300px", marginRight: "300px" }}>{titleText}</h1>
            <div>
                <Link to={link}>{linkText}</Link>

                {
                    loggedIn?
                        <button onClick={logout}>Logout</button>
                    :   <button onClick={login}>Login</button>
                }

                
            </div>
            
        </div>
        
    )
}


export default Header;