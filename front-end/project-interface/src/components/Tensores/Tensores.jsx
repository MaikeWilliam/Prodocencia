import React, { useState } from "react";

import "./Tensores.css";
import Card from "../Card/Card";

export default function Tensores() {
    const [ricciChecked, setRicciChecked] = useState(false);
    const [riemannChecked, setRiemannChecked] = useState(false);
    const [exibirCards, setExibirCards] = useState(false);

    const handleRicciChange = (event) => {
        setRicciChecked(event.target.checked);
    };

    const handleRiemannChange = (event) => {
        setRiemannChecked(event.target.checked);
    };

    const handleCalcular = () => {
        setExibirCards(true);
    };

    const handleResetar = () => {
        setExibirCards(false);
        setRicciChecked(false);
        setRiemannChecked(false);
    };

    return (
        <div className="Tensores">
            <fieldset>
                <legend>Escolha o que deseja calcular</legend>
                <div className="Tensores-checkbox">
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={ricciChecked}
                                onChange={handleRicciChange}
                            />
                            Tensor de Ricci
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={riemannChecked}
                                onChange={handleRiemannChange}
                            />
                            Tensor de Riemann
                        </label>
                    </div>
                </div>
            </fieldset>
            <div className="Botoes">
                <button onClick={handleCalcular}>Calcular</button>
                <button onClick={handleResetar}>Resetar</button>
            </div>
            {exibirCards && (
                <div className="Cards">
                    {ricciChecked && <Card title="Tensor de Ricci" />}
                    {riemannChecked && <Card title="Tensor de Riemann" />}
                </div>
            )}
        </div>
    );
}
