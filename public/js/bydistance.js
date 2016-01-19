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

        "CA": 65, "US": 700, "CU": 55, "BR": 400, "MX": 290,
        "CP": 5, "ZX": 20, "CQ": 200, "jj": 110, "NG": 234,
        "TT": 100, "LL": 10, "GG": 70, "WW": 234, "YY": 280,
        "EE": 2, "KK": 5, "UU": 5, "SS": 90, "RR": 8

};

var maxRadius=12;
var padding=6;

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
     //   force.start();

    }

    function dragged(d) {
        console.log("dragging");
        d.x = d3.event.x
        d.y = d3.event.y
        d3.selectAll("circle").attr("transform", function(d){return "translate(" + [d.x, d.y ] + ")"});
      //  d3.select(this).attr("cx", d.x).attr("cy", d.y);

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
      //  .call(zoom);

    var jitter=0.5;


/*
    function tick(e) {
      //  console.log("tick function");
            var dampenedAlpha=e.alpha * 0.2;
        g.
            each(gravity(dampenedAlpha))
            .each(collide(jitter))
      /!*      .attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            })*!/
           .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }
*/


    function gravity(alpha) {
    //    console.log("gravity function");
        return function(d) {
            d.x += (d.cx - d.x)  * alpha;
            d.y += (d.cy - d.y) * alpha;
        }
    };


    function collide(alpha) {
    //    console.log("collide function");

        var quadtree = d3.geom.quadtree(data);
        return function(d) {
        //    console.log(d.size);
            var r = d.size + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.size + quad.point.size;
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }

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
        var obj = data;
        var newDataSet = [];
        for (var prop in obj) {
            newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
        }
        return {children: newDataSet};
    }

    var newData=processData(data);


    var nodes = bubble.nodes(newData)
        .filter(function (d) {
            return !d.children;
        });

    var vis = svg.selectAll('circle')
        .data(nodes, function (d) {
            return d.name;
        });

    var g=vis.enter().append("g")
        .attr("class","node")
      //  .attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";});
      .attr("cx", function(d) { return d.x; }).attr("cy", function(d) { return d.y; })

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

    var force = d3.layout.force()
        .nodes(newData)
        .size([900,600])
        .gravity(0.05)
        .charge(10)
        .on("tick", tick)
        .start();


    var gele = g.selectAll(".node")
        .data(newData)
        .call(force.drag);

    function tick() {
        console.log("tick function");
        gele.attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";});
    };


    function bubbleOut(){
        var circle= g.selectAll('circle')
            .transition().delay(300).duration(1000)
            .attr("r",function (d) { return d.r; })
    }




    /*
     g.on("mouseover",function(d){
     console.log("mouse over");
     });
     */

    /*
     g.on("mouseout",function(d){
     console.log("mouse out");
     });
     */



}