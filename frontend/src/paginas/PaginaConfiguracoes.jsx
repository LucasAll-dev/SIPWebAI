
import React from "react";
import ConfiguracoesConta from "../componentes/Configuracoes/ConfiguracoesConta";
import Preferencias_IA from "../componentes/Configuracoes/Preferencias_IA";
import PreferenciasInterface from "../componentes/Configuracoes/PreferenciasInterface";

export default function PaginaConfiguracoes() {
    return (
        <div>
            <h2>Configurações e Preferências</h2>
            <ConfiguracoesConta />
            <PreferenciasInterface />
            <Preferencias_IA />
        </div>
    );
}
