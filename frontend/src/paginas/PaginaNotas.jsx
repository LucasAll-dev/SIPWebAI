
import React from "react";
import EditorNota from "../componentes/notas/EditorNota";
import ListaNotas from "../componentes/notas/ListaNotas";

export default function PaginaNotas() {
    return (
        <div>
            <h2>Notas</h2>
            <EditorNota />
            <ListaNotas />
        </div>
    );
}
