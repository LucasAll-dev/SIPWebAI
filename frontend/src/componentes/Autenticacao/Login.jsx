
import React , {useState} from "react";
import {useAutenticacao} from "../../contexto/ContextoAutenticacao";
import { login } from "../../servicos/authService";
import {useNavigate} from "react-router-dom";
import { e } from "mathjs";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const {entrar} = useAutenticacao();
    const navegar = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const usuario = await login(email, senha);
            entrar(usuario);
            navegar("/");
        } catch (erro) {
            alert("Falha no Login: " + erro.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Entrar</h2>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
            />
            <button type="submit">Entrar</button>
        </form>
    );
}

