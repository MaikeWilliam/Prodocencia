import React from "react";
import "./Metrica.css";

export default function Metrica() {
    return (
        <div className="MetricField">
            <h2>Metric Tensor:</h2>
            <select>
                <option value="schwarzschild">Schwarzschild</option>
                <option value="kerr">Kerr</option>
                <option value="kerr-newman">Kerr-Newman</option>
            </select>
        </div>
    );
}
