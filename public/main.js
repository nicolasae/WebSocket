/*conectamos el cliente con el servidor de websocket*/
var socket = io.connect('http://localhost:8080',{'forceNew':true});

/*recibiendo mensajes*/
socket.on('messages',function(data){
    console.log(data);
    render(data);
});

function render (data) {
    var html = data.map(function(elem, index) {
        //<em>${elem.res}</em>
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
