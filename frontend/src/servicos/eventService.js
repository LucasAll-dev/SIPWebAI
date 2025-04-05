
import axios from "axios";
const API = "http://localhost:3001/api/tarefas";

export const obterEventos = () => axios.get(API);
export const criarEvento = (dados) => axios.post(API, dados);
export const atualizarEvento = (id, dados) => axios.put(`${API}/${id}`, dados);
export const deletarEvento = (id) => axios.delete(`${API}/${id}`);

