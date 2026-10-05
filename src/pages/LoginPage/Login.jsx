import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from "react";
import { FaApple, FaArrowAltCircleRight, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export function Login(){

const navigate=useNavigate();
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [Error,setError]=useState("");
const [Loading,setLoading]=useState("Sign in");



async function HandleSubmit(e) {
e.preventDefault();
setLoading("Signing in.....");
setError("");

    if (username.trim() === "admin" && password === "123456") {
        sessionStorage.setItem("adminSession", "true");
        localStorage.removeItem("adminSession");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/admin");
        return;
    }

    try {
        
      const res= await fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({username,password})
        
    }) 
    const data= await res.json(); //Transform to object
        if(!res.ok){
            setError(data.message || "Invalid Credentails");
            setLoading("Sign in");
            return;
        }

        localStorage.setItem("token",data.token);
        localStorage.setItem("id",data.id);
    sessionStorage.removeItem("adminSession");
    localStorage.removeItem("adminSession");
        navigate("/Home");



} catch(error){
setError("Something Went Wrong Please Try Again Later");
setLoading("Sign in");
}
}


    return(
        <>
        <div className="Area" >

        <div className="Card" >
            <div className="Card-Header">
                <h1>Welcome Back</h1>
                <p>Please Enter Your Details to Sign in</p>
            </div>
            <div className="Card-Form">
                <form onSubmit={HandleSubmit}>
                    <label id="EmailLabel" htmlFor="UserNameInput">Email or UserName</label>
                    <input name="Username" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" id="UserNameInput" placeholder="name@example.com" />

                    <label htmlFor="PasswordInput">Password</label>
                    <input name="Password" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id="PasswordInput" placeholder="*******"/>
                    <div className="Card-Form-CheckBox">
                    <input id="CheckBoxInput" type="checkbox" />  Stay Signed in for 30 days 
                    </div>
                    {Error && <h6 style={{color:"red"}} >{Error}</h6>}
                    <button type="submit" >{Loading} <FaArrowAltCircleRight/> </button>
                </form>
            </div>
            <br />
            <div className="Card-Footer" >
            <p>-------------  Or Continue With  -------------</p>
            <div className="Card-Footer-Buttons">
            <button><FaGoogle/> Google</button> <button><FaApple/> Apple</button>
            </div>
            <div className="Card-Footer-Below">
            <p>Dont have an accout?</p><Link to={"/Register"} >Register</Link>
            </div>
            </div>

        </div>
        
        </div>
        </>
    )
}
