import React from "react";
import { useState } from "react";
import axios from "axios";
import BackButton from "./Backbutton";

const AddPost = () => {
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [textarea, setTextarea] = useState();
    // Validtation states
    const [usernameError, setUsernameError] = useState("");
    const [textareaError, setTextareaError] = useState("");

    const [idError, setIdError] = useState()


    // Form validations
    const handle = (e) => {
        e.preventDefault();

        const postObj = {
            id: userId,
            title: username,
            body: textarea,
        };

        if (username.length < 5) {
            setUsernameError("Name Length Must be 5 characters long");
            return;
        }

        if (textarea.length < 10) {
            setTextareaError("Enter minimum 10 characters in the detail field");
            return;
        }

        // Validate if the value contains only numeric characters
        if (!/^\d*$/.test(userId)) {
            setIdError("Only numbers allowed");
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
                setTextarea('');
                alert("Successfully Added");
            })
    };
    return (
        <>
            <div className="container-fluid w-50 mt-3 shadow p-4">
                <form onSubmit={handle}>
                    <h2 className="g-clr">Add New Post</h2>
                    <div className="form-inputFields">
                        <input type="number" class="form-control" placeholder="User Id"
                            value={userId} onChange={(e) => setUserId(e.target.value)} />
                        <p className="text-validation">{idError}</p>
                        <br />
                        <input type="text" class="form-control" placeholder="Username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p className="text-validation">{usernameError}</p>
                        <br />
                        <textarea type="text" class="form-control" placeholder="Enter Post Detail" rows="3"
                            value={textarea} on onChange={(e) => setTextarea(e.target.value)} />
                        <p className="text-validation">{textareaError}</p>
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
