// import React, { useState } from 'react';
// import { Link, navigate } from '@reach/router';
// import axios from 'axios';



// const UserForm = (props) => {

//     const {vehicle, setVehicle, submitHandler, errors, buttonText} = props;


//     const onChangeHandler = (e)=>{

//         const newStateObject = {...vehicle};
//         newStateObject[e.target.name]  = e.target.value;

//         console.log("e.target.name = ", e.target.name)
//         console.log("e.target.value = ", e.target.value)

//         setGame(newStateObject);
//     }



//     return (
//         <div>
//              <h1>Register</h1>
//             {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
            // <form onSubmit={register}>
            //     <div>
            //         <label>Username</label>
            //         {errors.username ? (
            //             <span className="error-text">
            //                 {errors.username.message}
            //             </span>
            //         ) : null}
            //         <input type="text" name="username" value={user.username} onChange={(e) => handleChange(e)} />
            //     </div>

            //     <div>
            //         <label>Email</label>
            //         {errors.email ? (
            //             <span className="error-text">{errors.email.message}</span>
            //         ) : null}
            //         <input type="email" name="email" value={user.email} onChange={handleChange}/>
            //     </div>

            //     <div>
            //         <label>Password</label>
            //         {errors.password ? (
            //             <span className="error-text">
            //                 {errors.password.message}
            //             </span>
            //         ) : null}
            //         <input type="password" name="password" value={user.password} onChange={handleChange}/>
            //     </div>

            //     <div>
            //         <label>Confirm Password</label>
            //         {errors.confirmPassword ? (
            //             <span className="error-text">
            //                 {errors.confirmPassword.message}
            //             </span>
            //         ) : null}
            //         <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
            //     </div>

            //     <div className="center">
            //         <button>Register Me</button>
            //     </div>
            // </form>

//         </div>
//     )
// }


// export default UserForm;