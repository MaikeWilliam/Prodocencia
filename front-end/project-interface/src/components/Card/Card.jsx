import React from "react";
import "./Card.css";

export default function Card(props) {
    return (
        <div className="CardField" style={{ maxHeight: "100%" }}>
            <div className="Title">{props.title}</div>
            <div className="Content">{props.result}</div>
        </div>
    );
}
