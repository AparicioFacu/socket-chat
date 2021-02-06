var socket = io();

var params = new URLSearchParams(window.location.search); //obtenengo el nombre del usuario por la url del usuario


if (!params.has('nombre') || !params.has('sala')) { // si no tiene nombre o sala lo devuelvo al principio
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'), //es el nombre que recibe por los parametros de la web
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) { //en el function vendrian todas los usuarios conectados. en si seria el callback del servidor(socket.js)
        renderizarUsuarios(resp); // aqui estan todas las personas conectadas en el chat
    });

});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    renderizarUsuarios(personas);
});
// Mensajes privados(accion del cliente)
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});