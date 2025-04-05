
import axios from "axios";
const API = "http://localhost:3001/api/notas";

export const obterNotas = () => axios.get(API);
export const criarNota = (dados) => axios.post(API, dados);
export const atualizarNota = (id, dados) => axios.put(`${API}/${id}`, dados);
export const deletarNota = (id) => axios.delete(`${API}/${id}`);

