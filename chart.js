var temps = 10000;
var activo= true;
var tamany = "60%";
var interval;
var estil = false;
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

    var objJson = createJson(container);
    cargarTable(objJson,freq);
    if(!estil){
        CreateHighcharts(objJson,freq,container);
    }else {
        CreateHighcharts2(objJson,freq,container);
    }
    

}


function createJson(container){

    var jsonString = `{ "user": "${randomString()}",
                    "timestamp": "2019-10-05 T 10:20 UTC",
                    "IP": "${randomIP()}",
                    "pais": "${randomCountry()}",
                    "partida": [
                        {"moviment1": ${random10()} },
                        {"moviment2": ${random10()} },
                        {"moviment3": ${random10()} },
                        {"moviment4": ${random10()} },
                        {"moviment5": ${random10()} },
                        {"moviment6": ${random10()} }
                    ]}`;
    if(container === "container"){
        writeTextArea(jsonString);
    }
    return(JSON.parse(jsonString));
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

// random string 
function randomString() {
    var random = Math.random() * (15 -8) + +8;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < random; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 // random ip
 function randomIP(){
     return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0);
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
    if(document.getElementById("tempsInput").value != "Introdueix segons per carregar:" && document.getElementById("tempsInput").value != ""  ){
        temps=  parseInt(document.getElementById("tempsInput").value) * 1000;
        clearInterval(interval);
        console.log(`El interval es ${temps}ms`);
        recargarAll();
    }
    if(document.getElementById("tamanyInput").value != "Introdueix el % de tamany" && document.getElementById("tamanyInput").value != ""  ){
        tamany=  parseInt(document.getElementById("tamanyInput").value) + "%";
        console.log(`El % de tamany es ${tamany}`);
    }
}



// modifica el container amb les dades del area text
function modificar(){
    texto= document.getElementById("textArea").value;
    var objJson = JSON.parse(texto);
    cargarTable(objJson,"freq");
    CreateHighcharts(objJson,"freq", "container");

    console.log("modificado");

}

function CreateHighcharts(objJson,freq, container){
    var title = objJson.user;
    var subtitle = `${objJson.IP} (${objJson.pais})`;

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

function CreateHighcharts2(objJson,freq, container){

    var title = objJson.user;
    var subtitle = `${objJson.IP} (${objJson.pais})`;

Highcharts.chart(container, {
    data: {
        table: freq,
        startRow: 1,
        endRow: 7,
        endColumn: 10
    },

    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],

    chart: {
        polar: true,
        type: 'column',
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
    },

    title: {
        text: title,
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },

    subtitle: {
        text: subtitle,
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },

    pane: {
        size: tamany
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },

    xAxis: {
        tickmarkPlacement: 'on',
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'

            }
        }
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
        reversedStacks: false,
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },

    tooltip: {
        valueSuffix: '%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },

    credits: {
        style: {
            color: '#666'
        }
    },

    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },

    labels: {
        style: {
            color: '#707073'
        }
    },



    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        },
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },

    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on',
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    }
});
}


function changeStyle() {
   estil = !estil;
   if(!estil){
        document.getElementById("styleButton").innerText="Estil Dark Unica";
        document.getElementById("styleButton").className= "btn btn-dark text-white";
    }else{
        document.getElementById("styleButton").innerText="Estil Default";
        document.getElementById("styleButton").className= "btn btn-primary text-dark";
    }

    clearInterval(interval);
    recargarAll();

}