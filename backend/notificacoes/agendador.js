
const cron = require("node-cron");
const {verificarTarefasPendentes} = require("./lembretesServico");

function iniciarAgendador() {
    console.log("Agendador de Lembretes Iniciado...");

    cron.schedule("*/5 * * * *", async () => {
        console.log("Verificando Lembretes...");
        const total = await verificarTarefasPendentes();
        console.log(`${total} Lembretes Verificados`);
    });
}

module.exports = iniciarAgendador;
