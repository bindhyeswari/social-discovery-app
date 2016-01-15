/**
 * Created by administrator on 1/8/16.
 */

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

/*draw(250,'.circle2');
draw(350,'.circle3');
draw(450,'.circle4');
draw(550,'.circle5');
draw(600,'.circle1');
draw(600,'.circle2');
draw(600,'.circle3');
draw(600,'.circle4');
draw(600,'.circle5');*/


var data = {
    "countries_msg_vol": {
        "CA": 65, "US": 700, "CU": 55, "BR": 400, "MX": 290,
        "CP": 5, "ZX": 20, "CQ": 200, "jj": 110, "NG": 234,
        "TT": 100, "LL": 10, "GG": 70, "WW": 234, "YY": 280,
        "EE": 2, "KK": 5, "UU": 5, "SS": 90, "RR": 8
    }
};


$(window).load(function() {
    console.log("on load function...");
    draw(600,'.circle1');
});

function draw(diameter,circleid) {
    console.log("diameter of bubble "+diameter);
  /*  var data;
    d3.json("test.json", function(error, json) {
        if (error) return console.warn(error);
        data = json;
        console.log(data)
    });*/

    var drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", dragstarted)
        .on("drag", dragged)
        .on("dragend", dragended);

    function dragstarted(d) {
        console.log("drag started");
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
      //  force.start();
       // g.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    }

    function dragged(d) {
        console.log("dragging");
      //  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
        d.x = d3.event.x
        d.y = d3.event.y
      //  console.log(d.x+' '+ d.y);
        cx= d.x;
        cy= d.y;
        d3.select(this).attr("transform", function(d){return "translate(" + [d.x, d.y ] + ")"});
      /*  d3.select(this).attr("cx",function(d){return d.x});
        d3.select(this).attr("cy",function(d){return d.y});
        d3.select(this).attr("class",function(d){return d.className});*/
     //   force.start();

    }

    function dragended(d) {
        console.log("drag ended");
        d3.select(this).classed("dragging", false);
    }

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);

    function zoomed() {
        console.log("zooming...");
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    var svg = d3.select(circleid).append('svg')
        .attr('width', 900)
        .attr('height', 600)
        .attr('id',circleid)
        .call(zoom);


    /*   var force = d3.layout.force()
           .charge(-120)
           .gravity(0)
           .size([900,600]);*/

/*    force
        .nodes(data)
        .start();*/

    var bubble = d3.layout.pack()
        .size([diameter, diameter])
        .sort(function(a, b) {
            return -(a.value - b.value);
        })
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



    var g=vis.enter().append("g")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .call(drag)



    g.append("text")
        .transition().delay(300).duration(1000)
        .attr("x",function(d){return d.x-10})
        .attr("y",function(d){return d.y })
        .text(function(d){return d.name});

    var circle=g.append('circle')
        .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })
        .attr("r", function (d) { return d.r/8; })
        .attr('fill-opacity', function (d) {
            return 0.75;
        })
        .attr('class', function (d) {
            return d.className;
        })
        .each(bubbleOut);

    function bubbleOut(){
        var circle= g.selectAll('circle')
            .transition().delay(300).duration(1000)
            .attr("r",function (d) { return d.r; })
    }

 /*   force.on("tick", function() {
        console.log("force fn");
        g.attr("cx", function(d) { return d.x; })
        g.attr("cy", function(d) { return d.y; })
    });*/
}