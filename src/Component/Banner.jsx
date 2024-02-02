import React from "react";
import img from "../Images/image_2024_01_16T07_44_25_972Z.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Banner = () => {
  const [data, setData] = useState([]);

  // API calling Handling data
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response)
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //DELETE Post ========================
  const handleDelete = (id) => {
    const update = data.filter(data => data.id !== id)
    setData(update)
    console.log(update)
  }

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

          {/* Map Function on the API data */}
          {data.map((list) => {
            return (
              <div className="Blog-Data " key={list.id} >
                <div className="container-fluid">
                  <div className="row">
                    <div className=" col-lg-12">
                      <div className="card my-3 shadow-sm">
                        <div className="card-body">
                          <div className="card-title p-2 "><h3><span className="g-clr">Title :</span> {list.title}</h3>
                            <div className="card-text text-black"><p>{list.body}
                              <span className="Read-More">
                                <Link to={`/post/${list.id}`}>Read more...</Link>
                              </span></p>
                              <hr />
                              {/* <!-- DELETE Button trigger modal --> */}
                              <span className="footer-btn">
                                <span className="delete-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  Delete Post
                                </span>
                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure ?</h1>
                                      </div>
                                      <div className="modal-footer align-content-between">
                                        <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                          onClick={() => handleDelete(list.id)}>YES</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">NO</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <span className="add-Post">
                                  <Link to={`/Add`} >Add New Post</Link>
                                </span>
                                <span className="edit-post">
                                <Link to={`/Edit/${list.id}`} >Edit Post</Link>
                                </span>
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
