
import React from "react";
import {BrowserRouter} from "react-router-dom";
import RotasApp from "./rotas";
import {ProvedorAutenticacao} from "./contexto/ContextoAutenticacao";
import { ProvedorNotificacoes } from "./PersonalizadoUsoGlobal/ContextoNotificacoes";
import { ProvedorPreferencias } from "./contexto/ContextoPreferencias";

export default function App() {
    return (
        <ProvedorNotificacoes>
            <ProvedorPreferencias>
                <ProvedorAutenticacao>
                    <BrowserRouter>
                    <RotasApp />
                    <Notificador mensagem={mensagem} />
                    </BrowserRouter>
                </ProvedorAutenticacao>
            </ProvedorPreferencias>
        </ProvedorNotificacoes>
    );
}
