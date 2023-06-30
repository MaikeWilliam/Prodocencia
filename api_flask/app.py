from flask import Flask, jsonify, request
from flask_cors import CORS

#Einsteinpy
import sympy
from sympy import symbols, sin, Symbol, Function, var
from einsteinpy.symbolic import (MetricTensor,
                                 RicciTensor, RicciScalar,
                                 RiemannCurvatureTensor)

# Numpy
import numpy as np


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

    if metrica == "Schwarzschild":
        if tipo == "ricci":
            # Cálculo do tensor de Ricci para a métrica Schwarzschild
            result = calcular_tensor_de_ricci_schwarzschild()
        elif tipo == "riemann":
            # Cálculo do tensor de Riemann para a métrica Schwarzschild
            result = calcular_tensor_de_riemann_schwarzschild()
        else:
            return jsonify(error='Tipo de tensor inválido')
    elif metrica == "Kerr":
        if tipo == "ricci":
            # Cálculo do tensor de Ricci para a métrica Kerr
            result = calcular_tensor_de_ricci_kerr()
        elif tipo == "riemann":
            # Cálculo do tensor de Riemann para a métrica Kerr
            result = calcular_tensor_de_riemann_kerr()
        else:
            return jsonify(error='Tipo de tensor inválido')
    elif metrica == "Kerr-Newman":
        if tipo == "ricci":
            # Cálculo do tensor de Ricci para a métrica Kerr-Newman
            result = calcular_tensor_de_ricci_kerr_newman()
        elif tipo == "riemann":
            # Cálculo do tensor de Riemann para a métrica Kerr-Newman
            result = calcular_tensor_de_riemann_kerr_newman()
        else:
            return jsonify(error='Tipo de tensor inválido')
    else:
        return jsonify(error='Métrica inválida')
    
    return jsonify(result=result)

# Funções para calcular os tensores de Ricci e Riemann para cada métrica

def calcular_tensor_de_ricci_schwarzschild():
    # Define as variáveis da métrica
    syms = sympy.symbols("t r theta phi")
    t, r, th, ph = syms

    # Definição da constante k
    k = var('m')

    # Define o tensor da métrica
    m = sympy.diag(-(1-(2*k)/r), 1/(1-(2*k)/r),
               r**2,
               r**2*(sin(th))**2).tolist()
    
    metric = MetricTensor(m, syms)

    ricci = RicciTensor.from_metric(metric)

    return str(ricci.tensor())

def calcular_tensor_de_riemann_schwarzschild():
    # Define as variáveis da métrica
    syms = sympy.symbols("t r theta phi")
    t, r, th, ph = syms

    # Definição da constante k
    k = var('m')

    # Define o tensor da métrica
    m = sympy.diag(-(1-(2*k)/r), 1/(1-(2*k)/r),
               r**2,
               r**2*(sin(th))**2).tolist()
    
    metric = MetricTensor(m, syms)

    riemann = RiemannCurvatureTensor.from_metric(metric)
    
    return str(riemann.tensor())

app.run() 

def calcular_tensor_de_ricci_kerr():
    
    pass

def calcular_tensor_de_riemann_kerr():
    
    pass

def calcular_tensor_de_ricci_kerr_newman():
    
    pass

def calcular_tensor_de_riemann_kerr_newman():
    
    pass



# Calcula o Escalar de Ricci-
# flrw = RicciScalar.from_metric(metric)
# flrw.tensor()

# import sympy as sp

# r = sp.symbols('r')
# lambda_, v = sp.Function('lambda')(r), sp.Function('v')(r)
# ode1 = lambda_.diff(r)/r + v.diff(r)/r
# ode2 = lambda_ - v.diff(r)

# solutions = sp.dsolve((ode1, ode2))

# for solution in solutions:
#     print(solution.rhs)