import React, { useState } from "react";

import "./Tensores.css";

import Metrica from "../Metric/Metrica";
import Card from "../Card/Card";

import api from "axios";

export default function Tensores() {
    const metrics = [
        { value: "Schwarzschild" },
        { value: "Kerr" },
        { value: "KerrNewman" },
    ];

    const [ricciChecked, setRicciChecked] = useState(false);
    const [riemannChecked, setRiemannChecked] = useState(false);
    const [ricciScalarChecked, setRicciScalarChecked] = useState(false);
    const [exibirCards, setExibirCards] = useState(false);
    const [ricci, setRicci] = useState(null); //Estado para armazenar a solução
    const [riemann, setRiemann] = useState(null); //Estado para armazenar a solução
    const [ricciScalar, setRicciScalar] = useState(null); //Estado para armazenar a solução
    const [metricaSelecionada, setMetricaSelecionada] = useState(
        metrics[0].value
    );

    const handleMetricaChange = (event) => {
        setMetricaSelecionada(event.target.value);
    };

    const handleRicciChange = (event) => {
        setRicciChecked(event.target.checked);
    };

    const handleRiemannChange = (event) => {
        setRiemannChecked(event.target.checked);
    };

    const handleRicciScalarChange = (event) => {
        setRicciScalarChecked(event.target.checked);
    };

    const handleCalcular = () => {
        const dataRiemann = {
            metrica: metricaSelecionada,
            tipo: "riemann",
        };

        api.post("http://127.0.0.1:5000/tensores", dataRiemann)
            .then((response) => {
                setRiemann(response.data.result); // Armazene a solução do tensor de Riemann no estado

                if (ricciChecked) {
                    const dataRicci = {
                        metrica: metricaSelecionada,
                        tipo: "ricci",
                    };

                    api.post("http://127.0.0.1:5000/tensores", dataRicci)
                        .then((response) => {
                            setRicci(response.data.result); // Armazene a solução do tensor de Ricci no estado

                            if (ricciScalarChecked) {
                                const dataRicciScalar = {
                                    metrica: metricaSelecionada,
                                    tipo: "ricciScalar",
                                };

                                api.post(
                                    "http://127.0.0.1:5000/tensores",
                                    dataRicciScalar
                                )
                                    .then((response) => {
                                        setRicciScalar(response.data.result); // Armazene a solução do Escalar de Ricci no estado
                                        setExibirCards(true);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            } else {
                                setExibirCards(true);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else if (ricciScalarChecked) {
                    const dataRicciScalar = {
                        metrica: metricaSelecionada,
                        tipo: "ricciScalar",
                    };

                    api.post("http://127.0.0.1:5000/tensores", dataRicciScalar)
                        .then((response) => {
                            setRicciScalar(response.data.result); // Armazene a solução do Escalar de Ricci no estado
                            setExibirCards(true);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    setExibirCards(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleResetar = () => {
        setExibirCards(false);
        setRicciChecked(false);
        setRiemannChecked(false);
        setRicciScalarChecked(false);
        setMetricaSelecionada(metrics[0].value);
    };

    return (
        <>
            <Metrica
                onChange={handleMetricaChange}
                options={metrics}
                value={metricaSelecionada}
            />
            <div className="Tensores">
                <fieldset>
                    <legend>Escolha o que deseja calcular</legend>
                    <div className="Tensores-checkbox">
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
                                    checked={ricciScalarChecked}
                                    onChange={handleRicciScalarChange}
                                />
                                Escalar de Ricci
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
                        {riemannChecked && riemann && (
                            <Card title="Tensor de Riemann" result={riemann} />
                        )}
                        {ricciChecked && ricci && (
                            <Card title="Tensor de Ricci" result={ricci} />
                        )}
                        {ricciScalarChecked && ricciScalar && (
                            <Card
                                title="Escalar de Ricci"
                                result={ricciScalar}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
