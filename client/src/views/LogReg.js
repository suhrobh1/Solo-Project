import React, {useState, useEffect} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';


const LogReg =(props) =>{

    
    const {user, setUser} = props;



    return(

        <div>
            <Login user = {user} setUser = {setUser}/>
            <Register/>
        </div>
    )
}

export default LogReg;