import { useEffect, useState } from "react";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomeHeroImg from "../../assets/HomeHeroImg.png";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FaCartPlus, FaCartShopping } from "react-icons/fa6";

export function Home(){
    const [products,setProducts]=useState([]);
useEffect(()=>{
fetch('https://dummyjson.com/products?limit=4')
.then(res => res.json())
.then(data=>setProducts(data.products));
},[]);

    return(
        <>
        <div className="Hero d-flex justify-content-around align-items-center">
            <div className="Hero-Content h-50 d-flex flex-column justify-content-between align-items-start">
                <div className="Hero-Content-Content">

            <p id="NewSeason" className="mb-4" >New Season Arrival</p>
            <h1 id="Experience" className="mb-4" >Experience the Future of <br /> <span style={{color:"#3525CD"}} >Innovation</span></h1>
            <p id="Explore" className="mb-5">Explore our curated selection of premium electronics
designed to elevate your daily stream of life. Precision
engineering meets minimalist design.</p>
                </div>
        <div className="Hero-Content-Btn">
            <button id="ElectronicsBtn" >Shop Electronics</button> <button id="ViewBtn" >View Collection</button>
        </div>
            </div>
            <div className="Hero-Img">
                <img src={HomeHeroImg}/>
            </div>
        </div>
        <div className="Above-TopCategories d-flex justify-content-between align-items-center mt-5 ">
            <div className="Above-TopCategories-Left ms-3">
                <h1>Top Categories</h1>
                <p>curated gear for every lifestyle</p>
            </div>
            <div className="Above-TopCategories-Right me-3 ">
                <Link>see all <FiArrowRight/> </Link>
            </div>
        </div>

        <div className="TopCategories d-flex  justify-content-around align-items-center">
        <div className="TopCategories-Left">
            <h5 className=" position-relative " style={{top:"420px"}} >Computing</h5>
            <p className=" position-relative" style={{top:"410px"}} >Work and play without limits</p>
        </div>
        <div className="TopCategories-Right">
        <div className="row">
            <div className=" Wearbles me-5 col-8">
            <h6  className=" position-relative " style={{top:"230px"}} >Wearables</h6>
            </div>
            <div className=" Audio col-4">
            <h6 className=" position-relative " style={{top:"230px"}} >Audio</h6>
            </div>
            <div className="row">
                <div className=" Theater mt-4 col-12">
            <h5>Home Theater</h5>
                </div>
            </div>
        </div>
        </div>
        </div>

        <div className="TopProducts ms-5 me-5 " style={{marginTop:"100px"}} >
            <h2>Feautured Prodcuts</h2>
            <p>The latest and greatest in tech innovation.</p>






        <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button  type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1">1</button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2">2</button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3">3</button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
        <div className="row">

                {products.map(p=>(

             <div className=" col-lg-3 col-md-6 col-sm-12">
            <div class="card" key={p.id} >
            <img src={p.thumbnail} class="card-img-top" />
            <div class="card-body d-flex justify-content-between align-items-end">
                <div>
                <h5 class="card-title">{p.title}</h5>
                <p class="card-text"> ${p.price}</p>
                </div>
                <Link> <FaCartPlus/> </Link>
            </div>
            </div>
        </div>

))}



        </div>
    </div>
    <div class="carousel-item">

        <div className="row">



                    {products.map(p=>(

             <div className=" col-lg-3 col-md-6 col-sm-12">
            <div class="card" >
            <img src={p.thumbnail} class="card-img-top" />
            <div class="card-body d-flex justify-content-between align-items-end">
                <div>
                <h5 class="card-title">{p.title}</h5>
                <p class="card-text"> ${p.price}</p>
                </div>
                <Link> <FaCartPlus/> </Link>
            </div>
            </div>
        </div>

))}

        </div>


    </div>
    <div class="carousel-item">



        <div className="row">


        {products.map(p=>(

             <div className=" col-lg-3 col-md-6 col-sm-12">
            <div class="card" >
            <img src={p.thumbnail} class="card-img-top" />
            <div class="card-body d-flex justify-content-between align-items-end">
                <div>
                <h5 class="card-title">{p.title}</h5>
                <p class="card-text"> ${p.price}</p>
                </div>
                <Link> <FaCartPlus/> </Link>
            </div>
            </div>
        </div>

))}





        </div>




    </div>
  </div>
  
</div>



        </div>



                <div className="Above-Footer mt-5 ms-5 me-5">
                    <h1 className="mb-3">Stay Ahead of the Stream</h1>
                    <p className="mb-3" >Join our inner circle for exclusive early access to product launches, seasonal
deals, and curated tech trends. No spam, just high-quality updates.</p>
                        <form action="">
                    <input className="mt-4 me-2" type="email" placeholder="Enter Your Email"/> <button>join now</button>
                        </form>

                </div>
        
        
        
        
        </>
    )
}













//  {products.map(p=>(

//              <div className=" col-lg-3 col-md-6 col-sm-12">
//             <div class="card" >
//             <img src={p.thumbnail} class="card-img-top" />
//             <div class="card-body d-flex justify-content-between align-items-end">
//                 <div>
//                 <h5 class="card-title">{p.title}</h5>
//                 <p class="card-text"> ${p.price}</p>
//                 </div>
//                 <Link> <FaCartPlus/> </Link>
//             </div>
//             </div>
//         </div>

// ))}