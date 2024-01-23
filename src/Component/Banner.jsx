import React from "react";
import img from "../Images/image_2024_01_16T07_44_25_972Z.png";
import Data from "./Data";
import { Link } from "react-router-dom";

const Banner = () => {

  return (
    <>
      <div className="banner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <h1 style={{ marginLeft: '30px', marginBottom: '24px' }}><b>Articles for</b>
                <br />
                <span className="g-clr"><b>front-end devs</b></span>
              </h1>
              <h3 style={{ marginLeft: '30px', color: 'gray' }}>Articles on web performance, responsive web design and more</h3>
            </div>
            <div className="col-5 pb-5">
              <img src={img} alt="" className="img-fluid" />
            </div>
          </div>
          {/* Map Function on the data */}
          {Data.map((list) => {
            return (
              <div className="Blog-Data">
                <div className="container">
                  <div className="row">
                    <div className=" col-lg-12">
                      <div className="card my-3">
                        <div className="card-body">
                          <div className="card-title p-2 "><h3><b>{list.title}</b></h3>
                            <div className="card-text text-black"><p>{list.body}</p>
                              <span className="Read-More">
                                <Link
                                  to={`/ReadMore/${list.id}`}>Read more</Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
};
export default Banner;
