
import React from "react";
import {BrowserRouter} from "react-router-dom";
import RotasApp from "./rotas";
import {ProvedorAutenticacao} from "./contexto/ContextoAutenticacao";

export default function App() {
    return (
        <ProvedorAutenticacao>
            <BrowserRouter>
            <RotasApp />
            </BrowserRouter>
        </ProvedorAutenticacao>
    );
}
