import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './Backbutton';

const Edit = () => {
    const [data, setData] = useState([]);
    const [theTitle, setTheTitle] = useState('');
    const [body, setBody] = useState('');

    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setData(response.data);
                setTheTitle(response.data.title); // Set theTitle state with fetched title
                setBody(response.data.body); // Set body state with fetched body
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleSaveChanges = () => {
        const updatedData = {};

        if (theTitle !== '') {
            updatedData.title = theTitle;
        }

        if (body !== '') {
            updatedData.body = body;
        }

        axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData)
            .then((response) => {
                console.log('Post updated successfully:', response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error updating post:', error);
            });
    };

    return (

        <>
            <div className="Blog-Page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card my-3">
                                <div className="card-body">
                                    <h6> Post : {data.id}</h6>
                                    <hr />
                                    <h3 className="card-title g-clr"><span className='text-black' >Title:</span> {data.title}</h3>
                                    <p className="card-text">{data.body}</p>
                                    {/*  Button trigger Edit Post modal --> */}
                                    <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="fas fa-edit"></i> Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -- Edit Post Modal  */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* BODY */}
                        <div class="modal-body">
                            <h6 className="card-text">Update New Title</h6>
                            <input type="text" placeholder='Enter New Title'
                                style={{ width: '100%', marginBottom: '30px', borderRadius: '8px', padding: '5px' }}
                                value={theTitle} onChange={(e) => setTheTitle(e.target.value)} />

                            <h6 className="card-text">Update Detail</h6>
                            <textarea typeof='text' placeholder='Enter New text'
                                style={{ width: '100%', borderRadius: '8px', padding: '5px' }}
                                value={body} onChange={(e) => setBody(e.target.value)} />
                        </div>
                        <div class="modal-footer">
                            <button className='btn btn-success' data-bs-dismiss="modal" onClick={handleSaveChanges}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <BackButton/>
        </>
    );
};

export default Edit;


