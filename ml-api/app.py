from datetime import datetime
from flask import Flask, request ,jsonify
from joblib import load
import numpy as np
import os


# Rotas da api para conexao com o backend
# http://localhost:5000/tarefas
# http://localhost:5000/horarios


# Instancia Flask
app = Flask(__name__)

# Caregao modelo de automacao de tarefas (Random Forest)
model_tarefas = load('./models-ml/tarefasAuto.pkl')
model_horarios = load('./models-ml/horariosAuto.pkl')


# =================================================== #
#     Rota para previsao de prioridade de tarefas     # 
# =================================================== #

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

# =================================================== #
#         Rota para previsao de horarios              #
# =================================================== #

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

# =================================================== #
#          RPTA PARA PREVISAP DE ALERTAS              #
# =================================================== #

# Carregar modelo e encoder
def load_model():
    model_path = os.path.join('./models-ml', 'alert_model.pkl')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Arquivo do modelo não encontrado em {model_path}")
    
    model_data = load(model_path)
    return model_data['model'], model_data['encoder']

model, encoder = load_model()

def generate_alert_message(alerta, features):
    """Gera mensagens e sugestões personalizadas"""
    messages = {
        'urgente': [
            f"🚨 ALERTA URGENTE: Tarefa '{features['tipo_tarefa']}' requer ação imediata!",
            f"• Prioridade: ALTA (nível {features['prioridade']})",
            f"• Já adiada {features['vezes_adiadas']} vezes",
            "🔹 Sugestões:",
            "- Realize hoje como prioridade máxima",
            "- Divida em sessões de 1h se necessário"
        ],
        'aviso': [
            f"⚠️ AVISO: Tarefa '{features['tipo_tarefa']}' precisa de atenção",
            f"• Prioridade: MÉDIA (nível {features['prioridade']})",
            f"• Duração estimada: {features['duracao']}h",
            "🔹 Sugestões:",
            "- Agende para os próximos 3 dias",
            "- Prepare materiais com antecedência"
        ],
        'nenhum': [
            f"✓ Tarefa '{features['tipo_tarefa']}' sob controle",
            f"• Prioridade: BAIXA (nível {features['prioridade']})",
            "🔹 Sugestões:",
            "- Mantenha no seu cronograma normal",
            "- Revise quando tiver disponibilidade"
        ]
    }
    
    # Adiciona alertas condicionais
    if features['vezes_adiadas'] > 2:
        messages[alerta].append(f"\n🔔 Você já adiou esta tarefa {features['vezes_adiadas']} vezes!")
        messages[alerta].append("- Considere delegar ou renegociar prazos")
    
    if features['duracao'] > 4:
        messages[alerta].append(f"\n⏱️ Tarefa longa ({features['duracao']}h):")
        messages[alerta].append("- Divida em partes de 2h com intervalos")
    
    return messages.get(alerta, ["Status desconhecido"])

@app.route('/alertas', methods=['POST'])
def alert():
    """Endpoint para alertas personalizados"""
    try:
        # Validacao basica
        if not request.is_json:
            return jsonify({
                'status': 'error',
                'message': 'Envie os dados em formato JSON',
                'timestamp': datetime.now().isoformat()
            }), 400
        
        data = request.json
        
        # Validacao de campos
        required_fields = ['prioridade', 'tipo_tarefa', 'duracao', 'vezes_adiadas']
        if missing := [f for f in required_fields if f not in data]:
            return jsonify({
                'status': 'error',
                'message': f'Campos faltando: {", ".join(missing)}',
                'required_fields': required_fields,
                'timestamp': datetime.now().isoformat()
            }), 400
        
        # Validacao de valores
        try:
            if data['prioridade'] not in {0, 1, 2}:
                raise ValueError("Prioridade deve ser 0 (baixa), 1 (média) ou 2 (alta)")
            if data['duracao'] <= 0:
                raise ValueError("Duração deve ser maior que 0")
            if data['vezes_adiadas'] < 0:
                raise ValueError("Vezes adiadas não pode ser negativo")
        except ValueError as e:
            return jsonify({
                'status': 'error',
                'message': str(e),
                'timestamp': datetime.now().isoformat()
            }), 400
        
        # Codificar tipo de tarefa
        try:
            tipo_encoded = encoder.transform([data['tipo_tarefa']])[0]
        except ValueError:
            return jsonify({
                'status': 'error',
                'message': f"Tipo de tarefa inválido. Valores aceitos: {list(encoder.classes_)}",
                'timestamp': datetime.now().isoformat()
            }), 400
        
        # Preparar features
        features = {
            'prioridade': data['prioridade'],
            'tipo_tarefa': data['tipo_tarefa'],
            'duracao': data['duracao'],
            'vezes_adiadas': data['vezes_adiadas']
        }
        
        # Fazer previsao
        X = np.array([data['prioridade'], tipo_encoded, data['duracao'], data['vezes_adiadas']]).reshape(1, -1)
        alerta = model.predict(X)[0]
        
        # Gerar mensagem personalizada
        alert_message = generate_alert_message(alerta, features)
        
        return jsonify({
            'status': 'success',
            'alerta': alerta,
            'mensagem_completa': alert_message,
            'detalhes': {
                'prioridade': data['prioridade'],
                'tipo_tarefa': data['tipo_tarefa'],
                'duracao': data['duracao'],
                'vezes_adiadas': data['vezes_adiadas'],
                'confianca': float(np.max(model.predict_proba(X)))
            },
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Erro interno: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500


# Executa a aplicacao com o servirdor Waitress (Atualmente em producao)
if __name__ == '__main__':
    from waitress import serve
    print("Servidor em producao")
    serve(app, host='0.0.0.0', port=5000)
