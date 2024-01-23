
import React from 'react';
import { useParams } from 'react-router-dom';
import Data from './Data';
import { useState } from 'react';
const DetailPage = () => {
    let { id } = useParams();
    const [data, setData] = useState(Data); // Manage data in state
    // console.log(useLocation(),'-----Location');
    // console.log(state,'------state');
    const getID = Data.find(getID => String(getID.id) === id);

    const handleDelete = () => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };


return (
    <div key={id} className="Blog-Page">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card my-3">
                        <div className="card-body">
                            <h3 className="card-title g-clr">{getID.title}</h3>
                            <p className="card-text">{getID.body}</p>
                            <button className='delete-button' style={{ color: 'white' }}
                                onClick={handleDelete}> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default DetailPage;