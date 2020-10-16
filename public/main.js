/*conectamos el cliente con el servidor de websocket*/
var socket = io.connect('http://localhost:8080',{'forceNew':true});

/*recibiendo mensajes*/
socket.on('messages',function(data){
    console.log(data);
});