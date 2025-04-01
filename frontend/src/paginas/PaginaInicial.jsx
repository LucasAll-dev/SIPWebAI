
import React from "react";
import BarraNavegacao from "../componentes/layout/barraNavegacao";
import BarraLateral from "../componentes/layout/BarraLateral";
import Rodape from "../componentes/layout/Rodape";

export default function PaginaInicial() {
    return (
        <div className="aplicacao">
            <BarraNavegacao />
            <BarraLateral />
            <main className="conteudo">Bem-Vindo ao SIP com Inteligência Artificial</main>
            <Rodape />
        </div>
    );
}
