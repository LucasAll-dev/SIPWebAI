
import React, {useEffect, useState} from "react";
import { getProdutividade } from "../../servicos/RelatorioService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GraficoProdutividade() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        getProdutividade().then(res => setDados(res.data));
    }, []);

    return (
        <div>
            <h3>Picos de Produtividade por Hora</h3>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={"dados"}>
                    <XAxis dataKey={hora} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={quantidade} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
