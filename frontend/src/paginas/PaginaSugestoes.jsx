
import React, {useEffect, useState} from "react";
import SugestoesIA from "../componentes/SugestoesIA/SugestoesIA";
import { obterTarefas } from "../servicos/taskService";

export default function PaginaSugestoes() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        async function CarregarTarefas() {
            const resposta = await obterTarefas();
            setTarefas(resposta.data);
        }
        CarregarTarefas;
    }, []);

    return (
        <div>
            <h2>IA - Sugestões</h2>
            <SugestoesIA tarefas={tarefas} />
        </div>
    );
}
