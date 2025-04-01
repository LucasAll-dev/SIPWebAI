
import React, {useState} from "react";
import {registrar} from "../../servicos/authService";
import {useNavigate} from "react-router-dom";

export default function Registro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navegar = useNavigate();

    const handleRegistro = async (e) => {
        e.preventDefault();
        try {
            await registrar(nome, email, senha);
            alert("Cadastro Realizado com Sucesso!");
            navegar("/login");
        } catch (erro) {
            alert ("Erro ao Registrar: " + erro.message);
        }
    };

    return (
        <form onSubmit={handleRegistro}>
            <h2>Registrar</h2>
            <input 
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)} required
            />
            <input 
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
            />
            <input 
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} required
            />
            <button type="submit">Registrar</button>
        </form>
    );
}
