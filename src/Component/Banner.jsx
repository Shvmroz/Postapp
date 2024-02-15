
import React, { useState, useEffect } from "react";
import img from "../Images/image_2024_01_16T07_44_25_972Z.png";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";


const Banner = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${perPage}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [page, perPage]);

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedData = data.filter(post => post.id !== id);
          setData(updatedData);
          console.log('Post deleted successfully:', id);
        } else {
          console.error('Error deleting post:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Set timeout for 2 seconds
      });
  };

  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);
    setPage(1); // Reset page to 1 when changing posts per page
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
  };

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

          <div className="add-Post text-center">
            <Link to={`/Add`} ><i className="fa-solid fa-plus"></i> Add New Post</Link>
            <span>
              <Select size="small" value={perPage} onChange={handlePerPageChange}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={100}>All</MenuItem>
              </Select>
            </span>
          </div>


          {data.map((list) => {
            return (
              <div className="Blog-Data" key={list.id} >
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card my-3 shadow-sm">
                        <div className="card-body">
                          <div className="card-title p-2">
                            <span style={{color:'gray'}}>{list.id}</span>
                            <h3> {list.title}</h3>
                            <div className="card-text text-black">
                              <p>{list.body}
                                <span className="Read-More">
                                  <Link to={`/post/${list.id}`}>Read more...</Link>
                                </span></p>
                              <hr />
                              {/* <!-- DELETE Button trigger modal --> */}
                              <span className="footer-btn">
                                <span className="delete-button" onClick={() => setSelected(list.id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <i className="fa-solid fa-trash-can"></i> Delete
                                </span>

                                <span className="edit-post">
                                  <Link to={`/Edit/${list.id}`} ><i className="fas fa-edit"></i> Edit</Link>
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



          <div className="justify-content-between text-center p-3 ">

            <span style={{ marginRight: '10px' }}>
              <Button variant="outlined" color="success" onClick={handlePreviousPage}>Previous Page</Button>
            </span>
            <Button variant="outlined" color="success" onClick={handleNextPage}>Next Page</Button>
          </div>


          {/* <!-- Modal --> */}
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure ?</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-footer align-content-between">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(selected)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
                          <span className="visually-hidden">...</span>
                        </span>
                        Deleting...
                      </>
                    ) : (
                      'YES'
                    )}
                  </button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;


// import React, { useState, useEffect } from "react";
// import img from "../Images/image_2024_01_16T07_44_25_972Z.png";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Banner = () => {
//   const [data, setData] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     axios.get("https://jsonplaceholder.typicode.com/posts")
//       .then((response) => {
//         console.log(response);
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     setLoading(true);
//     axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           const updatedData = data.filter(post => post.id !== id);
//           setData(updatedData);
//           console.log('Post deleted successfully:', id);
//         } else {
//           console.error('Error deleting post:', response.statusText);
//         }
//       })
//       .catch((error) => {
//         console.error('Error deleting post:', error);
//       })
//       .finally(() => {
//         setTimeout(() => {
//           setLoading(false);
//         }, 2000); // Set timeout for 2 seconds
//       });
//   };

//   return (
//     <>
//       <div className="banner-wrapper">
//         <div className="container">
//           <div className="row">
//             <div className="col-7">
//               <h1 style={{ marginLeft: '30px', marginBottom: '24px' }}><b>Articles for</b>
//                 <br />
//                 <span className="g-clr"><b>front-end devs</b></span>
//               </h1>
//               <h3 style={{ marginLeft: '30px', color: 'gray' }}>Articles on web performance, responsive web design and more</h3>
//             </div>
//             <div className="col-5 pb-5">
//               <img src={img} alt="" className="img-fluid" />
//             </div>
//           </div>
//           <div className="add-Post text-center">
//             <Link to={`/Add`} ><i className="fa-solid fa-plus"></i> Add New Post</Link>
//           </div>
//           {data.map((list) => {
//             return (
//               <div className="Blog-Data " key={list.id} >
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className=" col-lg-12">
//                       <div className="card my-3 shadow-sm">
//                         <div className="card-body">
//                           <div className="card-title p-2">
//                             {list.id}
//                             <h3>  {list.title}</h3>
//                             <div className="card-text text-black"><p>{list.body}
//                               <span className="Read-More">
//                                 <Link to={`/post/${list.id}`}>Read more...</Link>
//                               </span></p>
//                               <hr />
//                               {/* <!-- DELETE Button trigger modal --> */}
//                               <span className="footer-btn">
//                                 <span className="delete-button" onClick={() => setSelected(list.id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//                                   <i className="fa-solid fa-trash-can"></i> Delete
//                                 </span>

//                                 <span className="edit-post">
//                                   <Link to={`/Edit/${list.id}`} ><i className="fas fa-edit"></i> Edit</Link>
//                                 </span>
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//           {/* <!-- Modal --> */}
//           <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure ?</h1>
//                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div className="modal-footer align-content-between">
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(selected)}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
//                           <span className="visually-hidden">...</span>
//                         </span>
//                         Deleting...
//                       </>
//                     ) : (
//                       'YES'
//                     )}
//                   </button>
//                   <button type="button" className="btn btn-secondary " data-bs-dismiss="modal">NO</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };
// export default Banner;
