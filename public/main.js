var Chart = require('chart.js');
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

socket.on('graphic',function(data){
    graficador(data);
});

function graficador(data){
    var myChart = new Chart(document.getElementById('myChart'), {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: data.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
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
var message = {
    data : datos
}
  socket.emit('new-graphic', message);
  return false;
}
