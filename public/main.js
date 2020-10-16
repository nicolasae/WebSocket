/*conectamos el cliente con el servidor de websocket*/
var socket = io.connect('http://localhost:8080',{'forceNew':true});
var datos = [];

/*recibiendo mensajes*/
socket.on('messages',function(data){
    console.log(data);
    render(data);
    datos.push(data.state);
    console.log(datos);
    //console.log(typeof data.state)
});

function render (data) {
    var html = data.map(function(elem, index) {
        return(`<div>
                  <strong>${elem.state}</strong>:
                 
                </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(respuesta) {
      var message = {
        state: document.getElementById('numero').value,
        res: respuesta 
    };
    
    socket.emit('new-message', message);
    return false;
}

function makegraphic(respuesta) {
    var message = {
      state: 500,
      res: respuesta 
  };
  
  socket.emit('new-graphic', message);
  return false;
}
