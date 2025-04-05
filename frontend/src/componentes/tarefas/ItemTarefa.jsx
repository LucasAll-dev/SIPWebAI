
import React from "react";

export default function ItemTarefa({tarefa, aoExcluir}) {
    return (
        <li>
            <span>{tarefa.titulo}</span>
            <button onClick={() => aoExcluir(tarefa.id)}>Excluir</button>
        </li>
    );
}
