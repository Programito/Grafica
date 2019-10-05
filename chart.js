var temps = 10000;
var activo= true;
var tamany = "60%";
var interval;
function recargarAll(){
    recargar("container","freq");
    recargar("container2","freq2");
    recargar("container3","freq3");
    recargar("container4","freq4");
    recargar("container5","freq5");
    
    interval= setInterval(function(){ 
                        if(activo) {
                            recargar("container2","freq2");
                            recargar("container3","freq3");
                            recargar("container4","freq4");
                            recargar("container5","freq5");}
                }, temps);
}
function recargar(container,freq){

    var objJson = createJson();
    cargarTable(objJson,freq);

    var title = "Nuevo";
    var subtitle = 'Source: or.water.usgs.gov2';
    Highcharts.chart(container, {
        data: {
            table: freq,
            startRow: 1,
            endRow: 7,
            endColumn: 10
        },
    
        chart: {
            polar: true,
            type: 'column',
           
        },
    
        title: {
            text: title
        },
    
        subtitle: {
            text: subtitle
        },
    
        pane: {
            size: tamany
        },
    
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },
    
        xAxis: {
            tickmarkPlacement: 'on'
        },
    
        yAxis: {
            min: 1,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: 'Frequency (%)'
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            reversedStacks: false
        },
    
        tooltip: {
            valueSuffix: '%'
        },
    
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        }
    });

    
    
}


function createJson(){
    var jsonString = '{"timestamp": "2019-10-05 T 10:20 UTC","IP": "190.162.170.29","Pais": "Andorra"}';
    jsonString = `{"timestamp": "2019-10-05 T 10:20 UTC",
                    "IP": "190.162.170.29",
                    "pais": "${randomCountry()}",
                    "partida": [
                        {"moviment1": ${random10()} },
                        {"moviment2": ${random10()} },
                        {"moviment3": ${random10()} },
                        {"moviment4": ${random10()} },
                        {"moviment5": ${random10()} },
                        {"moviment6": ${random10()} }
                    ]}`;
    
    writeTextArea(jsonString);
    //console.log(jsonString);
    //console.log(JSON.parse(jsonString));
    return(JSON.parse(jsonString));
    // console.log(JSON.parse(jsonString).partida[0].moviment1[2]); 
    // timestamp, IP, pais, llengua, dades del jugador,
}

// random del 1 al 10
function random(){
    var random = Math.random() * (10 -1) + +1;
    return random;
}

// 10 randoms para el json
function random10(){
    var randomArr = "[";
    for(var i=0; i< 10; i++){
        randomArr += random();
        if(i<9){
            randomArr += ',';
        }
    }
    randomArr += ']';
    return randomArr;
    
}

// random pais
function randomCountry(){
    var paises = ['Andorra','Portugal','Espanya','Alemanya','Estats Units'];
    return paises[Math.floor(Math.random() * (5))];
}

function cargarTable(objJson,freq){

   

    document.getElementById(freq).innerHTML = ` <tr nowrap bgcolor="#CCCCFF">
    <th colspan="9" class="hdr">Moviments partida</th>
</tr>
<tr nowrap bgcolor="#CCCCFF">
    <th class="freq">Moviments</th>
    <th class="freq">&lt; 2</th>
    <th class="freq">2</th>
    <th class="freq">3</th>
    <th class="freq">4</th>
    <th class="freq">5</th>
    <th class="freq">6</th>
    <th class="freq">7</th>
    <th class="freq">8</th>
    <th class="freq">9</th>
    <th class="freq">&gt; 9</th>
    <th class="freq">Total</th>
</tr>
<tr nowrap>
    <td class="dir">Moviment1</td>
    ${crearNodos(objJson.partida[0].moviment1)}
    <td class="data">${calTotal(objJson.partida[0].moviment1)}</td>
</tr>        
<tr nowrap bgcolor="#DDDDDD">
    <td class="dir">Moviment2</td>
    ${crearNodos(objJson.partida[1].moviment2)}
    <td class="data">${calTotal(objJson.partida[1].moviment2)}</td>
</tr>
<tr nowrap>
    <td class="dir">Moviment3</td>
    ${crearNodos(objJson.partida[2].moviment3)}
    <td class="data">${calTotal(objJson.partida[2].moviment3)}</td>
</tr>
<tr nowrap bgcolor="#DDDDDD">
    <td class="dir">Moviment4</td>
    ${crearNodos(objJson.partida[3].moviment4)}
    <td class="data">${calTotal(objJson.partida[3].moviment4)}</td>
</tr>
<tr nowrap>
    <td class="dir">Moviment5</td>
    ${crearNodos(objJson.partida[4].moviment5)}
    <td class="data">${calTotal(objJson.partida[4].moviment5)}</td>
</tr>
<tr nowrap bgcolor="#DDDDDD">
    <td class="dir">Moviment6</td>
    ${crearNodos(objJson.partida[5].moviment6)}
    <td class="data">${calTotal(objJson.partida[5].moviment6)}</td>
</tr>`;

}

// calcula el total para cada <td>
function calTotal(movArray){
    var total = 0
    for(var i=0;i<10;i++){
        total += movArray[i]
    }
    return total;
}

// calcula los 10 valores para el nodo
function crearNodos(movArray){
    var nodo= "";
    for(var i=0;i<10;i++){
        nodo += `<td class="data"> ${movArray[i]}</td>`
    }
    return nodo;
}

function writeTextArea(texto){
    document.getElementById("textArea").value = texto;
}


function stop(){
    activo = !activo;
    if(activo){
        document.getElementById("stopButton").innerText="Stop Recarga";
        document.getElementById("stopButton").className= "btn btn-danger";
    }else{
        document.getElementById("stopButton").innerText="Activar Recarga";
        document.getElementById("stopButton").className= "btn btn-primary";
    }
}

function modificarDades(){
    if(document.getElementById("tempsInput").value != "Introdueix segons per carregar:" ){
        temps=  parseInt(document.getElementById("tempsInput").value) * 1000;
        clearInterval(interval);
        console.log(`El interval es ${temps}ms`);
        recargarAll();
    }
    if(document.getElementById("tamanyInput").value != "Introdueix el % de tamany" ){
        tamany=  parseInt(document.getElementById("tamanyInput").value) + "%";
        console.log(`El % de tamany es ${tamany}`);
    }
}

// modifica el container amb les dades del area text
function modificar(){
    texto= document.getElementById("textArea").value;
    
    cargarTable(JSON.parse(texto),"freq");

    var title = "Nuevo2";
    var subtitle = 'Source: or.water.usgs.gov2';
    Highcharts.chart("container", {
        data: {
            table: freq,
            startRow: 1,
            endRow: 7,
            endColumn: 10
        },
    
        chart: {
            polar: true,
            type: 'column',
           
        },
    
        title: {
            text: title
        },
    
        subtitle: {
            text: subtitle
        },
    
        pane: {
            size: tamany
        },
    
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },
    
        xAxis: {
            tickmarkPlacement: 'on'
        },
    
        yAxis: {
            min: 1,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: 'Frequency (%)'
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            reversedStacks: false
        },
    
        tooltip: {
            valueSuffix: '%'
        },
    
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        }
    });

    console.log("modificado");

}