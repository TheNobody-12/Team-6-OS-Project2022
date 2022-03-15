/* Creation of Request Queue */

let arr=[]; // creating array for request queue

document.getElementById('add').onclick=inputQueries;


document.getElementById('number').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        inputQueries();
    }
});

function inputQueries(){
    let val=document.getElementById("number").value;
    if(val<0 || val%1!==0 || val==''){
        alert("Please enter a valid number");
        document.getElementById("number").value="";
    }
    else{
        arr.push(val);
        document.querySelector(".request-queue").insertAdjacentText("beforeend",val+",");
        document.getElementById("number").value='';
    }
}


/* Addition of head position value of which is taken from user */

let head_position=0;//inititalising head_position

document.getElementById('headbtn').onclick=addHead;

document.getElementById('starting').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addHead();
    }
});

function addHead(){
    let temp_head=document.getElementById('starting').value;
    
    // console.log(typeof(temp_head));
    
    if(temp_head<0 || temp_head%1!==0 || temp_head==''){
        alert("Please enter a valid number");
        document.getElementById('starting').value="";
    }
    else{
        head_position=temp_head;
    }
}

/* Calling FCFS algorithm on click of Calculate Button */

document.getElementById('cal').onclick=FCFS;

/* The below code is FCFS algorithm and Seekcount algorithm*/


function FCFS(){
    var distance,current_position;
    var seekCount=0;
    for(var i=0;i<arr.length;i++){
        current_position=arr[i];
        distance=Math.abs(current_position-head_position);
        seekCount+=distance;
        head_position=current_position;
    }
    document.getElementById("output").setAttribute('value',seekCount);
}

/* The below code will show the chart on the screen */

document.getElementById('diagram').onclick=showGraphFCFS;
function showGraphFCFS(){
    head=document.getElementById('starting').value;
    var newarray=arr;
    newarray.splice(0,0,head);
    var xAxis=newarray;
    var yAxis=[];
     var j=0;
     for(var i=0;i<arr.length;++i){
         yAxis[i]=j;
         j++;
     }
    new Chart("FCFSchart", {
        type: "line",
        title:{
            text:"Seek sequence graph"
        },
        data: {
          labels: yAxis,
          datasets: [{
              label:'Disk graph',
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgb(255,0,0)",
            data: xAxis
          }]
        },
        options:{
          legend: {display: false},
          scales: {
            yAxes: {
                title: {
                    display: true,
                    text: "Request_Queue →",
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    precision: 0
                }
            },
            xAxes: {
                title: {
                    display: true,
                    text: "Operation Number →",
                    font: {
                        size: 15
                    }
                }
            }
        },
          plugins: {
            legend: {
                display: false
            }
        }
        }
    });
}

/* Now the below code will toggle chart and time seek statement */

/* Here In HTML mutiple class are written and if an event (click on calculate button) occur the other class is getting activate  */
document.querySelector('#cal').addEventListener("click",()=>{
    document.querySelector('.time-seek').classList.toggle('toogle-class');
    document.querySelector('.Chart').classList.toggle('toogle-class');
});