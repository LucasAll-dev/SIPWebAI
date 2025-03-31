
async function enviarNotificacao(usuario_id, mensagem) {
    console.log(`NOTIFICAÇÃO PARA USUÁRIO ${usuario_id}: ${mensagem}`);
}

module.exports = {
    enviarNotificacao
};
