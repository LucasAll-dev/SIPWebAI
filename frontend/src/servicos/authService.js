
import axios from "axios";

const API = "https://localhost:3001/api/auth";

export async function login(email, senha) {
    const resposta = await axios.post(`${API}/register`, {nome, email, senha});
    return resposta.data;
}
