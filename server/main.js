var express = require('express');
var app = express();
/*El servidor viene por defecto
El framework es express*/ 
var server = require ('http').Server(app);
var io = require ('socket.io')(server);
var Chart = require ('chart.js');


app.use(express.static('public'))

/*Prueba*/
app.get('/',function(req,res){
    res.status(200).send('Hola mundo');
});
var messages = [{
    state: random(),
    res: 0,
    data: 0
    }];

/*con el comando on se le dice que escuche algo del navegador o del serivor*/
io.on('connection',function(socket){
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages',messages )
    socket.on('new-message', function(data) {
        messages.push(data);    
    io.sockets.emit('messages', messages);
    });
    socket.on('new-graphic', function(data) {
        chart = graficar(data);    
    io.sockets.emit('graphic', chart )
    });
});
function random(res){
if (res == "bajo" ){
    return (randomInt( 500, 1000))
};
if ( res == "alto" ){
    return (randomInt( 1, 500))
};
return (randomInt( 1, 1000));
};

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
};

function graficar(lista){

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: lista,
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
return myChart;
};
/*Se verifica el funcionamiento del servidor, puerto 8080*/
server.listen(8080,function(){
    console.log('Servidor corriendo en http://localhost:8080')
});