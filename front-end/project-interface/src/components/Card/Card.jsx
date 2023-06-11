import React from "react";
import "./Card.css";

export default function Card(props) {
    return (
        <div className="CardField">
            <div className="Title">{props.title}</div>
            <div className="Content">A</div>
        </div>
    );
}
