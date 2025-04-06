
import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import PaginaInicial from "./paginas/PaginaInicial";
import PaginaLogin from "./paginas/PaginaLogin";
import PaginaNaoEncontrada from "./paginas/PaginaNaoEncontrada";
import { useAutenticacao } from "./contexto/ContextoAutenticacao";
import PaginaRegistro from "./paginas/PaginaRegistro";
import PaginaSugestoes from "./paginas/PaginaSugestoes";
import PaginaDashboard from "./paginas/PaginaDashboard";

function RotaPrivada({children}) {
    const {usuario} = useAutenticacao();
    return usuario ? children: <Navigate to="/login" />
}

export default function RotasApp() {
    return (
        <Routes>
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="/registro" element={<PaginaRegistro />} />
            <Route path="/" element={
                    <RotaPrivada>
                        <PaginaInicial />
                    </RotaPrivada>
                }
            />
            <Route path="*" element={<PaginaNaoEncontrada />} />
            <Route path="/sugestoes" element={
                <RotaPrivada>
                    <PaginaSugestoes />
                </RotaPrivada>
            } />
            <Route path="/dashboard" element={
                <RotaPrivada>
                    <PaginaDashboard />
                </RotaPrivada>
            } />
        </Routes>
    );
}
