
import React, {useState} from "react";
import { criarNota } from "../../servicos/noteService";
import { acos } from "mathjs";

export default function EditorNota({aoCriar}) {
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");

    async function salvar(e) {
        e.preventDefault();
        await criarNota({titulo, conteudo});
        setTitulo("");
        setConteudo("");
        if(aoCriar) {
            aoCriar();
        }
    }

    return (
        <form onSubmit={salvar}>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo"/>
            <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} placeholder="Conteúdo"/>
            <button type="submit">Salvar Nota</button>
        </form>
    );
}
