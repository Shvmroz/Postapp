import React from "react";
import img from "../Images/image_2024_01_16T07_44_25_972Z.png";
import Data from "./DataFile";


const Banner = () => {

  return (
  <>
  <div className="banner-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h1 style={{marginLeft:'30px', marginBottom:'24px'}}><b>Articles for</b>
               <br />
              <span className="g-clr"><b>front-end devs</b></span>
            </h1>
            <h3 style={{marginLeft:'30px' , color:'gray'}}>Articles on web performance, responsive web design and more</h3>
          </div>
          <div className="col-5 pb-5">
            <img src={img} alt="" className="img-fluid" />
          </div>
        </div>
        <Data/>
      </div>
   </div>
   
   </> 
   
     
   
  );
};

export default Banner;
