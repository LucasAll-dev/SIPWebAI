
import React from "react";
import "./notificador.css";

export default function Notificador({mensagem}) {
    if (!mensagem){
        return null;
    }

    return (
        <div className="notificador">
            <span>{mensagem}</span>
        </div>
    );
}
