import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './Backbutton';

const Edit = () => {
    const [data, setData] = useState([]);
    const [theTitle, setTheTitle] = useState('');
    const [body, setBody] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [bodyError, setBodyError] = useState('');

    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setData(response.data);
                setTheTitle(response.data.title);
                setBody(response.data.body);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleSaveChanges = () => {
        setLoading(true); // Start loading

        if (theTitle.length < 5) {
            setTitleError("Title must be at least 5 characters long");
            setLoading(false); // Stop loading
            return;
        }

        if (body === '') {
            setBodyError("Text field cannot be empty");
            setLoading(false); // Stop loading
            return;
        }

        const updatedData = {
            title: theTitle,
            body: body
        };

        axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData)
            .then((response) => {
                console.log('Post updated successfully:', response.data);
                setSuccessMessage("Changes saved successfully");
                setTimeout(() => {
                    setSuccessMessage('');
                    handleCloseModal(); // close modal automatticly
                }, 3000); // Show success message for 3 seconds and close modal
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error updating post:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading regardless of success or failure
            });
    };

    const handleCloseModal = () => {
        const modal = document.getElementById("exampleModal");
        modal.classList.remove("show");
        modal.style.display = "none";
        const backdrop = document.getElementsByClassName("modal-backdrop")[0];
        backdrop.parentNode.removeChild(backdrop);
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
                                    <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className="fas fa-edit"></i> Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
                        </div>
                        <div className="modal-body">
                            <h6 className="card-text">Update Title</h6>
                            <input
                                type="text"
                                placeholder='Enter New Title'
                                style={{ width: '100%', marginBottom: '30px', borderRadius: '8px', padding: '5px' }}
                                value={theTitle}
                                onChange={(e) => {
                                    setTheTitle(e.target.value);
                                    if (e.target.value.length < 5) {
                                        setTitleError('The update title field must be 5 char long');
                                    } else {
                                        setTitleError('');
                                    }
                                }}
                            />
                            <p className="text-validation">{titleError}</p>

                            <h6 className="card-text">Update Detail</h6>
                            <textarea
                                type='text'
                                placeholder='Update text'
                                style={{ width: '100%', borderRadius: '8px', padding: '5px' }}
                                required
                                rows="4"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                onKeyPress={(e) => {
                                    const remainingChars = 499 - e.target.value.length;
                                    if (remainingChars <= 0) {
                                        e.preventDefault(); // Prevent typing if the maximum length is reached
                                    }
                                    setBodyError(`Enter max 500 characters (${remainingChars < 0 ? 0 : remainingChars} characters remaining)`);
                                }}

                            />
                            <p className="text-validation text-danger">{bodyError}</p>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-success' onClick={handleSaveChanges} disabled={loading}>
                                {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            {successMessage && 
                            <span className='text-success'>{successMessage}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <BackButton />
        </>
    );
};

export default Edit;
