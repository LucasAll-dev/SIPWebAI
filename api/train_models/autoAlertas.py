import os
import json
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def load_and_prepare_data(json_path):
    """Carrega e prepara os dados do arquivo JSON"""
    with open(json_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    
    # Transformar a estrutura aninhada em linhas individuais
    data = []
    for group in raw_data:
        for i in range(len(group['prioridade'])):
            data.append({
                'prioridade': group['prioridade'][i],
                'tipo_tarefa': group['tipo_tarefa'][i],
                'duracao': group['duracao'][i],
                'vezes_adiadas': group['vezes_adiadas'][i],
                'alerta': group['alerta'][i]
            })
    
    return pd.DataFrame(data)

def train_and_save_model():
    # Configuracao de caminhos
    model_dir = '../models-ml'
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'alert_model.pkl')
    
    # Carregar e preparar dados
    df = load_and_prepare_data('../data/train/alertasAuto.json')
    
    print("\nAmostra dos dados preparados:")
    print(df.head())
    
    # 3. Pre-processamento
    encoder = LabelEncoder()
    df['tipo_tarefa_encoded'] = encoder.fit_transform(df['tipo_tarefa'])
    
    print("\nClasses codificadas:")
    for i, cls in enumerate(encoder.classes_):
        print(f"{cls}: {i}")
    
    # Divisao dos dados
    X = df[['prioridade', 'tipo_tarefa_encoded', 'duracao', 'vezes_adiadas']]
    y = df['alerta']
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Treinamento do modelo
    model = RandomForestClassifier(
        n_estimators=150,
        max_depth=6,
        min_samples_split=3,
        class_weight='balanced',
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Avaliacao
    print("\nRelatório de Classificação:")
    print(classification_report(y_test, model.predict(X_test)))
    
    # Salvar modelo
    joblib.dump({
        'model': model,
        'encoder': encoder,
        'metadata': {
            'features': ['prioridade', 'tipo_tarefa', 'duracao', 'vezes_adiadas'],
            'target': 'alerta',
            'classes': list(model.classes_),
            'version': '1.0.4',
            'training_date': pd.Timestamp.now().isoformat()
        }
    }, model_path)
    
    print(f"\nModelo salvo com sucesso em: {os.path.abspath(model_path)}")

if __name__ == '__main__':
    try:
        train_and_save_model()
    except Exception as e:
        print(f"\n Erro durante o treinamento: {str(e)}")
        raise