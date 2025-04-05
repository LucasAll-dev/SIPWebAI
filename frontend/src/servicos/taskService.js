
import axios from "axios";
const API = "http://localhost:3001/api/tarefas";

export const obterTarefas = () => axios.get(API);
export const criarTarefa = (dados) => axios.post(API, dados);
export const atualizarTarefa = (id, dados) => axios.put(`${API}/${id}`, dados);
export const deletarTarefa = (id) => axios.delete(`${API}/${id}`);
