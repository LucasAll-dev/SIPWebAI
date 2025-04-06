
import React, {useState} from "react";
import { ObterSugestoesTarefas } from "../../servicos/IA_service";
import { index } from "mathjs";

export default function SugestoesIA({tarefas}) {
    const [sugestoes, setSugestoes] = useState([]);
    const [carregando, setCarregando] = useState(false);

    async function BuscarSugestoes() {
        setCarregando(true);
        try {
            const resposta = await ObterSugestoesTarefas(tarefas);
            setSugestoes(resposta.data);
        } catch (erro) {
            console.error("Erro ao buscar sugestões: ", erro.message);
        } finally {
            setCarregando(false);
        }
    }

    function AceitarSugestao(sugestao) {
        alert(`Sugestão Aceita: ${sugestao}`);
    }

    return (
        <div>
            <h3>Sugestões de IA</h3>
            <button onClick={BuscarSugestoes} disabled={carregando}>
                {carregando ? "Buscando..." : "Obter Sugestões"}
            </button>

            <ul>
                {sugestoes.map((s, index) => (
                    <li key={index}>
                        <span>{s.mensagem || s}</span>
                        <button onClick={() => AceitarSugestao(s.mensagem || s)}>Aceitar</button>
                        <button>Ignorar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
