const crearMensaje = (nombre, mensaje) => { // mensaje para emitir cuando un usuario entra o sale del chat

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime() //fecha actual
    }
}

module.exports = {
    crearMensaje
};