
import React, {useEffect, useState} from "react";
import { obterEventos } from "../../servicos/eventService";

export default function VisualizacaoCalendario() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        async function carregar() {
            const resposta = await obterEventos();
            setEventos(resposta.data);
        }
        carregar();
    }, []);

    return (
        <div>
            <h3>EVENTOS:</h3>
            <ul>
                {eventos.map(ev => (
                    <li key={ev.id}>{ev.titulo} - {ev.data}</li>
                ))}
            </ul>
        </div>
    );
}
