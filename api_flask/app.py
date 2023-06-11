from flask import Flask, jsonify, request
from flask_cors import CORS

from math import pow

# Numpy
import numpy as np

# Einstein Py
from sympy import symbols, diag
from einsteinpy.symbolic import MetricTensor, RiemannCurvatureTensor

# Criando aplicação
app = Flask(__name__)
CORS(app)

# Rota Default
@app.route('/', methods=['GET'])
def index():
    return jsonify({ "message": "Hello world" })

# Rota Tensores
@app.route('/tensores', methods=['GET'])
def get_tensores():

    data = request.json
    riemann = data.get('riemann')
    ricci = data.get('ricci')


    if (riemann):
        t, x, y, z = symbols('t x y z')
        M = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
        metric = MetricTensor(M, (t, x, y, z))
        R = RiemannCurvatureTensor.from_metric(metric)
        riemann = np.array(R.tensor().tolist(), dtype=float).tolist()
    else:
        riemann = None

    if (ricci):
        ricci = [4,5,21,312,421,12,412,4]
    else:
        ricci = None

    return jsonify({ "riemann": riemann, "ricci": ricci })

app.run() 