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
        <div class="flex-column mx-auto m-10 w-1/3 bg-blue-50 shadow-md rounded" >
            <h1 class="text-2xl pt-4">Register</h1>
            {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
            <form class=" px-20 pt-6 pb-8 mb-4" onSubmit={register}>
                <div class="md:flex md:items-center mb-3">
                    <div class="md:w-1/3">
                        <label class="font-bold">First Name</label>
                    </div>
                    {
                    errors.firstName? 
                        <span>{errors.firstName.message}</span>
                     : null
                     }
                    <div class="w-2/3"> 
                        <input class=" border rounded w-full py-2 px-2" type="text" name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div class="md:flex md:items-center mb-3">
                    <div class="md:w-1/3">
                        <label class="font-bold">LastName</label>
                    </div>
                    {
                        errors.lastName ? 
                            <span>{errors.lastName.message}</span>                       
                        : null
                    }
                    <div class="w-2/3"> 
                        <input class=" border rounded w-full py-2 px-2" type="text" name="lastName" value={user.lastName} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div class="md:flex md:items-center mb-3">
                    <div class="md:w-1/3">
                        <label class="font-bold">Username</label>
                    </div>
                    {errors.username ?  
                        <span >
                            {errors.username.message}
                        </span>
                     : null}
                    <div class="w-2/3">
                        <input class=" border rounded w-full py-2 px-2" type="text" name="username" value={user.username} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div class="md:flex md:items-center mb-3">
                    <div class="md:w-1/3">
                        <label class="font-bold">Email</label>
                    </div>
                    {errors.email ?  
                        <span>{errors.email.message}</span>
                      : null}
                    <div class="w-2/3">
                        <input class=" border rounded w-full py-2 px-2" type="email" name="email" value={user.email} onChange={handleChange}/>
                    </div>
                </div>

                <div class="md:flex md:items-center mb-3">
                    <div class="md:w-1/3">
                        <label class="font-bold">Password</label>
                    </div>
                    {errors.password ?  
                        <span>
                            {errors.password.message}
                        </span>
                      : null}
                    <div class="w-2/3">
                        <input class=" border rounded w-full py-2 px-2" type="password" name="password" value={user.password} onChange={handleChange}/>
                    </div>
                </div>

                <div class="md:flex md:items-center mb-3">
                    <div class="md:w-1/3">
                        <label class="font-bold">Confirm Password</label>
                    </div>
                    {errors.confirmPassword ?  
                        <span >
                            {errors.confirmPassword.message}
                        </span>
                 : null}
                    <div class="w-2/3">
                        <input class=" border rounded w-full py-2 px-2" type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
                    </div>
                </div>

                <div class="md:flex md:items-center mb-3">
                    <div class="md:w-1/3">
                        <label class="font-bold">Address</label>
                    </div>
                    {errors.address ?  
                        <span >
                            {errors.address.message}
                        </span>
                      : null}
                    <div class="w-2/3">
                        <input class=" border rounded w-full py-2 px-2" type="text" name="address" value={user.address} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className="center">
                    <button class=" mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Register Me</button>
                </div>
            </form>
        </div>
    )
}

export default Register;