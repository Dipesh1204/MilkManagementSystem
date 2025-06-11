
import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({ text, onClick, variant = "primary" }) => {
    return (
        <Button variant={variant} onClick={onClick}>
            {text}
        </Button>
    );
};

export default CustomButton;