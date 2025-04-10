
import {createContext, useContext, useState} from "react";

const ContextoPreferencias = createContext();

export function ProvedorPreferencias({children}) {
    const [tema, setTema] = useState("claro");
    const {iaAtiva, setIaAtiva} = useState(true);
    const [notificacoes, setNotificacoes] = useState(true);

    return (
        <ContextoPreferencias.Provider value={{tema, setTema, iaAtiva, setIaAtiva, notificacoes, setNotificacoes}}>
            {children}
        </ContextoPreferencias.Provider>
    );
}

export function usePreferencias() {
    return useContext(ContextoPreferencias);
}
