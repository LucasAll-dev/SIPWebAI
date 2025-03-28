from flask import Flask, request ,jsonify
from joblib import load
import numpy as np


# Rotas da api para conexao com o backend
# http://localhost:5000/tarefas
# http://localhost:5000/horarios


# Instancia Flask
app = Flask(__name__)

# Caregao modelo de automacao de tarefas (Random Forest)
model_tarefas = load('./models-ml/tarefasAuto.pkl')
model_horarios = load('./models-ml/horariosAuto.pkl')

# Rota para previsao de prioridade de tarefas
@app.route('/tarefas', methods=['POST'])
def autarefa():
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
        tarefa = np.array([prazo, importancia, complexidade, urgencia]).reshape(1, -1)

        #Fazer a previsao
        prediction = model_tarefas.predict(tarefa)

        #Retorna a previsao como resposta
        return jsonify({'prioridade': int(prediction[0])})
    
    except Exception as e:
        # log do erro
        app.logger.error(f"Erro durante a previsao: {str(e)}")
        return jsonify({'error': 'Erro do Servior Interno'}), 500

# Rota para previsao de horarios
@app.route('/horarios', methods={'POST'})
def horas():
    try:
        # revebe dados do request
        data_horarios = request.get_json(force=True)

        # verifica se todas as chaves necessarias estao presentes
        required_Keys = ['dia_da_semana', 'prioridade', 'duracao']
        if not all(Key in data_horarios for Key in required_Keys):
            return jsonify({'error': 'Campos obrigatorios ausentes'}), 400
        
        # entrair as features do json
        dia_da_semana = data_horarios['dia_da_semana']
        prioridade = data_horarios['prioridade']
        duracao = data_horarios['duracao']

        # cria um array numpy com as features
        horario = np.array([dia_da_semana, prioridade, duracao]).reshape(1, -1)

        # faz a previsao
        pred_horario = model_horarios.predict(horario)

        # retorns s previsao 
        return jsonify({'horario_sugerido': int(pred_horario[0])})
    
    except Exception as e:
        # log do erro
        app.logger.error(f"Erro durante a previsao: {str(e)}")
        return jsonify({'error': 'Erro do Servior Interno'}), 500


# Executa a aplicacao com o servirdor Waitress (Atualmente em producao)
if __name__ == '__main__':
    from waitress import serve
    print("Servidor em producao")
    serve(app, host='0.0.0.0', port=5000)
