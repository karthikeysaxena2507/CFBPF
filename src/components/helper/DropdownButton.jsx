import React from "react";
import { Dropdown } from "react-bootstrap";

const DropdownButton = (props) => {

    return (
        <div>
            <Dropdown.Toggle 
                className = "btn dropdown-toggle heading"  
                variant = "light" 
                id = "dropdown-basic"
            > {props.text}
            </Dropdown.Toggle>
        </div>
    )

}

export default DropdownButton;