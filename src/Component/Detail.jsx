
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
    const [data, setData] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <div className="Blog-Page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card my-3">
                            <div className="card-body">
                                <h3 className="card-title g-clr"><span className='text-black' >Title:</span> {data.title}</h3>
                                <p className="card-text">{data.body}</p>
                                <hr />
                                <p> Post : {data.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;