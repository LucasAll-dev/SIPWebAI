
import React from "react";
import { usePreferencias } from "../../contexto/ContextoPreferencias";

export default function PreferenciasInterface() {
    const {tema, setTema} = usePreferencias();

    return (
        <div>
            <h4>Tema da Interface</h4>
            <select value={tema} onChange={(e) => setTema(e.target.value)}>
                <option value={"claro"}>Claro</option>
                <option value={"escuro"}>Escuro</option>
            </select>
        </div>
    );
}
