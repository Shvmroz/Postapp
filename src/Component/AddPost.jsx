import React from "react";
import { useState } from "react";
import axios from "axios";

const AddPost = () => {
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [textarea, setTextarea] = useState();

    // Form validations
    const handle = (e) => {
        e.preventDefault();

        const postObj = {
            id: userId,
            title: username,
            body: textarea,
        };

        if (username.length < 5) {
            alert("Name should be longer than 4 characters");
            return;
        }

        if (textarea.length < 20) {
            alert("Enter more than 20 characters in the *Detail field*");
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
            <div className="container-fluid w-50 shadow p-5">
                <form onSubmit={handle}>
                    <h2 className="g-clr">Add New Post</h2>
                    <div className="form-inputFields">
                        <input type="number" class="form-control" placeholder="User Id" value={userId}
                            onChange={(e) => setUserId(e.target.value)} required />
                        <br />
                        <input type="text" class="form-control" placeholder="Username" value={username}
                            onChange={(e) => setUsername(e.target.value)} required />
                        <br />
                        <textarea type="text" class="form-control" placeholder="Enter Post Detail" rows="3"
                            on onChange={(e) => setTextarea(e.target.value)} value={textarea} required />
                        <br />
                    </div>
                    <button type="submit" class="btn btn-success" >Save</button>
                </form>
            </div>
        </>
    );
};
export default AddPost;
