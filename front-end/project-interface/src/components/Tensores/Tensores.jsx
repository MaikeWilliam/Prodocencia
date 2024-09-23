import api from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Metrica from "../Metric/Metrica";
import "./Tensores.css";

// URL do backend com o IP e a porta corretos
// const backendUrl = import.meta.env.VITE_API_ENDPOINT ?? "http://localhost:8121";
const backendUrl = window.location.hostname === "localhost"
  ? "http://localhost:8121" // URL para desenvolvimento local
  : "https://cloudhub.iprj.uerj.br/projeto2-1"; // URL para produção


export default function Tensores() {
    const [metricas, setMetricas] = useState([]);
    const [tensorDaMetricaChecked, setTensorDaMetricaChecked] = useState(false);
    const [ricciChecked, setRicciChecked] = useState(false);
    const [riemannChecked, setRiemannChecked] = useState(false);
    const [ricciScalarChecked, setRicciScalarChecked] = useState(false);
    const [exibirCards, setExibirCards] = useState(false);
    const [tensorDaMetrica, setTensorDaMetrica] = useState(null);
    const [riemann, setRiemann] = useState(null);
    const [ricci, setRicci] = useState(null);
    const [ricciScalar, setRicciScalar] = useState(null);
    const [metricaSelecionada, setMetricaSelecionada] =
        useState("Schwarzschild");

    useEffect(() => {
        getMetricas();
    }, []);

    const getMetricas = () => {
        api.get(`${backendUrl}/metricas`)
            .then((response) => {
                console.log(response.data);
                setMetricas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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

        api.post(`${backendUrl}/tensores`, dataTensorDaMetrica)
            .then((response) => {
                setTensorDaMetrica(response.data.result);
                setExibirCards(true);
                handleRiemann();
                handleRicci();
                handleRicciScalar();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleRiemann = () => {
        if (riemannChecked) {
            const dataRiemann = {
                metrica: metricaSelecionada,
                tipo: "riemann",
            };

            api.post(`${backendUrl}/tensores`, dataRiemann)
                .then((response) => {
                    setRiemann(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleRicci = () => {
        if (ricciChecked) {
            const dataRicci = {
                metrica: metricaSelecionada,
                tipo: "ricci",
            };

            api.post(`${backendUrl}/tensores`, dataRicci)
                .then((response) => {
                    setRicci(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleRicciScalar = () => {
        if (ricciScalarChecked) {
            const dataRicciScalar = {
                metrica: metricaSelecionada,
                tipo: "ricciScalar",
            };

            api.post(`${backendUrl}/tensores`, dataRicciScalar)
                .then((response) => {
                    setRicciScalar(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleResetar = () => {
        setExibirCards(false);
        setTensorDaMetricaChecked(false);
        setRiemannChecked(false);
        setRicciChecked(false);
        setRicciScalarChecked(false);
        setMetricaSelecionada(metricas[0]?.value || "Schwarzschild");
    };

    return (
        <>
            <Metrica
                onChange={handleMetricaChange}
                options={metricas}
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
