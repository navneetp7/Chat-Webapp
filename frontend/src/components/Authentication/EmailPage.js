import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../../App.css";

const EmailPage = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            history.push('/otp', { email });
        } else {
            alert('Please enter your email.');
        }
    };

    return (
        <div className="container2">
            <h1>Enter Your Email</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button type="submit" className="blue-button">Submit</button>
            </form>
        </div>
    );
};

export default EmailPage;


