import React, { useState } from "react";
import axios from "axios";
import BackButton from "./Backbutton";

const AddPost = () => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [textArea, setTextArea] = useState('');
    const [idError, setIdError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [textareaError, setTextareaError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handle = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const postObj = {
            id: userId,
            title: username,
            body: textArea,
        };

        if (!/^[0-9]*$/.test(userId) || userId < 0) {
            setIdError("Only positive numbers allowed");
            setLoading(false); // Stop loading
            return;
        }

        if (username.length < 5) {
            setUsernameError("Name Length Must be 5 characters long");
            setLoading(false); // Stop loading
            return;
        }

        if (textArea === '') {
            setTextareaError("Detail field canot be empty");
            setLoading(false); // Stop loading
            return;
        }

        axios.post(`https://jsonplaceholder.typicode.com/posts`, postObj)
            .then((response) => {
                if (response.status === 201) {
                    setSuccessMessage("Successfully Added");
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000); // Show success message for 3 seconds
                    setUserId('');
                    setUsername('');
                    setTextArea('');
                } else {
                    // Handle other response statuses if needed
                    console.error('Error:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading regardless of success or failure
            });
    };

    return (
        <>
            <div className="container-fluid w-50 mt-3 shadow p-4">
                <form onSubmit={handle}>
                    <h2 className="g-clr">Add New Post</h2>
                    <div className="form-inputFields">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'e' || e.key === 'E') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <p className="text-validation">{idError}</p>
                        <br />
                        <input type="text" className="form-control" placeholder="Username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p className="text-validation">{usernameError}</p>
                        <br />
                       
                        <textarea
                            className="form-control"
                            type="text"
                            placeholder="Enter Post Detail"
                            rows="3"
                            value={textArea}
                            onChange={(e) => setTextArea(e.target.value)}
                            onKeyPress={(e) => {
                                const remainingChars = 499 - e.target.value.length;
                                if (remainingChars <= 0) {
                                    e.preventDefault();
                                }
                                setTextareaError(`Enter max 500 characters (${remainingChars < 0 ? 0 : remainingChars} characters remaining)`);
                            }}
                        />
                        <p className="text-validation text-danger ">{textareaError}</p>
                        <br />
                    </div>
                    
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        )}
                        {loading ? ' Saving...' : 'Save'}
                    </button>
                 
                    {successMessage && <span className="text-success mx-3  "  >{successMessage}</span>}
                </form>
            </div>
            <BackButton />
        </>
    );
};

export default AddPost;
