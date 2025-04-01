
import {createContext, useContext, useState} from "react";

const ContextoAutenticacao = createContext();

export function ProvedorAutenticacao({children}) {
    const [usuario, setUsuario] = useState(null);

    const entrar = (dados) => setUsuario(dados);
    const sair = () => setUsuario(null);

    return (
        <ContextoAutenticacao.Provider vaue={{usuario, entrar, sair}}>
            {children}
        </ContextoAutenticacao.Provider>
    );
}

export function useAutenticacao() {
    return useContext(ContextoAutenticacao);
}
