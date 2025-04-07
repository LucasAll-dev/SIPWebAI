
import {useState} from "react";

export default function useNotificador() {
    const [mensagem, setMensagem] = useState(null);

    function notificador(texto) {
        setMensagem(texto);
        setTimeout(() => setMensagem(null), 5000);
    }

    return {
        mensagem, notificar,
    };
}
