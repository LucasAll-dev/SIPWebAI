# SIPWebAI
BackEnd 
Bibliotecas Usadas:
npm install express mysql2 dotenv bcryptjs jsonwebtoken cors


## MACHINE LEARNING API (ml-api)

### Para podermos iniciar a API do modulo de Machine Learning

Link para instalar o PYENV: https://github.com/pyenv-win/pyenv-win

Instale o PYENV com o terminal como administrador

Configure o PYENV:
 - pyenv global 3.13.2  
Esse 3.13.2 troque pela sua versao do python instalada na sua maquina

Instale o poetry:
 - pip install poetry

Configure o poetry:
 - poetry config virtualenvs.in-project true

Na pasta da API de machine learning instale todas as dependencias utilizadas:
 - poetry install

Instale o comando SHELL: 
 - poetry self add poetry-plugin-shell

Inicie o ambiente virtual:
 - poetry shell

Iniciar o Servidor: 
- poetry run python app.py