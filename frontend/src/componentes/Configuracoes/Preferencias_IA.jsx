
import React from "react";
import { usePreferencias } from "../../contexto/ContextoPreferencias";

export default function Preferencias_IA() {
    const {iaAtiva, setIaAtiva} = usePreferencias();

    return (
        <div>
            <h4>Inteligência Artificial</h4>
            <label>
                <input type="checkbox" checked={iaAtiva} onChange={() => setIaAtiva(!iaAtiva)} />
                Ativar Sugestões Inteligentes
            </label>
        </div>
    );
}
