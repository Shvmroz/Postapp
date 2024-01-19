import React from 'react'
import logo from '../Images/logo.png'
const Navbar = () => {
  return (
     <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href='/#'>
                      <img src={logo} alt="" style={{width: "30px"}} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href='/#'>work <i class="fa-solid fa-briefcase"></i></a> 
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='/#'>services <i class="fa-solid fa-mug-hot"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='/#'>about <i class="fa-solid fa-heart"></i></a>
                            </li>
                        </ul>
                        <form className="d-flex" >
                            <a style={{ textDecoration: 'none', paddingTop: '10px', marginRight: '20px' , color: 'black' }}
                                href='/#'> <b>blog</b> <i class="fa-solid fa-message"></i></a>
                            <button className="btn btn-planner" type="submit"><a style={{ textDecoration: 'none' , color:'white'}}
                                href='/#'> planner <i class="fa-solid fa-leaf" style={{color:'white'}}></i></a></button>
                        </form>
                    </div>
                </div>
            </nav>
           
        </>
  )
}

export default Navbar