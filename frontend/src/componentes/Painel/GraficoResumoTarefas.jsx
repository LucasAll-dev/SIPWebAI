
import React, {useEffect, useState} from "react";
import { getResumoTarefas } from "../../servicos/RelatorioService";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { index } from "mathjs";

const cores = ["#00c49f", "#ffbb28", "#ff8042", "#8884d8"];

export default function GraficoResumoTarefas() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        getResumoTarefas().then(res => setDados(res.data));
    }, []);

    return (
        <div>
            <h3>Resumo de Tarefas</h3>
            <ResponsiveContainer width={"100%"} height={250}>
                <PieChart>
                    <Pie data={dados} dataKey={total} nameKey={status} outerRadius={80} label>
                        {dados.map((entry, index) => (
                            <Cell key={index} fill="cores[index % cores.length]" />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
