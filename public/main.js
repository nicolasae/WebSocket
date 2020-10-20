//var Chart = require('chart.js');
/*conectamos el cliente con el servidor de websocket*/
var socket = io.connect('http://localhost:8080',{'forceNew':true});

var set = []
var users = []
var nombre = false

/*recibiendo mensajes*/
socket.on('messages',function(messages){
    console.log(messages);
    set = messages;
    //console.log(set);
    render(messages);
    //console.log(typeof data.state)
});

socket.on('graphic',function(messages){
    //console.log(messages.data);
    graficador(messages);
});
function graficador(message){
    var labels01 = [];
    for(var i = 0; i < messages.length; i++){
        labels01.push(String(messages[i]))
    };
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx ,{
        type: 'line',
        data: {
            labels: message.labels,
            datasets: [{
                label: 'Nuestra primera grafica',
                data: message.data,
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
    //return <div className="chartjs-wrapper"><canvas id="myChart" className="chartjs"></canvas></div>;
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
    }};
    
    socket.emit('new-message', message);
    return false;
}

function ususarios(respuesta){
    users.push(respuesta);
};

function makegraphic() {
    var data = {
        data: [],
        labels: []
    };
    for(const i in set){
        data.data.push(set[i].state);
        data.labels.push(String(set[i].state))
    }
    console.log(data)

  socket.emit('new-graphic', data);
  return false;
}
