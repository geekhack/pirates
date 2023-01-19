//import the libraries
import React ,{useEffect, useRef,useState} from "react";
import { Link,useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'

//styling on the form elements
const mystyle = {
    margin:100

  };
const formgStyles ={
    paddingleft: 10,
    marginbottom:10
}


function PiratesHomeComponent(){

    //creation of state variables
    const [firstname, setFirstName] = useState("")
    const [firstnameError, setFirstNameError] = useState("")
    const [lastname, setLastName] = useState("")
    const [lastnameError, setLastNameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")    
    const [loginemail, setLoginEmail] = useState("")
    const [loginemailError, setLoginEmailError] = useState("")
    const [loginpassword, setLoginPassword] = useState("") 
    const [loginpasswordError, setLoginPasswordError] = useState("")    
    const [confirm_password, setConfirmPassword] = useState("")
    const [confirm_passwordError, setConfirmPasswordError] = useState("")

    //creation of references to the form inputs
    const firstnameRef = useRef(null)
    const lastnameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmpasswordRef = useRef(null)
    //instatiation of the navigate object
    const navigate = useNavigate();

    //handling of form input elements

    function handleFristname(e){
        setFirstName(e.target.value)
        if(e.target.value.length < 1) {
            setFirstNameError("Provide FirstName");
        
        } else {
            setFirstNameError("");
        }

    }
    function handleLastname(e){
        setLastName(e.target.value)
        if(e.target.value.length < 1) {
            setLastNameError("Provide LastName");
        
        } else {
            setLastNameError("");
        }
    }

    function emailValidation(email){
       
        
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(regex.test(email) === false){
            setEmailError("Email is not valid");
            return false;
        }
       

        return true;
    }

    function handleEmail(e){
        setEmail(e.target.value)
        //console.log(emailValidation(email))
    }
    function handlePassword(e){
        setPassword(e.target.value)

        if(e.target.value.length < 6) {
            setPasswordError("Password should be atleast 6 characters");
        
        } else {
            setPasswordError("");
        }
    }
    function handleConfirmPassword(e){
        setConfirmPassword(e.target.value)
        console.log(password)
        console.log(confirm_password)
        if(e.target.value.length < 6) {
            setConfirmPasswordError("Password should be atleast 6 characters");
        
        }
       if(password !== confirm_password) {
            setConfirmPasswordError("Password does not match");
        
        } else {
            setConfirmPasswordError("");
        }
    }
    function handleLoginEmail(e){
        setLoginEmail(e.target.value)
        //emailValidation(loginemail)

        
    }
    function handleLoginPassword(e){
        setLoginPassword(e.target.value)

        if(e.target.value.length < 1) {
            setLoginPasswordError("Provide Password");
        
        }
        else if(e.target.value.length < 6) {
            setLoginPasswordError("Password should be atleast 6 characters");
        
        } else {
            setLoginPasswordError("");
        }
        
    }
    //handling of registeration form
  
    async function handleRegister(e){
        e.preventDefault();
        //alert("hallo there")
        try{
        const formdata={
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            confirm_password:confirm_password,
        }
        //send the data to the server
       await api.registerUser(formdata).then(res=>{
            alert('User added successfully'+ email+password)
            //then login
            
            try{
                const formdata={
                    loginemail: email,
                    loginpassword: password
                }
                //send the data to the server
               api.loginUser(formdata).then(res=>{
                    const token = res.data.token
                    const username = loginemail

                    //can store the items in the local storage
                    localStorage.setItem('token',token) 
                    localStorage.setItem('username',username)        
        
                })

                //reset the form elements
                firstnameRef.current.value =''
                lastnameRef.current.value =''
                emailRef.current.value =''
                passwordRef.current.value =''
                confirmpasswordRef.current.value =''
               
                
             }
             catch(error){
                console.log(error)
             }
       
       })
       console.log(formdata);
        
     }
     catch(error){
        console.log(error)
     }

    }

    //handling if login form 
    async function handleLogin(e){
        e.preventDefault();
        try{
        const formdata={
            loginemail: loginemail,
            loginpassword: loginpassword
        }
        //send the data to the server
       await api.loginUser(formdata).then(res=>{
            const token = res.data.token
            const username = loginemail
            //save the token for use in the brwoser
            localStorage.setItem('token',token) 
            localStorage.setItem('username',username)        

            

            navigate('/user/profile/id')
       
       })
       
        
     }
     catch(error){
        console.log(error)
     }

    }

     //form elements - registration and login
     return(
     
        <div className="row" style={mystyle}>
            <div className="col-sm-5">
            <div className="card">
                        		<div className="card-header">
	                        		<div className="form-top-left">
	                        			<h3>Register</h3>
	                        		</div>
	                        		<div className="form-top-right">
	                        			<i className="fa fa-pencil"></i>
	                        		</div>
	                            </div>
	                            <div className="form">
                                <form role="form" className="form">
				                    	<div className="form-group" style={formgStyles}>
				                    		<label className="sr-only" htmlFor="firstname">First Name:</label>
				                        	<input type="text" name="firstname" ref={firstnameRef} placeholder="firstname" onChange={handleFristname} className="form-control" id="lastname"></input>
                                               <span className="error text-danger">{ firstnameError ? <p>{ firstnameError }</p> : '' } </span>
				                        </div>
                                        <div className="form-group" style={formgStyles}>
				                    		<label className="sr-only" htmlFor="lastname">Last Name:</label>
				                        	<input type="text" name="lastname" ref={lastnameRef} placeholder="lastname" onChange={handleLastname} className="form-control" id="lastname"></input>
                                             <span className="error text-danger">{ lastnameError ? <p>{ lastnameError }</p> : '' } </span>
                                        </div>
                                        <div className="form-group" style={formgStyles}>
				                    		<label className="sr-only" htmlFor="email">Email:</label>
				                        	<input type="text" name="email" ref={emailRef} placeholder="email" onChange={handleEmail} className="form-control" id="email"></input>
                                             <span className="error text-danger">{ emailError ? <p>{ emailError }</p> : '' } </span>
                                        
                                        </div>
				                        <div className="form-group" style={formgStyles}>
				                        	<label className="sr-only" htmlFor="password">Password</label>
				                        	<input type="password" name="password" ref={passwordRef} placeholder="Password" onChange={handlePassword} className="form-control" id="confirm_password"></input>
                                             <span className="error text-danger">{ passwordError ? <p>{ passwordError }</p> : '' } </span>
                                        
                                        </div>
                                        <div className="form-group" style={formgStyles}>
				                        	<label className="sr-only" htmlFor="confirm_password">Password</label>
				                        	<input type="password" name="confirm_password" ref={confirmpasswordRef} onChange={handleConfirmPassword} placeholder="Confirm Password" className="form-control" id="confirm_password"></input>
                                               <span className="error text-danger">{ confirm_passwordError ? <p>{ confirm_passwordError }</p> : '' } </span>
                                        
                                        </div>
                                        <Link to={'/list/pirate'}>
				                        <button type="submit" onClick={handleRegister} className="btn btn-primary">Register</button>
				                        </Link>
                                    </form>
			                    </div>
                        	</div>
            </div>
            <div className="col-sm-5">                        	
                        	<div className="card">
	                        	<div className="card-header">
	                        		<div className="form-top-left">
	                        			<h3>Login</h3>
	                        		</div>
	                        		<div className="form-top-right">
	                        			<i className="fa fa-key"></i>
	                        		</div>
	                            </div>
	                            <div className="form">
				                    <form role="form" className="form">
				                    	<div className="form-group">
				                    		<label className="sr-only" htmlFor="loginemail">Email:</label>
				                        	<input type="email" name="loginemail" placeholder="Email" onChange={handleLoginEmail} className="form-control" id="email"></input>
                                              <span className="error text-danger">{ loginemailError ? <p>{ loginemailError }</p> : '' } </span>
                                        
                                        </div>
				                        <div className="form-group">
				                        	<label className="sr-only" htmlFor="loginpassword">Password</label>
				                        	<input type="password" name="loginpassword" placeholder="Password" onChange={handleLoginPassword} className="form-control" id="confirm_password"></input>
                                               <span className="error text-danger">{ loginpasswordError ? <p>{ loginpasswordError }</p> : '' } </span>
                                        
                                        </div>
				                        <button type="submit" onClick={handleLogin} className="btn btn-primary" >Login</button>
				                    </form>
			                    </div>
		                    </div>
		                
		                		                        
                        </div>

        </div>
    )
}

export default PiratesHomeComponent