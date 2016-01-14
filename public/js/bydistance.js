/**
 * Created by administrator on 1/8/16.
 */
var arr1=["watching movie","hiking","drinking"];
var arr2=["playing tennis","watching movie","hiking"];
var arr3=["eating out","playing cricket","drinking"];



/*var eventDiv1=docu
ment.createElement('div');
eventDiv1.className='event';
document.getElementById("circle1").appendChild(eventDiv1);

var eventDiv2=document.createElement('div');
eventDiv2.className='event';
document.getElementById("circle1").appendChild(eventDiv2);


var eventDiv3=document.createElement('div');
eventDiv3.className='event';
document.getElementById("circle3").appendChild(eventDiv3);


var eventDiv4=document.createElement('div');
eventDiv4.className='event';
document.getElementById("circle5").appendChild(eventDiv4);

var eventDiv = new Array();
for(var i=0;i<220;i++){
    eventDiv[i]=document.createElement('div');
    eventDiv[i].className='event';
    document.getElementById("circle3").appendChild(eventDiv[i]);

}
*/

var data = {
    "countries_msg_vol": {
        "CA": 300, "US": 300, "CU": 300, "BR": 300, "MX": 300,
        "CP": 300, "ZX": 300, "CQ": 300, "RR": 300, "NX": 300,
        "TT": 300, "LL": 300, "GG": 300, "WW": 300, "YY": 300,
        "EE": 300, "KK": 300, "UU": 300, "SS": 300, "RR": 300,
        "Other": 300
    }
};
draw(150,'.circle1');
draw(250,'.circle2');
draw(350,'.circle3');
draw(450,'.circle4');
draw(550,'.circle5');
draw(600,'.circle1');/*
draw(600,'.circle2');
draw(600,'.circle3');
draw(600,'.circle4');
draw(600,'.circle5');*/



function update(value,id,action){
    console.log("updating")
    if(action === "remove") {
        document.getElementById(id).style.display = 'none';
    }else{
        document.getElementById(id).style.display = '';
    }

}



function draw(diameter,circleid) {
    console.log("diameter is "+diameter);

    var svg = d3.select(circleid).append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .attr('id',circleid);

    var bubble = d3.layout.pack()
        .size([diameter, diameter])
        .value(function (d) {
            return d.size;
        })
        .padding(0);

    function processData(data) {
        var obj = data.countries_msg_vol;
        var newDataSet = [];
        for (var prop in obj) {
            newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
        }
        return {children: newDataSet};
    }

    var nodes = bubble.nodes(processData(data))
        .filter(function (d) {
            return !d.children;
        });

    var vis = svg.selectAll('circle')
        .data(nodes, function (d) {
            return d.name;
        });


    vis.enter().append('circle')
        .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })
        .attr('r', function (d) {
            return d.r;
        })
        .attr('class', function (d) {
            return d.className;
        });
}