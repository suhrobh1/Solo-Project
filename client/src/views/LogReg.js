import React, {useState, useEffect} from 'react';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';


const LogReg =(props) =>{

    
    const {user, setUser} = props;
    const [errors, setErrors] = useState({});


    return(

        <div>
            <Login 
                user = {user} 
                setUser = {setUser}
                errors = {errors}
                setErrors = {setErrors}
                />
            <Register
                errors = {errors}
                setErrors = {setErrors} 
                />
            <Footer/>
        </div>
    )
}

export default LogReg;