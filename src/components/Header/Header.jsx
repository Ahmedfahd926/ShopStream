import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";


export function Header(){
    return(
        <>
        

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <h4 id="Brand" >ShopStream</h4>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to={"/Home"} >Home</Link>
        </li>
        <li class="nav-item">
          <Link to={"/Products"}>Products</Link>
        </li>
        <li class="nav-item">
          <Link>Categories</Link>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <button id="SearchBtn" type="submit"><FaMagnifyingGlass/></button>
        <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search"/>
      </form>
      <div className="Icon-Links">
      <Link to={"/Cart"} ><FaShoppingCart/></Link>
      {localStorage.getItem("token") && <Link to={`/user/${localStorage.getItem("id")}`} ><FaUser/></Link>}
      </div>
    </div>
  </div>
</nav>










        
        
        </>
    )
}