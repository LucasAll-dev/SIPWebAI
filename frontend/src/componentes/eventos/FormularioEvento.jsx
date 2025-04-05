
import React, {useState} from "react";
import { criarEvento } from "../../servicos/eventService";

export default function FormularioEvento({aoCriar}) {
    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState("");

    async function enviar(e) {
        e.preventDefault();
        await criarEvento({titulo, data});
        setTitulo("");
        setData("");
        if(aoCriar) {
            aoCriar();
        }
    }

    return (
        <form onSubmit={enviar}>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} 
                placeholder="Título do Evento" required />
            <button type="submit">Agendar</button>
        </form>
    );
}
