import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="p-8">
            <p>Not Found! The page you are looking for doesn't exist.</p>
            <Link to="/">Go To Homepage</Link>
        </div>
    );
}

export default NotFound;
