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

    const [tensorDaMetricaChecked, setTensorDaMetricaChecked] = useState(false);
    const [ricciChecked, setRicciChecked] = useState(false);
    const [riemannChecked, setRiemannChecked] = useState(false);
    const [ricciScalarChecked, setRicciScalarChecked] = useState(false);
    const [exibirCards, setExibirCards] = useState(false);
    const [tensorDaMetrica, setTensorDaMetrica] = useState(null);
    const [riemann, setRiemann] = useState(null); //Estado para armazenar a solução
    const [ricci, setRicci] = useState(null); //Estado para armazenar a solução
    const [ricciScalar, setRicciScalar] = useState(null); //Estado para armazenar a solução
    const [metricaSelecionada, setMetricaSelecionada] = useState(
        metrics[0].value
    );

    const handleMetricaChange = (event) => {
        setMetricaSelecionada(event.target.value);
    };

    const handleTensorDaMetricaChange = (event) => {
        setTensorDaMetricaChecked(event.target.checked);
    };

    const handleRiemannChange = (event) => {
        setRiemannChecked(event.target.checked);
    };

    const handleRicciChange = (event) => {
        setRicciChecked(event.target.checked);
    };

    const handleRicciScalarChange = (event) => {
        setRicciScalarChecked(event.target.checked);
    };

    const handleCalcular = () => {
        const dataTensorDaMetrica = {
            metrica: metricaSelecionada,
            tipo: "tensor",
        };

        api.post("http://127.0.0.1:5000/tensores", dataTensorDaMetrica)
            .then((response) => {
                setTensorDaMetrica(response.data.result);

                if (riemannChecked) {
                    const dataRiemann = {
                        metrica: metricaSelecionada,
                        tipo: "riemann",
                    };

                    api.post("http://127.0.0.1:5000/tensores", dataRiemann)
                        .then((response) => {
                            setRiemann(response.data.result);
                            setExibirCards(true);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    setExibirCards(true);
                }

                if (ricciChecked) {
                    const dataRicci = {
                        metrica: metricaSelecionada,
                        tipo: "ricci",
                    };

                    api.post("http://127.0.0.1:5000/tensores", dataRicci)
                        .then((response) => {
                            setRicci(response.data.result);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }

                if (ricciScalarChecked) {
                    const dataRicciScalar = {
                        metrica: metricaSelecionada,
                        tipo: "ricciScalar",
                    };

                    api.post("http://127.0.0.1:5000/tensores", dataRicciScalar)
                        .then((response) => {
                            setRicciScalar(response.data.result);
                        })
                        .catch((error) => {
                            onsole.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleResetar = () => {
        setExibirCards(false);
        setTensorDaMetricaChecked(false);
        setRiemannChecked(false);
        setRicciChecked(false);
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
                                    checked={tensorDaMetricaChecked}
                                    onChange={handleTensorDaMetricaChange}
                                />
                                Tensor da Métrica
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
                        {tensorDaMetricaChecked && tensorDaMetrica && (
                            <Card
                                title="Tensor da Métrica"
                                result={tensorDaMetrica}
                            />
                        )}
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
