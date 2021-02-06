var socket = io();

var params = new URLSearchParams(window.location.search);


if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuarios(resp);
    });

});


socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});



socket.on('listaPersona', function(personas) {
    renderizarUsuarios(personas);
});

socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});