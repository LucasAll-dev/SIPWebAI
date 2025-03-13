from flask import Flask, request ,jsonify
from joblib import load
import numpy as np


# Instancia Flask
app = Flask(__name__)

# Caregao modelo de automacao de tarefas (Random Forest)
model_tasks = load('./train/autotarefa/modelo_priorizacao.pkl')


# Rota principal
@app.route('/predict', methods=['POST'])
def predict():
    try:    
        # Recebe dados do request
        data = request.get_json(force=True)

        #Verificar se todas as cahves necessarias estao presentes
        required_Keys = ['prazo', 'importancia', 'complexidade', 'urgencia']
        if not all(Key in data for Key in required_Keys):
            return jsonify({'error': 'Campos obrigatorios ausentes'}), 400


        # Extrasiir as features do JSON
        prazo = data['prazo']
        importancia = data['importancia']
        complexidade = data['complexidade']
        urgencia = data['urgencia']

        # Cria um array numpy com as features
        tarefas = np.array([prazo, importancia, complexidade, urgencia]).reshape(1, -1)

        #Fazer a previsao
        prediction = model_tasks.predict(tarefas)

        #Retorna a previsao como resposta
        return jsonify({'prioridade': int(prediction[0])})
    
    except Exception as e:
        # log do erro para depuracao
        app.logger.error(f"Erro durante a previsao: {str(e)}")
        return jsonify({'error': 'Erro do Servior Interno'}), 500


# Executa a aplicacao com o servirdor Waitress (Atualmente em producao)
if __name__ == '__main__':
    from waitress import serve
    print("Servidor em producao")
    serve(app, host='0.0.0.0', port=5000)
