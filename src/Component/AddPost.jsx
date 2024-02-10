import React from "react";
import { useState } from "react";
import axios from "axios";
import BackButton from "./Backbutton";

const AddPost = () => {
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [textArea, setTextArea] = useState();
    // Validtation states
    const [idError, setIdError] = useState("")
    const [usernameError, setUsernameError] = useState("");
    const [textareaError, setTextareaError] = useState("");

    // Form validations
    const handle = (e) => {
        e.preventDefault();

        const postObj = {
            id: userId,
            title: username,
            body: textArea,
        };

        if (!/^[0-9]*$/.test(userId) || userId < 0) {
            setIdError("Only positive numbers allowed");
            return;
        }

        if (username.length < 5) {
            setUsernameError("Name Length Must be 5 characters long");
            return;
        }

        if (textArea === '') {
            setTextareaError("Detail field canot be empty");
            return;
        }

        // API CALLING
        axios.post(`https://jsonplaceholder.typicode.com/posts`, postObj)
            .then((response) => {
                console.log(response, "response -----------")
                if (response.ok) {
                    return response.json();
                }
            })
            .then(() => {
                // Reset state after successful submission
                setUserId('');
                setUsername('');
                setTextArea('');
                alert("Successfully Added");
            })
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
                                // Prevent typing 'e'
                                if (e.key === 'e' || e.key === 'E') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <p className="text-validation">{idError}</p>
                        <br />
                        <input type="text" class="form-control" placeholder="Username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p className="text-validation">{usernameError}</p>
                        <br />
                        {/* <textarea type="text" class="form-control" placeholder="Enter Post Detail" rows="3"
                            value={textarea} on onChange={(e) => setTextarea(e.target.value)} />
                        <p className="text-validation">{textareaError}</p> */}
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
                                    e.preventDefault(); // Prevent typing if the maximum length is reached
                                }
                                setTextareaError(`Enter max 500 characters (${remainingChars < 0 ? 0 : remainingChars} characters remaining)`);
                            }}
                        />
                        <p className="text-validation text-danger ">{textareaError}</p>
                        <br />
                    </div>
                    
                    <button type="submit" class="btn btn-success" >Save</button>
                </form>
            </div>
            <BackButton />
        </>
    );
};
export default AddPost;
