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
    io.sockets.emit('graphic', data )
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


/*Se verifica el funcionamiento del servidor, puerto 8080*/
server.listen(8080,function(){
    console.log('Servidor corriendo en http://localhost:8080')
});