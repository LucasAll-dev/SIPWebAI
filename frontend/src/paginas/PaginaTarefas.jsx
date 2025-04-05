
import React from "react";
import ListaTarefas from "../componentes/tarefas/ListaTarefas";
import FormularioTarefa from "../componentes/tarefas/FormularioTarefas";

export default function PaginaTarefas() {
    return (
        <div>
            <h2>Tarefas</h2>
            <FormularioTarefa />
            <ListaTarefas />
        </div>
    );
}
