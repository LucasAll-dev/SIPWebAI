import pandas as pd
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

#dados de entrada
df = pd.read_json('data/train/produtividadeAuto.json')

# dividimos os dados em eixo x e y
X = df[['hora_inicio', 'duracao']]
y = df['produtividade']

# normatilzar os dados
scaler =StandardScaler()
X_scaled = scaler.fit_transform(X)

# dividir os dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# cria e treina o modelo
model = LinearRegression()
model.fit(X_train, y_train)

# avaliar o modelo
score = model.score(X_test, y_test)
print(f'Acuracia do modelo: {score:.2f}')

# verifica para o diretorio inde o modelo sera salva
model_dir = 'models-ml'
model_path = os.path.join(model_dir, 'produtividadeAuto.pkl')

# verificar se o diretorio existe, se nao existir ele cria o diretorio novo
if not os.path.exists(model_dir):
    os.mkedirs(model_dir)

# salva o modelo treinado
joblib.dump(model, model_path)

# carregar o arquivo JSON para teste
df_arquivo_test = pd.read_json('data/test/produtividade.json')

new_df_scaled = scaler.transform(df_arquivo_test[['hora_inicio', 'duracao']])

predictioins = model.predict(new_df_scaled)

for i, pred in enumerate(predictioins):
    print(f'Tarefa {i+1}: Produtividade prevista = {pred:.2f}%')
