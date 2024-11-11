import React, { useState } from 'react'
import './FormInput.css'

const FormInput = ()=> {
    const [userInput, setUserInput] = useState ({
        username: "",
        email: "",
        fullname: "",
        password: "",
        confirmpassword: "",
    });
    
    const handleInput =(e) =>{
        setUserInput({
            ...userInput,
            [e.target.name]:e.target.value
        });
    }

    console.log(userInput);
    
  return (
    <div className='appForm'>
        <form action="">
            {/* <label>Username</label> */}
            <input type="text" name='username' placeholder='Username' onChange={handleInput} /><br/>
            
            {/* <label>Email</label> */}
            <input type="text" name='email' placeholder='Email' onChange={handleInput} /><br/>

            {/* <label>Fullname</label> */}
            <input type="text" name='fullname' placeholder='Full name'/><br/>

            {/* <label>Password</label> */}
            <input type="text" name='password' placeholder='Password'/><br/>

            {/* <label>Password</label> */}
            <input type="text" name='confirmpassword' placeholder='Confirm password'/><br/>

            <button>Submit</button>
        </form>
    </div>
  )
}

export default FormInput
