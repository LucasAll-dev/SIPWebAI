

import React from "react";
import VisualizacaoCalendario from "../componentes/eventos/visualizacaoCalendario";
import FormularioEvento from "../componentes/eventos/FormularioEvento";

export default function PaginaEventos() {
    return (
        <div>
            <h2>Eventos</h2>
            <FormularioEvento />
            <VisualizacaoCalendario />
        </div>
    );
}

