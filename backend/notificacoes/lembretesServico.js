
const db = require("./notificacoesServico");

async function verificarTarefasPendentes() {
    const [tarefas] = await db.query(
        `SELECT id, titulo, prazo, usuario_id
         FROM tarefas
         WHERE status = 'pendente' AND prazo IS NOT NULL AND prazo <= NOW() + INTERVAL 1 HOUR`
    );

    for (const tarefa of tarefas) {
        await enviarNotificacao(tarefa.usuario_id, `SUA TAREFA "${tarefa.titulo}" VENCE EM BREVE!`);
    }
    return tarefas.length;
}
