/*conectamos el cliente con el servidor de websocket*/
var socket = io.connect('http://localhost:8080',{'forceNew':true});
//var Chart = require('chart.js')
var datos = [];

/*recibiendo mensajes*/
socket.on('messages',function(data){
    console.log(data);
    render(data);
    datos.push(data.state);
    console.log(datos);
    //console.log(typeof data.state)
});

socket.on('graphic',function(data){
    graficador(data);
});

function graficador(data){
    var html = data.map(function(elem, index) {
        return(`<div>
                <canvas id="myChart" width="400" height="400"></canvas>                 
                <script>
                ${elem}
                </script> 
                </div>`);
    }).join(" ");
    document.getElementById('grapchic').innerHTML = html;
}

function render (data) {
    var html = data.map(function(elem, index) {
        return(`<div>
                  <strong>${elem.state}</strong>:
                </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(respuesta,boton) {
    if (boton == true ){
        var message = {
            state: respuesta 
        };  
    }else {
      var message = {
        state: document.getElementById('numero').value,
        res: respuesta 
    }};
    
    socket.emit('new-message', message);
    return false;
}

function makegraphic() {
     
  socket.emit('new-graphic', datos);
  return false;
}
