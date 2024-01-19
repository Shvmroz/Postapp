
import React from 'react';
import { useLocation } from 'react-router-dom';

const Detail = () => {
    const { state } = useLocation()

    return (
        <div className="Blog-Page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card my-3">
                            <div className="card-body">
                                <h2 className="card-title g-clr">{state.title}</h2>
                                <p className="card-text">{state.body}</p>
                                <p className="card-text">{state.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;