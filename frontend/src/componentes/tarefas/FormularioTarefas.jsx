
import React, {useState} from "react";
import { criarTarefa } from "../servicos/taskService";

export default function FormularioTarefa({aoCriar}) {
    const [titulo, setTitulo] = useState("");

    async function enviar(e) {
        e.preventDefault();
        await criarTarefa({titulo});
        setTitulo("");
        if(aoCriar){
            aoCriar();
        }
    }

    return (
        <form onSubmit={enviar}>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nova Tarefa" required
            />
            <button type="submit">Adicionar</button>
        </form>
    );
}
