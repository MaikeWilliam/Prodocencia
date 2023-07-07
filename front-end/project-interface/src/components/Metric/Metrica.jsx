import React from "react";
import "./Metrica.css";

export default function Metrica(props) {
    return (
        <div className="MetricField">
            <h2>Métrica:</h2>
            <select value={props.value} onChange={props.onChange}>
                {props.options.map((eachOption, index) => (
                    <option key={index} value={eachOption.value}>
                        {eachOption.value}
                    </option>
                ))}
            </select>
        </div>
    );
}
