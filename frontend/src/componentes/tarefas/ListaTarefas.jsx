
import React, {useEffect, useState} from "react";
import { deletarTarefa, obterTarefas } from "../servicos/taskService";

export default function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        const resposta = await obterTarefas();
        setTarefas(resposta.data);
    }

    async function remover(id) {
        await deletarTarefa(id);
        carregar();
    }

    return (
        <ul>
            {tarefas.map((tarefa) => (
                <li key={tarefa.id}>
                    {tarefa.titulo}
                    <button onClick={() => remover(tarefa.id)}>Excluir</button> 
                </li>
            ))}
        </ul>
    );
}
