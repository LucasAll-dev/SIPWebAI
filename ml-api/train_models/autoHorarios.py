from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import pandas as pd
import joblib
import os

# Carrega dados para treinamento e os transforma em dataFrame
df = pd.read_json('../data/train/horariosAuto.json')

# separar em dois eixos, features (X) e target (y)
X = df[['dia_da_semana', 'prioridade', 'duracao']]

y = df['horario_sugerido'] # eixo para dar a previsao 

# dividir os dados em treino e testes
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Cria o modelo e o treina
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Mostra as metricas do modelo
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Acuuracia do modelo: {accuracy * 100:.2f}%")

# verifica para onde o diretorio onde o modelo sera salvo
model_dir = '../models-ml'
model_path = os.path.join(model_dir, 'horariosAuto.pkl')

# verifica se o diretorio existe, caso nao exista ele cria o diretorio
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

# salva o modelo
joblib.dump(model, model_path)

# Carrega os dados para teste de previssao
data_test = pd.read_json('../data/test/horarioTest.json')


# mostra a previssao
horario_sugerido = model.predict(data_test)
print(f"Horario sugerido: {horario_sugerido[0]}")