from flask import Flask, jsonify, request
from flask_cors import CORS

# Numpy
import numpy as np

#Einsteinpy
import sympy
from sympy import symbols, sin, Symbol, Function, var
from einsteinpy.symbolic import (MetricTensor,
                                 RicciTensor, RicciScalar,
                                 RiemannCurvatureTensor)

from einsteinpy.symbolic.predefined import (AlcubierreWarp, AntiDeSitter,
                                            AntiDeSitterStatic,
                                            BarriolaVilekin, BertottiKasner,
                                            BesselGravitationalWave, CMetric,
                                            Davidson, DeSitter, Ernst, Godel,
                                            JanisNewmanWinicour, Kerr,
                                            KerrNewman, Minkowski,
                                            MinkowskiCartesian, MinkowskiPolar,
                                            ReissnerNordstorm, Schwarzschild)

# Criando aplicação
app = Flask(__name__)
CORS(app)

# Rota Default
@app.route('/', methods=['GET'])
def index():
    return jsonify({ "message": "Hello world" })

# Rota Tensores
@app.route('/tensores', methods=['POST']) 
def calcular_tensores():

    metrica = request.json['metrica']
    tipo = request.json['tipo']
    
    tensor = Tensor(metric=metrica)
    
    if tipo == 'tensor':
        result = tensor.get_tensor()
    elif tipo == 'riemann':
        result = tensor.get_riemann_tensor()
    elif tipo == 'ricci':
        result = tensor.get_ricci_tensor()
    elif tipo == 'ricciScalar':
        result = tensor.get_ricci_scalar()
    else:
        return jsonify(error='Tipo de tensor inválido')
    
    return jsonify(result=result)

class Tensor():
    def __init__(self, metric='Schwarzschild'):
        self.__metric = self.__get_metric(metric)

    def __get_metric(self, metric_name):  # noqa: C901
        """Retorna uma metrica prédefinida usando o nome informado."""
        if metric_name == 'AlcubierreWarp':
            return AlcubierreWarp()
        elif metric_name == 'AntiDeSitter':
            return AntiDeSitter()
        elif metric_name == 'AntiDeSitterStatic':
            return AntiDeSitterStatic()
        elif metric_name == 'BarriolaVilekin':
            return BarriolaVilekin()
        elif metric_name == 'BertottiKasner':
            return BertottiKasner()
        elif metric_name == 'BesselGravitationalWave':
            return BesselGravitationalWave()
        elif metric_name == 'CMetric':
            return CMetric()
        elif metric_name == 'Davidson':
            return Davidson()
        elif metric_name == 'DeSitter':
            return DeSitter()
        elif metric_name == 'Ernst':
            return Ernst()
        elif metric_name == 'Godel':
            return Godel()
        elif metric_name == 'JanisNewmanWinicour':
            return JanisNewmanWinicour()
        elif metric_name == 'Kerr':
            return Kerr()
        elif metric_name == 'KerrNewman':
            return KerrNewman()
        elif metric_name == 'Minkowski':
            return Minkowski()
        elif metric_name == 'MinkowskiCartesian':
            return MinkowskiCartesian()
        elif metric_name == 'MinkowskiPolar':
            return MinkowskiPolar()
        elif metric_name == 'ReissnerNordstorm':
            return ReissnerNordstorm()
        elif metric_name == 'Schwarzschild':
            return Schwarzschild()
        else:
            raise ValueError('Metrica não implementada.')
            
    def get_tensor(self):
        """Retorna o tensor da metrica.

        Resposta para Schwarzschild:
            [[1 - r_s/r, 0, 0, 0], [0, -1/(c**2*(1 - r_s/r)), 0, 0], [0, 0, -r**2/c**2, 0], [0, 0, 0, -r**2*sin(theta)**2/c**2]]
        """
        return str(self.__metric.tensor())

    def get_ricci_scalar(self):
        """Retorna o escalar de Ricci.

        Resposta para Schwarzschild:
            0
        """
        return str(RicciScalar.from_metric(self.__metric).expr)

    def get_ricci_tensor(self):
        """Retorna o tensor de Ricci.

        Resposta para Schwarzschild:
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        """
        return str(RicciTensor.from_metric(self.__metric).tensor())

    def get_riemann_tensor(self):
        """Retorna o tensor de Riemann.

        Resposta para Schwarzschild:
            [[[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, r_s/(r**2*(r - r_s)), 0, 0], [-r_s/(r**2*(r - r_s)), 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, -r_s/(2*r), 0], [0, 0, 0, 0], [r_s/(2*r), 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, -r_s*sin(theta)**2/(2*r)], [0, 0, 0, 0], [0, 0, 0, 0], [r_s*sin(theta)**2/(2*r), 0, 0, 0]]], [[[0, r_s*c**2*(r - r_s)/r**4, 0, 0], [r_s*c**2*(-r + r_s)/r**4, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, -r_s/(2*r), 0], [0, r_s/(2*r), 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, -r_s*sin(theta)**2/(2*r)], [0, 0, 0, 0], [0, r_s*sin(theta)**2/(2*r), 0, 0]]], [[[0, 0, r_s*c**2*(-r + r_s)/(2*r**4), 0], [0, 0, 0, 0], [r_s*c**2*(r - r_s)/(2*r**4), 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, r_s/(2*r**2*(r - r_s)), 0], [0, -r_s/(2*r**2*(r - r_s)), 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, r_s*sin(theta)**2/r], [0, 0, -r_s*sin(theta)**2/r, 0]]], [[[0, 0, 0, r_s*c**2*(-r + r_s)/(2*r**4)], [0, 0, 0, 0], [0, 0, 0, 0], [r_s*c**2*(r - r_s)/(2*r**4), 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, r_s/(2*r**2*(r - r_s))], [0, 0, 0, 0], [0, -r_s/(2*r**2*(r - r_s)), 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, -r_s/r], [0, 0, r_s/r, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]]
        """
        return str(RiemannCurvatureTensor.from_metric(self.__metric).tensor())

if __name__ == "__main__":
    app.run()
