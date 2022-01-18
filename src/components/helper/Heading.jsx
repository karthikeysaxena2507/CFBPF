import React from "react";

const Heading = (props) => {
    return (
        <div className = "heading"> {props.text} {props.value}</div>
    )
}

export default Heading;