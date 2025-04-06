
import React, {useEffect, useState} from "react";
import { getTempoTarefas } from "../../servicos/RelatorioService";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, DefaultLegendContent } from "recharts";

export default function GraficoTempoTarefas() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        getTempoTarefas().then(res => setDados(res.data));
    }, []);

    return (
        <div>
            <h3>Tempo Gasto em Cada Tarefa</h3>
            <ResponsiveContainer width="100%" height="300">
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="titulo" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="tempo_gasto" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
