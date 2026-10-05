import "./ProductDetails.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from "react";
import { FaCheck, FaHeadset, FaRegCheckCircle, FaShoppingBag, FaTruck } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import "react-toastify/dist/ReactToastify.css"; 
import { toast } from "react-toastify";
export function ProductDetails(){
const {id}=useParams();
const [count,setCount]=useState(1);
const [SelectedProduct,setSelectedProduct]=useState(null);
const {addToCart}=useCart();
useEffect(()=>{
fetch(`https://dummyjson.com/products/${id}`)
.then(res => res.json())
.then(data=>setSelectedProduct(data));
},[id]);


if (!SelectedProduct) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  function increment(){
    setCount(count+1);
  }
  function decrement(){
      if(count>1){
        setCount(count-1);
      }
  }


    return(
        <>
              <div className="Deatils-Area  p-5 d-flex justify-content-around ">
                <div className="Details-Img"> 
                  <img src={SelectedProduct.thumbnail} />
                </div>
                <div className="Details-Content d-flex flex-column justify-content-evenly">
                      <div className="Deatils-Content-Header">
                        <p>{SelectedProduct.sku}</p>
                        <h1>{SelectedProduct.title}</h1>
                            <div className="d-flex align-items-center gap-3" >
                         <p>⭐⭐⭐⭐⭐⭐</p>
                         <p>{SelectedProduct.rating}</p>
                            </div>
                            <div className="d-flex align-items-center gap-3" >
                        <h1>${SelectedProduct.price}</h1>
                        <h5><del>${SelectedProduct.price*SelectedProduct.discountPercentage+SelectedProduct.price}</del></h5>
                            </div>
                        </div>
                        <div className="Details-Content-Body">
                          <h6 style={{width:"400px",letterSpacing:"1px"}} >{SelectedProduct.description}</h6>
                          <h6>Selected Color:</h6>
                          <div className="d-flex  align-items-center gap-2" >
                          <button style={{backgroundColor:"midnightblue"}} className="Color-Btn" ></button> <button  style={{backgroundColor:"black"}}    className="Color-Btn" ></button> <button  style={{backgroundColor:"crimson"}}  className="Color-Btn" ></button>
                          </div>
                          </div>
                          <div className="Details-Content-Footer d-flex flex-column ">
                            <div className="d-flex align-items-center" >
                            <button className="Minus-Btn" onClick={decrement}  >-</button> <input type="number" value={count} readOnly/> <button  className="Plus-Btn "  onClick={increment} >+</button>
                            <button onClick={()=>{addToCart(SelectedProduct,count);toast.success("Product Added Succesfully!")}}  className="Cart-Btn d-flex justify-content-center align-items-center gap-2" > <FaShoppingBag/> Add to cart</button>
                            </div>
                            <button className="Buy-Btn" >Buy Now</button>
                            <div className=" d-flex justify-content-around align-items-center mt-4">
                            <p className=" d-flex justify-content-center align-items-center gap-2" > <FaRegCheckCircle/> {SelectedProduct.warrantyInformation}</p>
                            <p className=" d-flex justify-content-center align-items-center gap-2"><FaTruck/>Fast 2-Day Deleviery </p>
                            </div>
                            <div className=" d-flex justify-content-around align-items-center mt-1">
                            <p className=" d-flex justify-content-center align-items-center gap-2" > <FaCheck/> 30-Days Returns</p>
                            <p className=" d-flex justify-content-center align-items-center gap-2"><FaHeadset/>lifetime Support </p>
                            </div>
                            </div>                 
                </div>
              </div>


                            <div className="Additional-Info">
                              <nav className="d-flex justify-content-start align-items-center gap-3 ms-3" >
                                <Link>Specifications</Link>
                                <Link>Users Reviews</Link>
                                <Link>e&A</Link>
                                <Link>Downloads</Link>
                              </nav>
                              <div className=" mt-4 d-flex justify-content-evenly align-items-center">
                                <div className="Boxes">
                                  <h2>Physical</h2>
                                  <div className=" mt-4 d-flex justify-content-between align-items-center">
                                    <p>Weight</p>
                                    <h6>{SelectedProduct.weight}g</h6>
                                  </div><hr />
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p>Width</p>
                                    <h6>{SelectedProduct.dimensions.width}cm</h6>
                                  </div> <hr />
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p>Height</p>
                                    <h6>{SelectedProduct.dimensions.height}cm</h6>
                                  </div> <hr />
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p>Depth</p>
                                    <h6>{SelectedProduct.dimensions.depth}cm</h6>
                                  </div> 
                                  

                                </div>
                                <div className="Boxes">
                                  <h2>Additional Info</h2>
                                  <div className=" mt-4 d-flex justify-content-between align-items-center" >
                                  <p>Created At</p>
                                  <h6>{SelectedProduct.meta.createdAt}</h6>
                                  </div> <hr />
                                  <div className="d-flex justify-content-between align-items-center" >
                                  <p>Updated At</p>
                                  <h6>{SelectedProduct.meta.updatedAt}</h6>
                                  </div> <hr />
                                  <div className="d-flex justify-content-between align-items-center" >
                                  <p>Barcode</p>
                                  <h6>{SelectedProduct.meta.barcode}</h6>
                                  </div> <hr />
                                  <div className="d-flex justify-content-between align-items-center" > 
                                  <p>Return Policy</p>
                                  <h6>{SelectedProduct.returnPolicy} days </h6>
                                  </div>
                                </div>
                                <div className="Boxes">
                                  <h2>Qr Code</h2>
                                  <img src={SelectedProduct.meta?.qrCode}  style={{width:"300px",marginTop:"10px"}} />                                  
                                </div>
                              </div>
                            </div>
        
        
        
        
        </>
    )
}