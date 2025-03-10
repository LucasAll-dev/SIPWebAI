from flask import Flask, jsonify

# Instancia Flask
app = Flask(__name__)


# Rota principal
@app.route('/')
def home():
    return jsonify({"mensagem": "API No Ar"})

# aqui vai ficar a logica dos modelos de machine learning

# fecha


# Executa a aplicacao com o servirdor Waitress (Atualmente em producao)
if __name__ == '__main__':
    from waitress import serve
    print("Servidor em producao")
    serve(app, host='0.0.0.0', port=5000)