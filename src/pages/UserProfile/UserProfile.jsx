import "./UserProfile.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from "react";
import { FaHistory, FaSignOutAlt, FaStar, FaUser, FaWallet } from "react-icons/fa";
import { FaCartShopping, FaGear } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";


export function Userprofile(){
const {id}=useParams();
const navigate=useNavigate();
const [loggeduser,setLoggeduser]=useState(null);
useEffect(()=>{
fetch(`https://dummyjson.com/users/${id}`)
.then(res => res.json())
.then(data=>setLoggeduser(data));
},[id])

function handleSignOut(){
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  navigate("/");
}

if (!loggeduser) {
    return(
        <>
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      </>
    )
  }





    return(
        <>
                <div className="User-Page d-flex justify-content-between gap-4" >
                        <div className="User-Sidebar d-flex flex-column  justify-content-between mt-4 ms-4" >
                            <div>
                            <h5>Account</h5>
                            <p>Manage your settings</p>
                            </div> <hr />
                            <Link><FaUser/> My Profile</Link>
                            <Link><FaHistory/> Order History</Link>
                            <Link> <FaGear/> Account Settings</Link> <hr />
                            <Link to="/" onClick={handleSignOut} style={{color:"red"}}> <FaSignOutAlt/> Sign out</Link>
                        </div>
                        <div className="User-Details">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3" >
                                <img src={loggeduser.image} />
                                  <div>
                                <h3>{loggeduser.firstName}{loggeduser.lastName}</h3>
                                <p>{loggeduser.email}</p>
                                  </div>
                                </div>
                                <div className="d-flex flex-column gap-3 me-5">
                                <button id="Edit-Btn" >Edit Profile</button>
                                <button id="Analytics-Btn" >View Anaylticts</button>
                                </div>
                            </div>
                                    <div className="User-Details-Boxes d-flex justify-content-center align-content-center gap-4 mt-5">
                                              <div className="User-Box">
                                                <h5><FaCartShopping /></h5>
                                                <p>Total Orders</p>
                                                <h4>0</h4>
                                              </div>
                                              <div className="User-Box">
                                                <h5 style={{color:"#006C49",backgroundColor:"#EFFFF8"}} ><FaWallet/></h5>
                                                <p>Wallet Balance</p>
                                                <h4>${Math.round( loggeduser.height*15)}</h4>
                                              </div>
                                              <div className="User-Box">
                                                <h5><FaStar/></h5>
                                                <p>Loyalty Points</p>
                                                <h4>{loggeduser.age * 200}</h4>
                                              </div>
                                    </div>


                        </div>
                </div>


       















           



   
        
        
        
        
                               
        
        
        
        </>
    )
}