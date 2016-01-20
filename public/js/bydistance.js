/**
 * Created by administrator on 1/8/16.
 */

var data = {

        "CA": 65, "US": 700, "CU": 55, "BR": 400, "MX": 290,
        "CP": 5, "ZX": 20, "CQ": 200, "jj": 110, "NG": 234,
        "TT": 100, "LL": 10, "GG": 70, "WW": 234, "YY": 280,
        "EE": 2, "KK": 5, "UU": 5, "SS": 90, "RR": 8,"current":40

};

var maxRadius=12;
var padding=6;

var width=900,height=600;

$(window).load(function() {
    console.log("on load function...");
    d3.json("../js/test.json",function(error,root) {
        if (error) throw error;
        draw(root);
    });
  //  draw();

});

function draw(root) {
  //  console.log("diameter of bubble "+diameter);

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
        d3.selectAll("text").attr("transform", function(d){return "translate(" + [d.x, d.y ] + ")"});
    }

    function dragended(d) {
        console.log("drag ended");
        d3.select(this).classed("dragging", false);
    }

/*
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);

    function zoomed() {
        console.log("zooming...");
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }
*/

    var svg = d3.select(".box").append('svg')
        .attr('width', width)
        .attr('height', height);

    var bubble = d3.layout.pack()
        .size([width, height])
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
            newDataSet.push({name: obj[prop].name, className: obj[prop].name.toLowerCase(), size: obj[prop].size});
        }
        return {children: newDataSet};
    };


    var newData=processData(root);
   // var newData=processData();

    var nodes = bubble.nodes(newData)
        .filter(function (d) {
            return !d.children;
        });

    console.log(nodes);

    var vis = svg.selectAll('circle')
        .data(nodes, function (d) {
            return d.name;
        });

    var g=vis.enter().append("g")
        .attr("class","node")
      //  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      /*  .on("dblclick",function(d){
            console.log("double clicked", d.name)
            d.x= d.x/2;
            d.y= d.y/2;
        }).attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
*/
    // .call(zoom);


    g.append("text")
      //  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .transition().delay(300).duration(1000)
        .text(function(d){return d.name})


    var circle=g.append('circle')
     //   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("r", function (d) {

            return d.r/8;
        })
        .attr('fill-opacity', function (d) {
            return 0.75;
        })
        .attr('class', function (d) {
            return d.className;
        })
        .each(bubbleOut);


    var force = d3.layout.force()
        .nodes(nodes)
        .size([width,height])
       // .gravity(0.1)
      //   .charge(0.9)
        .on("tick", tick)
        .start();


     var gele = svg.selectAll("g").data(nodes)
                .call(force.drag)
             //   .call(drag);



    function tick(e) {
        gele
          //.each(gravity(0.2*e.alpha))
           .each(collide(1))
            .attr("transform", function (d) {
               return "translate(" + d.x + "," + d.y + ")";
           })

    }

    // Move nodes toward cluster focus.
    function gravity(alpha) {
        return function (d) {
            d.y += (d.py - d.y) * alpha;
            d.x += (d.px - d.x) * alpha;
        };

    }

    // Resolve collisions between nodes.
    function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function (d) {
            var r = d.r + 12 + 6,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function (quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.r + quad.point.r;
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


    function bubbleOut(){
        var circle= g.selectAll('circle')
            .transition().delay(300).duration(1000)
            .attr("r",function (d) { return d.r; })
    }



   /*  g.on("mouseover",function(d){
         console.log("mouse over");
     });


     g.on("mouseout",function(d){
     console.log("mouse out");
     });*/


}