/*conectamos el cliente con el servidor de websocket*/
var socket = io.connect('http://localhost:8080',{'forceNew':true});

/*recibiendo mensajes*/
socket.on('messages',function(data){
    console.log(data);
    render(data);
});

function render (data) {
    var html = data.map(function(elem, index) {
        return(`<div>
                  <strong>${elem.id}</strong>:
                  <em>${elem.text}</em>
                </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
      var message = {
        id: document.getElementById('id').value,
        text: document.getElementById('texto').value
    };
    
    socket.emit('new-message', message);
    return false;
}

