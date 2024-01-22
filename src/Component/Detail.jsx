
import React from 'react';
import { useLocation } from 'react-router-dom';

const Detail = () => {
    const { state } = useLocation();
// console.log(useLocation(),'-----Location');
// console.log(state,'------state');
    return (
        <div className="Blog-Page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card my-3">
                            <div className="card-body">
                                <h2 className="card-title g-clr">{state.key.title}</h2>
                                <p className="card-text">{state.key.body}</p>
                                <p className="card-text">{state.key.id}</p>
                                <p>
                                    Second Array : {state.key2}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;