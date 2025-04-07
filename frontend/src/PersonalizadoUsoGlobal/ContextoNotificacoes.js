
import React, {createContext, useContext, useState} from "react";

const ContextoNotificacoes = createContext();

export function ProvedorNotificacoes({children}) {
    const [mensagem, setMensagem] = useState(null);

    function notificar(texto) {
        setMensagem(texto); 
        setTimeout(() => setMensagem(null), 5000);
    }

    return (
        <ContextoNotificacoes.Provider value={{mensagem, notificar}}>
            {children}
        </ContextoNotificacoes.Provider>
    );
}

export function useNotificacao() {
    return useContext(ContextoNotificacoes);
}
