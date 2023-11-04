import pickle
import pandas as pd
from flask import Flask, request, jsonify
import json

data_path = "./data"
model_path = "./model"
model = pickle.load(open(model_path +'/automl.pkl', 'rb'))
col_names = pickle.load(open(model_path +'/model_columns.pkl', 'rb'))

app = Flask(__name__)

@app.route('/',methods=['GET'])
def testapi():
    return jsonify({'status': 200,'msg': 'Welcome on this beautiful API!'})

@app.route('/api/v1/estimate', methods=['POST'])
def predict():
    if request.is_json:
        req_data = request.json
        df = pd.DataFrame(req_data, index=[0]).reindex(columns=col_names)
        #df = pd.read_json(json.dumps(req_data))

        #data = request.get_json(force=True)
        #prediction = model.predict([np.array(list(data.values()))])

        prediction = list(model.predict(df))

        return jsonify({"prediction": str(prediction)},200)
    else:
        return jsonify({"error": "Content-Type is not 'application/json'"}, 400)

if __name__ == 'main':
    app.run(debug=True, port=5000)