import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Register =(props) =>{

        const [confirmReg, setConfirmReg] = useState("");
        const [errors, setErrors] = useState({});

        const [user, setUser]= useState({
            firstName: "",
            lastName: "",
            username: "",
            email:"",
            password: "",
            confirmPassword: "",
            address: ""
        });

        const handleChange = (e) => {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            })
        }

        const register = (e) =>{
            e.preventDefault();
            axios.post("http://localhost:8000/api/users/register", user,
            {
                 withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    firstName: "",
                    lastName: "",
                    username: "",
                    email:"",
                    password: "",
                    confirmPassword: "",
                    address: ""
                });
                setConfirmReg(`Thank you for registering ${user.firstName}. You can login now!`);
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
            

        }

    return(
        <div>
            <h1>Register</h1>
            {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
            <form onSubmit={register}>
                <div>
                    <label>First Name</label>
                    {errors.firstName ? (
                        <span className="error-text">
                            {errors.firstName.message}
                        </span>
                    ) : null}
                    <input type="text" name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label>LastName</label>
                    {errors.lastName ? (
                        <span className="error-text">
                            {errors.lastName.message}
                        </span>
                    ) : null}
                    <input type="text" name="lastName" value={user.lastName} onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label>Username</label>
                    {errors.username ? (
                        <span className="error-text">
                            {errors.username.message}
                        </span>
                    ) : null}
                    <input type="text" name="username" value={user.username} onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label>Email</label>
                    {errors.email ? (
                        <span className="error-text">{errors.email.message}</span>
                    ) : null}
                    <input type="email" name="email" value={user.email} onChange={handleChange}/>
                </div>

                <div>
                    <label>Password</label>
                    {errors.password ? (
                        <span className="error-text">
                            {errors.password.message}
                        </span>
                    ) : null}
                    <input type="password" name="password" value={user.password} onChange={handleChange}/>
                </div>

                <div>
                    <label>Confirm Password</label>
                    {errors.confirmPassword ? (
                        <span className="error-text">
                            {errors.confirmPassword.message}
                        </span>
                    ) : null}
                    {
                        // (user.password = user.confirmPassword) ?
                        //    null
                        // : <span>Passwords must match! </span>
                    }
                    
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
                </div>

                <div>
                    <label>Address</label>
                    {errors.address ? (
                        <span className="error-text">
                            {errors.address.message}
                        </span>
                    ) : null}
                    <input type="text" name="address" value={user.address} onChange={(e) => handleChange(e)} />
                </div>

                <div className="center">
                    <button>Register Me</button>
                </div>
            </form>
        </div>
    )
}

export default Register;