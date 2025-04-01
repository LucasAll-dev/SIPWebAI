
import React from "react";
import { useAutenticacao } from "../contexto/ContextoAutenticacao";

export default function PaginaLogin(){
    const {entrar} = useAutenticacao();

    const fazerLogin = () => {
        entrar({nome: "Usuário Demo"});
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={fazerLogin}>Entrar</button>
        </div>
    );
}
