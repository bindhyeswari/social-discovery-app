/**
 * Created by administrator on 1/8/16.
 */

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

    var bubble = d3.layout.pack()
        .size([900, 600])
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
    //    .attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";});
    // .attr("cx", function(d) { return d.x; }).attr("cy", function(d) { return d.y; })

    g.append("text")
        .transition().delay(300).duration(1000)
     //   .attr("x",function(d){return d.x-10})
    //    .attr("y",function(d){return d.y })
        .text(function(d){return d.name});

    var circle=g.append('circle')
       //  .attr("cx", function(d) { return d.x; }).attr("cy", function(d) { return d.y; })

     /*   .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })*/
        .attr("r", function (d) { return d.r/8; })
        .attr('fill-opacity', function (d) {
            return 0.75;
        })
        .attr('class', function (d) {
            return d.className;
        })
        .each(bubbleOut);

    var force = d3.layout.force()
        .nodes(nodes)
        .size([900,600])
        .gravity(0.001)
      //  .charge(0.1)
        .on("tick", tick)
        .start();


    var gele = svg.selectAll("g.node")
        .data(nodes)
        .call(force.drag);

    console.log(gele);

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