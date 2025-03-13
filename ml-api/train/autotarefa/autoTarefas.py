import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Carrega os dados para o treinamento do modelo em formato JSON
df_train = pd.read_json("dados.json")

# Separa em deois eixos, features (X e target (y)
X = df_train.drop('prioridade', axis=1) #dados que vao ser usados para treinar

y = df_train['prioridade'] #eixo para dar a previsao de prioridade

# Dividri os dados em treino e testes
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Criacao do modelo de Classificacao (Random Forest)
model = RandomForestClassifier(n_estimators=100, random_state=42)

# treinamento do modelo de Classificacao (Random Forest)
model.fit(X_train, y_train)

# Fazer previsoes no conjunto de teste
y_pred = model.predict(X_test)

# Avaliar o modelo treinado
print("Acuracia:", accuracy_score(y_test,y_pred))
print("Matriz de Confusao:\n", confusion_matrix(y_test, y_pred))
print("Relatorio de Classificacao:\n", classification_report(y_test, y_pred))

# Slava o modelo treinado

joblib.dump(model, 'modelo_priorizacao.pkl')

# Carregar novas tarefas do arquivo JSON
df_novas_tarefas = pd.read_json('novas_tarefas.json')

# Fazer previsões para as novas tarefas
prioridades = model.predict(df_novas_tarefas)
print("Prioridades das novas tarefas:", prioridades)