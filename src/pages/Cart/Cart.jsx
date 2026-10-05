import "./Cart.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCart } from "./CartContext";
import CartEmpty from "../../assets/CartEmpty.jpg"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export function Cart() {
  const { cartItems, removeFromCart } = useCart();

  // Calculate total price of all items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 1. Empty Cart View
  if (cartItems.length === 0) {
    return (
     <>
            <div className="Cart-Area d-flex justify-content-center align-items-center">
                <div className="Cart-Msg d-flex flex-column justify-content-center align-items-center ">
                    <img src={CartEmpty}  />
                    <h1 className="mt-4 mb-3 fw-bolder " >Your cart is feeling light</h1>
                    <p className=" text-center" >It looks like you haven't added anything to your cart yet. <br />
Let's find something special for you.</p>
                        <div className="d-flex justify-content-center align-content-center gap-3" >
                    <Link className="Start-Btn" to={"/Products"} >Start Shopping</Link> <Link className="View-Btn" >View Saved Items</Link>
                        </div>
                </div>
            </div>
     </>
    );
  }

  // 2. Cart with Items View
  return (
    <div className="container mt-5 p-4">
      <h2 className="mb-4">Your Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-3 p-3 d-flex flex-row align-items-center justify-content-between shadow-sm"
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                />
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="mb-0 text-muted">
                    ${item.price} × {item.quantity}
                  </p>
                  <p className="fw-bold mb-0 text-primary">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {removeFromCart(item.id);toast.error("Product Removed")}}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Order Summary</h4>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Total Items:</span>
              <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link to={"/Checkout"} className="btn btn-success w-100">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}











{/* <div className="d-flex flex-column align-items-center justify-content-center mt-5 p-5">
        <h2 className="fw-bold text-muted">Your cart is feeling light! 🛒</h2>
        <p className="text-secondary">You haven't added any products to your cart yet.</p>
      </div> */}