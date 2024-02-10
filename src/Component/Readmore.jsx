
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './Backbutton';

const DetailPage = () => {
    let { id } = useParams();
    const [data, setData] = useState([]);
    
    const [loading, setLoading] = useState(true); // State to manage loading
    useEffect(() => {
        // Set loading to true initially
        setLoading(true);

        // Fetch data after 4 seconds
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // Stop loading after 3 seconds
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        };
        fetchData();
    }, [id]);


    return (

        <>
            {loading ? ( // Show loader if loading state is true
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden text-bg-success">Loading...</span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
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
            )}

            <BackButton />
        </>

    );
};

export default DetailPage;