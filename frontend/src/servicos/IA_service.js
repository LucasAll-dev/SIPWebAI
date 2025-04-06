
import axios from "axios";

const API = "http://localhost:3001/api/ia";

export const ObterSugestoesTarefas = async (tarefas) => axios.post(`${API}/tarefas`, {tarefas});
export const ObterSugestoesHorarios = async (eventos) => axios.post(`${API}/horarios`, {eventos});
export const ObterSugestoesProdutividade = async (atividades) => axios.post(`${API}/produtividade`, {ativadades});
