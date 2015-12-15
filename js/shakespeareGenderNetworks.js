var diameter = 600;
var radius = diameter / 2;
var margin = 55;
var pad = margin / 2;

/*
 * Calculates circular node layout, adding an "x" and "y" attribute to each
 * node. Assumes (0, 0) is in the upper-left corner, and translates positions
 * by (radius, radius).
 */
function circleLayout(nodes, radius) {
    // use to scale node index to theta value
    var polar = d3.scale.linear()
        .domain([0, nodes.length])
        .range([0, 2 * Math.PI]);

    // calculate theta for each node
    nodes.forEach(function(d, i) {
        // calculate polar coordinates
        var theta  = polar(i);
        // convert to cartesian coordinates
        // and shift by radius to center circle
        
        d.x = radius * Math.sin(theta)+radius; 
        d.y = radius * Math.cos(theta)+radius; 
    });
}

/*
 * Draws nodes with tooltips (using addTooltip.js), using the "group" attribute
 * to assign fill color. Requires an identifier to where the nodes should be
 * appended (such as an SVG group or image). Will have class "node" for style.
 */

 function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

function drawNodes(graph, container) {
    // used to assign nodes color by group
    var color = d3.scale.category20(); 

    // create a mapping from node id to name
    var indexToName = {};
    graph.nodes.forEach(function(d, i){
      indexToName[i] = d.name;
    });

    // create a hash table with structure:
    // i,j === 1 if i and j (node ids) are joined
    // else i,j = 0 
    // also, create a mapping from each node id to the
    // linkids that connect to that node
    var linkedByIndex = {};
    var nodeToLinks = {};
    graph.links.forEach(function(d, i){
      linkedByIndex[d.source.name + "," + d.target.name] = 1; 
      // for each source and target, if that node isn't
      // in the nodeToLinks hashmap, add it and initialize
      // its value to a one member array, where that member is
      // the index of the current link index; otherwise, add the
      // link index to the hashmap for the given node
      if (typeof nodeToLinks[d.source.name] != "undefined") {
        nodeToLinks[d.source.name].push(i);
      } 
      else {
        nodeToLinks[d.source.name] = [i];
      }
      if (typeof nodeToLinks[d.target.name] != "undefined") {
        nodeToLinks[d.target.name].push(i);
      } 
      else {
        nodeToLinks[d.target.name] = [i];
      }
    });

    // create a function that reads in two nodes and
    // returns 1 if those two nodes are connected
    function neighboring(a, b) {
      return linkedByIndex[a + "," + b];
    };
 
    function mouseoverNode(d, i) {
      addTooltip(d3.select(this))
      d3.selectAll(".node").attr("opacity", function(o) {
        if (o != d) {
          if (neighboring(d.name, o.name)) {
            addTooltip(d3.select(this));
            return 1;
          } else if (neighboring(o.name, d.name)) {
            addTooltip(d3.select(this));
            return 1;
          } else {
            return .1
          }
        }
      });

      d3.selectAll(".link").attr("opacity", function(l, i) {
        if (containsObject(i, nodeToLinks[d.name])) {
          return 1;
        } else {
          return .1;
        }
      });   
     }; 

       
    function mouseoutNode(d, i) {
      d3.selectAll("#tooltip").remove()
      d3.selectAll(".node").attr("opacity",1)
      d3.selectAll(".link").attr("opacity", 1)
    };   

    d3.select(container).selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("id", function(d, i) { return d.name; })
        .attr("cx", function(d, i) { return d.x; })
        .attr("cy", function(d, i) { return d.y; })
        .attr("r", function(d) { return Math.log(d.words) })
        .style("fill",   function(d, i) { return color(d.group); })
        .on("mouseover", mouseoverNode)
        .on("mouseout", mouseoutNode)            
}

function drawGraph(graph) { 
    // create svg image
    var svg  = d3.select("body").select("#shakespeareGenderNetwork")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter);

    // create plot area within svg image
    var plot = svg.append("g")
        .attr("transform", "translate(" + pad + ", " + pad + ")")
        .attr("id", "plot");

    // fix graph links to map to objects instead of indices
    graph.links.forEach(function(d, i) {
        d.source = isNaN(d.source) ? d.source : graph.nodes[d.source];
        d.target = isNaN(d.target) ? d.target : graph.nodes[d.target];
    });

    // sort nodes by group
    graph.nodes.sort(function(a, b) {
        return a.group - b.group;
    });

    // calculate node positions
    circleLayout(graph.nodes, radius - margin);

    // break edges into multiple segments
    bundles = generateSegments(graph);

    // use force-directed layout to bundle edge segments
    var layout = d3.layout.force()
        .size([diameter, diameter])
        .charge(0.1)
        .gravity(0)
        .linkDistance(0)
        .nodes(bundles.nodes)
        .links(bundles.links)
        .start()
 
    // want line segments drawn smoothly
    // use line generator with basis interpolation
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) {if(d.x<0 || d.x > diameter) {d.x=diameter} return d.x; })
        .y(function(d) {if(d.y<0 || d.y > diameter) {d.y=diameter} return d.y; });
        
    // draw edges
    d3.select("#plot").selectAll(".link")
        .data(bundles.paths)
        .enter()
        .append("path")
        .attr("d", line)
        .attr("class", "link")

    // draw nodes
    drawNodes(graph, "#plot");

    // update display every layout tick
    layout.on("tick", function() {
        d3.select("#plot")
            .selectAll(".link")
            .attr("d", line);

        d3.select("#plot")
            .selectAll(".node")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
  ;});
}

// Must be a better way to do this without duplicating links and paths
function generateSegments(graph) {
    var nodes = []; // needed for force directed layout
    var links = []; // needed for force directed layout
    var paths = []; // needed for drawing smooth paths

    // number of segments depends on distance of nodes
    var numNodes = d3.scale.linear()
        .domain([0, diameter])
        .range([5, 25]);

    graph.links.forEach(function(d, i) {
        // distance between nodes
        var dist = Math.sqrt(
            Math.pow(d.target.x - d.source.x, 2) +
            Math.pow(d.target.y - d.source.y, 2));

        // start index
        var start = nodes.length;
        var total = Math.round(numNodes(dist));

        // use to calculate nodes between source and target
        var xscale = d3.scale.linear()
            .domain([0, total + 1])
            .range([d.source.x, d.target.x]);

        var yscale = d3.scale.linear()
            .domain([0, total + 1])
            .range([d.source.y, d.target.y]);

        // collect all nodes into a local path
        var local = [];

        // push source node
        var start = {x: d.source.x, y: d.source.y, fixed: true};
        nodes.push(start);
        local.push(start);

        // push middle nodes
        for (var j = 1; j <= total; j++) {
            var node = {
                x: xscale(j),
                y: yscale(j)
            };

            local.push(node);
            nodes.push(node);
            links.push({
                source: nodes[nodes.length - 2],
                target: nodes[nodes.length - 1]
            });
        }

        // push target node
        var target = {x: d.target.x, y: d.target.y, fixed: true};
        local.push(target)
        nodes.push(target);
        links.push({
            source: nodes[nodes.length - 2],
            target: nodes[nodes.length - 1]
        });

        paths.push(local);
    }); 
    
    return {nodes: nodes, links: links, paths: paths};
}
