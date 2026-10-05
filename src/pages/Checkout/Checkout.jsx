import "./Checkout.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCart } from "../Cart/CartContext"; // Import useCart context
import { FaMoneyBill, FaTruck } from "react-icons/fa";
import { useState } from "react";

export function Checkout(){
  const { cartItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Calculate total price
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalTotal = subtotal - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "DISCOUNT10") {
      const calculatedDiscount = subtotal * 0.1;
      setDiscount(calculatedDiscount);
      setPromoMessage({ text: "Promo code applied successfully! (10% off)", type: "text-success" });
    } else {
      setDiscount(0);
      setPromoMessage({ text: "Invalid promo code", type: "text-danger" });
    }
  };
  function SelectCredit(){
        document.getElementById("Credit").classList.add("Selected-Method");
        document.getElementById("Credit-Btn").classList.add("Selected-Method-Btn");
        document.getElementById("COD").classList.remove("Selected-Method");
        document.getElementById("COD-Btn").classList.remove("Selected-Method-Btn");

  }
  function SelectCod(){
        document.getElementById("COD").classList.add("Selected-Method");
        document.getElementById("COD-Btn").classList.add("Selected-Method-Btn");
         document.getElementById("Credit").classList.remove("Selected-Method");
        document.getElementById("Credit-Btn").classList.remove("Selected-Method-Btn");
        
  }

  return(
    <>
    <div className="p-3 m-3" >
<h2>Secure Checkout</h2>
<p style={{color:"#464555"}} >Complete your order with ShopStream's verified protection.</p>
        <div className="  d-flex justify-content-between align-content-center">
                <div className="left" style={{marginleft:"300px"}} >
                        <div className="Shipping-Info d-flex flex-column gap-3  ">
                            <div className="d-flex align-items-center gap-3">
                            <h4 style={{color:"#3525CD"}} ><FaTruck/></h4> <h4> Shipping Information</h4>
                            </div>
                            <div className="d-flex align-items-center gap-4">
                                    <div className="d-flex flex-column">
                        <label htmlFor="FirstNameInput">First Name</label>
                        <input type="text" placeholder="John" id="FirstNameInput" style={{width:"300px",padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />
                                    </div>
                                    <div className="d-flex flex-column">
                        <label htmlFor="LastNameInput">Last Name</label>
                        <input type="text" placeholder="Doe" id="LastNameInput" style={{width:"300px",padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}}/>
                                    </div>
                            </div>
                                <div className="d-flex flex-column">
                        <label htmlFor="AddressInput">Address</label>
                        <input type="text" placeholder="123 Commerce Way" id="AddressInput"style={{padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />
                                </div>

                            <div className="d-flex align-items-center gap-3 ">
                                <div className="d-flex flex-column">
                                        <label htmlFor="CityInput">City</label>
                                        <input type="text" placeholder="New York" id="CityInput" style={{width:"200px",padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />

                                </div>
                                <div className="d-flex flex-column">
                                        <label htmlFor="ZipInput">Zip Code</label>
                                        <input type="number" placeholder="10001" id="ZipInput" style={{width:"200px",padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />

                                </div>
                                <div className="d-flex flex-column">
                                        <label htmlFor="PhoneInput">Phone Number</label>
                                        <input type="number" placeholder="+1 (555) 000-0000" id="PhoneInput" style={{width:"200px",padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />

                                </div>

                            </div>
                        </div>

                        <div className="Payment-Method d-flex flex-column gap-3 mt-5">
                                 <div className="d-flex align-items-center gap-3">
                            <h4 style={{color:"#3525CD"}} ><FaMoneyBill/></h4> <h4>Payment Method</h4>
                            </div>
                        <div id="Credit" className="Credit p-3">
                                <div className="Credit-Select d-flex align-items-center gap-2 mb-2 ">
                                        <button onClick={SelectCredit} id="Credit-Btn" className="mb-1" style={{width:"15px",height:"15px",borderRadius:"50%"}} ></button> <h6>Credit or Debit Card</h6>
                                </div>
                                <div className="Credit-Info">
                                        <div className="d-flex flex-column">
                                                <label htmlFor="CardNumberInput">Card Number</label>
                                                <input type="number" placeholder="0000 0000 0000 0000" id="CardNumberInput" style={{padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />
                                        </div>
                                        <div className="d-flex align-items-center gap-4">
                                                <div className="d-flex flex-column" >
                                                        <label htmlFor="ExpiryInput">Expiry Date</label>
                                                        <input type="number" placeholder="MM/YY" id="ExpiryInput" style={{width:"300px",padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />
                                                </div>
                                                <div className="d-flex flex-column" >
                                                        <label htmlFor="CVCInput">CVC</label>
                                                        <input type="number" placeholder="123" id="CVCInput" style={{width:"300px",padding:"10px",borderRadius:"5px",border:"1px solid black",backgroundColor:"#F8F9FF"}} />
                                                </div>

                                        </div>
                                </div>
                        </div>
                                        <div id="COD" className="COD mt-1 p-3 ">
                                                 <div className="d-flex align-items-center gap-2 mb-2 ">
                                        <button onClick={SelectCod} id="COD-Btn" className="mb-1" style={{width:"15px",height:"15px",borderRadius:"50%"}} ></button> <h6>COD (Cash On Deleivery)</h6>
                                </div>
                                        </div>

                        </div>
                </div>

                <div className="right">
                    <div className="card p-5 shadow-sm me-4 " style={{ width:"450px", backgroundColor: "#DEE9FC", border: "1px solid #ddd", borderRadius: "8px" }}>
                        <h4 className="mb-3">Order Summary</h4>
                        <hr />
                        
                        {cartItems.length === 0 ? (
                            <p className="text-muted">Your cart is empty.</p>
                        ) : (
                            <div className="d-flex flex-column gap-3 mb-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom pb-2 gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <img 
                                                src={item.thumbnail} 
                                                alt={item.title} 
                                                style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "6px" }} 
                                            />
                                            <div>
                                                <h6 className="mb-0" style={{ fontSize: "13px", fontWeight: "600" }}>{item.title}</h6>
                                                <small className="text-muted">Qty: {item.quantity} × ${item.price}</small>
                                            </div>
                                        </div>
                                        <span className="fw-bold" style={{ fontSize: "13px" }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Promo Code Section */}
                        <div className="input-group mb-3">
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Promo code (e.g. DISCOUNT10)" 
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleApplyPromo}>
                                Apply
                            </button>
                        </div>

                        <div className="d-flex justify-content-between mt-2">
                            <span>Total Items:</span>
                            <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="d-flex justify-content-between mt-1 text-success">
                                <span>Discount:</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mt-2 fw-bold fs-5">
                            <span>Total Price:</span>
                            <span style={{ color: "#3525CD" }}>${finalTotal.toFixed(2)}</span>
                        </div>

                        <button className="btn btn-primary w-100 mt-4" disabled={cartItems.length === 0}>
                            Confirm Order
                        </button>
                    </div>            

                </div>
        </div>
</div>





    </> 
);
}