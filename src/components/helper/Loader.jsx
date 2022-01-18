import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
    <div className = "text-center">
        <Spinner animation = "border" className = "mt-5" variant = "dark" />
    </div>);
}

export default Loader;