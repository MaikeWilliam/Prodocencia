import React, { useState } from "react";
import "./Tensores.css";

import Card from "../Card/Card";

import api from "axios";

export default function Tensores() {
    const [ricciChecked, setRicciChecked] = useState(false);
    const [riemannChecked, setRiemannChecked] = useState(false);
    const [exibirCards, setExibirCards] = useState(false);

    const [ricci, setRicci] = useState(null); //Estado para armazenar a solução
    const [riemann, setRiemann] = useState(null); //Estado para armazenar a solução

    const handleRicciChange = (event) => {
        setRicciChecked(event.target.checked);
    };

    const handleRiemannChange = (event) => {
        setRiemannChecked(event.target.checked);
    };

    const handleCalcular = () => {
        if (ricciChecked) {
            const data = {
                ricci: "ricci",
            };

            api.post("http://127.0.0.1:5000/tensores", data)
                .then((response) => {
                    setRicci(response.data.ricci); // Armazene a solução do tensor de Ricci no estado
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        if (riemannChecked) {
            const data = {
                riemann: "riemann",
            };

            api.post("http://127.0.0.1:5000/tensores", data)
                .then((response) => {
                    setRiemann(response.data.riemann); // Armazene a solução do tensor de Riemann no estado
                })
                .catch((error) => {
                    console.error(error);
                });
        }

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
                    {ricciChecked && ricci && (
                        <Card title="Tensor de Ricci" result={ricci} />
                    )}
                    {riemannChecked && riemann && (
                        <Card title="Tensor de Riemann" result={riemann} />
                    )}
                </div>
            )}
        </div>
    );
}
