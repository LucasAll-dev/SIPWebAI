import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import joblib

#dados de entrada
data = {
    'hora_inicio': [9, 10, 14, 15, 16],
    'duracao': [2, 1, 3, 2, 1],
    'produtividade': [80, 90, 70, 85, 75]
}

# criar dataframe
df = pd.DataFrame(data)

# dividimos os dados em eixo x e y
X = df[['hora_inicio', 'duracao']]
y = df['produtividade']

# dividir os dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# cria e treina o modelo
modelo = LinearRegression()
modelo.fit(X_train, y_train)

