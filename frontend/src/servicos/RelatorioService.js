
import axios from "axios";

const API ="http://localhost:3001/api/relatorios";

export const getProdutividade = () => axios.get(`${API}/picos-produtividade`);
export const getResumoTarefas = () => axios.get(`${API}/resumo-tarefas`);
export const getTempoTarefas = () => axios.get(`${API}/tempo-tarefas`); 
