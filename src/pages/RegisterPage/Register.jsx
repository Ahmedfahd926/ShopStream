import "./Register.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaApple, FaArrowAltCircleRight, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";



export function Register(){
    return(
        <>
              <div className="Register-Area" >

        <div className="Register-Card" >
            <div className="Register-Card-Header">
                <h1>Create Account</h1>
                <p>Join ShopStream for a personalized shopping experience</p>
            </div>
            <div className="Register-Card-Form">
                <form action="">
                    <label id="Register-FullNameLabel" htmlFor="Register-FullNameInput">Full Name</label>
                    <input type="text" id="Register-FullNameInput" placeholder="John Doe" />

                    <label id="Register-UserNameLabel" htmlFor="Register-UserNameInput">UserName</label>
                    <input type="text" id="Register-UserNameInput" placeholder="johndoe" />

                    <label id="Register-EmailLabel" htmlFor="Register-EmailInput">Email Address</label>
                    <input type="text" id="Register-EmailInput" placeholder="John@example.com" />

                    <label htmlFor="Register-PasswordInput">Password</label>
                    <input type="password" id="Register-PasswordInput" placeholder="*******"/>

                    <label id="Register-ConPasswordLabel" htmlFor="Register-ConPasswordInput">Confirm Password</label>
                    <input type="password" id="Register-ConPasswordInput" placeholder="*******"/>

                    <div className="Register-Card-Form-CheckBox">
                    <input id="Register-CheckBoxInput" type="checkbox" />  I agree to the <span style={{color:"#3525CD"}}>Terms of service</span> and <span style={{color:"#3525CD"}} >Privacy Policy</span>
                    </div>
                    <button type="submit" >Sign Up <FaArrowAltCircleRight/> </button>
                </form>
            </div>
            <br />
            <div className="Register-Card-Footer" >
            <p>-------------  Or Register With  -------------</p>
            <div className="Register-Card-Footer-Buttons">
            <button><FaGoogle/> Google</button> <button><FaApple/> Apple</button>
            </div>
            <div className="Register-Card-Footer-Below">
            <p>Already have an accout?</p><Link to={"/"} >Sign in</Link>
            </div>
            </div>

        </div>
        
        </div>

          
    
        </>
    )
}