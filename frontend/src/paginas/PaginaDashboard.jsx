
import React from "react";
import GraficoProdutividade from "../componentes/Painel/GraficoProdutividade";
import GraficoResumoTarefas from "../componentes/Painel/GraficoResumoTarefas";
import GraficoTempoTarefas from "../componentes/Painel/GraficoTempoTarefas";

export default function PaginaDashboard() {
    return (
        <div>
            <h2>Relatórios e Produtividade</h2>
            <GraficoProdutividade />
            <GraficoResumoTarefas />
            <GraficoTempoTarefas />
        </div>
    );
}
