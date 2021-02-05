var socket = io();

let params = new URLSearchParams(window.location.search); //obtenengo el nombre del usuario por la url del usuario

if (!params.has('nombre') || !params.has('sala')) { // si no tiene nombre lo devuelvo al principio
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'), //es el nombre que recibe por los parametros
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) { //en el function vendrian todas los usuarios conectados. en si seria el callback del servidor(socket.js)
        console.log('Usuarios Conectados', resp);
    });
});
// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});
//Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function(usuarios) {
    console.log(usuarios);
});
//Mensajes Privados(accion del cliente)
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado', mensaje);
});