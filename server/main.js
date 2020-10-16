var express = require('express');
var app = express();
/*El servidor viene por defecto
El framework es express*/ 
var server = require ('http').Server(app);
var io = require ('socket.io')(server);


app.use(express.static('public'))

/*Prueba*/
app.get('/',function(req,res){
    res.status(200).send('Hola mundo');
});

/*con el comando on se le dice que escuche algo del navegador o del serivor*/
io.on('connection',function(socket){
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages',{
        id:1,
        text:"Hola soy un mensaje",

    })
});


/*Se verifica el funcionamiento del servidor, puerto 8080*/
server.listen(8080,function(){
    console.log('Servidor corriendo en http://localhost:8080')
});