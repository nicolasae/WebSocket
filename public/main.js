//******************************************************** */
//******************************************************** */
//******************************************************** */
//******************************************************** */
//******************************************************** */
/*conectamos el cliente con el servidor de websocket*/
var socket = io.connect('http://localhost:8080',{'forceNew':true});


var set = []
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
    var data1 = [];
    var author1=[];
    var data2 = [];
    var author2 = [];
    author1.push(message.labels[1]);
    for(const i in message.labels){
       if (message.labels[i]== author1[0]) {
           data1.push(message.data[i]);
           author1.push(message.labels[i]);
       };
        if (message.labels[i]!= author1[0]) {
            data2.push(message.data[i]);
            author2.push(message.labels[i]);
        };
    };
    author1.pop();
    var ctx = document.getElementById("myChart");
    var ctx2 = document.getElementById("myChart2");
    var ctx3 = document.getElementById("myChart3");
    var myChart = new Chart(ctx ,{
        type: 'line',
        data: {
            labels: message.labels,
            datasets: [{
                label: 'Nuestra primera grafica',
                data: message.data,
                fill: false,
                borderColor: ['rgba(0,255,0, 1)'],
                borderWidth: 1
            }]
        },
    });
    var myChart2 = new Chart(ctx2 ,{
        type: 'line',
        data: {
            labels: author1,
            datasets: [{
                label: 'Grafica de: ',
                data: data1,
                fill: false,
                borderColor: ['rgba(255,0,0, 1)'],
                borderWidth: 1
            }]
        },
    });
    var myChart3 = new Chart(ctx3 ,{
        type: 'line',
        data: {
            labels: author2,
            datasets: [{
                label: 'Nuestra primera grafica',
                data: data2,
                fill: false,
                borderColor: ['rgba(0,0,255, 1)'],
                borderWidth: 1
            }]
        },
    });
    //return <div className="chartjs-wrapper"><canvas id="myChart" className="chartjs"></canvas></div>;
}

function render (data) {
    var html = data.map(function(elem, index) {
        return(`<div>
                  <strong>${elem.author}</strong>:
                  <strong>${elem.state}</strong>
                </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(state,boton) {
    if (boton == true ){
        var message = {
            state: state,
            author: document.getElementById('autor').value
        };  
    }else {
      var message = {
          state: document.getElementById('numero').value,
          author: document.getElementById('autor').value
    }};
    
    socket.emit('new-message', message);
    return false;
}


function makegraphic() {
    var data = {
        data: [],
        labels: []
    };
    for(const i in set){
        data.data.push(set[i].state);
        data.labels.push((set[i].author))
    }
    console.log(data)

  socket.emit('new-graphic', data);
  return false;
}
