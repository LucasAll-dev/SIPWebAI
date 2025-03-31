
const db = require("../config/db");

async function tempoPorTarefa(userId) {
    const [linhas] = await db.query(
        `SELECT titulo, tempo_gasto
        FROM tarefas
        WHERE usuario_id = ? AND status = 'concluída'`, [userId]
    );
    return linhas;
}

async function picosProdutividade(userId) {
    const [linhas] = await db.query(
        `SELECT HOUR(data_conclusao) AS hora, COUNT(*) AS quantidade
        FROM tarefas
        WHERE usuario_id = ? AND status = 'concluída'
        GROUP BY hora ORDER BY hora`, [userId]
    );
    return linhas;
}

async function resumoTarefas(userId) {
    const [linhas] = await db.query(
        `SELECT status, COUNT(*) AS total
        FROM tarefas
        WHERE usuario_id = ? GROUP BY status`, [userId]
    );
    return linhas;
}

module.exports = {
    tempoPorTarefa, picosProdutividade, resumoTarefas
};
