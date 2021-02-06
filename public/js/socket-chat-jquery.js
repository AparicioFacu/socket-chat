var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');
//Referencias de jQuery

var divUsuario = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

// Funciones para renderizar usuario
function renderizarUsuarios(personas) { // peronas que estan en el chat

    console.log(personas);
    let html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '   <a data-id=' + personas[i].id + ' href="javascript:void(0)"><img src="assets/images/users/sinfoto.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>'; // los personas conectados en el chat
        html += '</li>';
    }
    divUsuario.html(html);
}

function renderizarMensajes(mensaje, yo) {

    var html = '';

    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Admin') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/sinfoto.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li> ';
    } else {
        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Admin') {
            html += '<div class="chat-img"><img src="assets/images/users/sinfoto.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '  <h5>' + mensaje.nombre + '</h5>';
        html += '  <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }
    divChatbox.append(html); //agrega los mensajes en el chat

}

function scrollBottom() { //scroll para el chat

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listeners escuchas
divUsuario.on('click', 'a', function() {

    let id = $(this).data('id'); //hace referencia al id que definimor en data-id en la linea 19
    if (id) {
        console.log(id);
    }
});
formEnviar.on('submit', function(e) {
    e.preventDefault(); //evita que la persona escriba un mensaje invalido
    if (txtMensaje.val().trim().length === 0) { //para ver si hay campos vacios y no los envia
        return;
    }
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val() //el val() es para ver el valor del mensaje, es decir tiene informacion del front
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true); //envia los mensajes para que seran mostrados
        scrollBottom();
    });
});