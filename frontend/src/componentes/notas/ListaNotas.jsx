
import React, {useEffect, useState} from "react";
import { obterNotas, deletarNota } from "../../servicos/noteService";

export default function ListaNotas() {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        const resposta = await obterNotas();
        setNotas(resposta.data);
    }

    async function remover(id) {
        await deletarNota(id);
        carregar();
    }

    return (
        <ul>
            {notas.map((nota) => (
                <li key={nota.id}>
                    <strong>{nota.titulo}</strong><br />
                    <span>{nota.conteudo}</span><br />
                    <button onClick={() => remover(nota.id)}>Excluir</button>
                </li>
            ))}
        </ul>
    );
}
