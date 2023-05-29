from flask import Flask, jsonify, request
from flask_cors import CORS

from math import pow

# Numpy
import numpy as np

# Einstein Py
from sympy import symbols, diag
from einsteinpy.symbolic import MetricTensor, RiemannCurvatureTensor


app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return jsonify({ "message": "Hello world" })


@app.route('/tensores', methods=['POST'])
def get_tensores():

    data = request.json
    rieman = data.get('rieman')
    ricci = data.get('ricci')


    if (rieman):
        t, x, y, z = symbols('t x y z')
        M = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
        metric = MetricTensor(M, (t, x, y, z))
        R = RiemannCurvatureTensor.from_metric(metric)
        rieman = np.array(R.tensor().tolist(), dtype=float).tolist()
    else:
        rieman = None

    if (ricci):
        ricci = [4,5,21,312,421,12,412,4]
    else:
        ricci = None

    return jsonify({ "rieman": rieman, "ricci": ricci })

app.run() 