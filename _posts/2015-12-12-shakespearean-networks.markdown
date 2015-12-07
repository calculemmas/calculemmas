---
layout: post
title:  "Small World Networks in Shakespearean Drama"
date:   2015-12-01 10:24:24 -0500
categories: digital-humanities networks
comments: true
---

<style>      
    d3_plot {
      font-size: 80%;
    }
    body.svg {
      margin-left: 0px;
    }
    .background {
      fill: #eee;
    }
    line {
      stroke: #fff;
    }
    text.active {
      fill: red;
    }
    .selection-menu {
      text-align:center;
    }  
    .play-menu {
      margin-right: 20px;
    }
</style>

<script type="text/javascript" src="https://s3.amazonaws.com/duhaime-shakespeare/js/d3.v2.min.js?2.8.1"></script>
<script type="text/javascript" src="https://s3.amazonaws.com/duhaime-shakespeare/js/jquery-1.7.2.min.js"></script>

<aside class="selection-menu" style="margin-top:20px;">
    <p>Play:
       <select class="play-menu form-group select-wrapper form-control" id="selected_json">
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/MND.json'">Midsummer-Nights_Dream</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/AWW.json'">Alls_Well</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Ant.json'">Antony_And_Cleopatra</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Cor.json'">Coriolanus</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Cym.json'">Cymbeline</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Ham.json'">Hamlet</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/JC.json'">Julius_Caesar</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Lr.json'">King_Lear</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/LLL.json'">Loves_Labours_Lost</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Mac.json'">Macbeth</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/MM.json'">Measure_For_Measure</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Ado.json'">Much_Ado</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Oth.json'">Othello</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Per.json'">Pericles</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Rom.json'">Romeo_And_Juliet</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Err.json'">Comedy_Of_Errors</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Jn.json'">King_John</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/MV.json'">Merchant_Of_Venice</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Wiv.json'">Merry_Wives_Of_Windsor</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Shr.json'">Taming_Of_The_Shrew</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tmp.json'">Tempest</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/TGV.json'">Two_Gentlemen_Of_Verona</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/TNK.json'">Two_Noble_Kinsmen</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/WT.json'">Winters_Tale</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tim.json'">Timon_Of_Athens</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tit.json'">Titus_Andronicus</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tro.json'">Troilus_And_Cressida</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/TN.json'">Twelfth_Night</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/R2.json'">King_Richard_II</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/R3.json'">King_Richard_III</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/1H4.json'">Henry_IV_i</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/2H4.json'">Henry_IV_ii</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/H5.json'">King_Henry_V</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/1H6.json'">Henry_VI_i</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/2H6.json'">Henry_VI_ii</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/3H6.json'">Henry_VI_iii</option>
        </select>   
    
    Order:
        <select id="order">
            <option value="name">by Name</option>
            <option value="count">by Frequency</option>
            <option value="group">by Cluster</option>
        </select>


<d3_plot></d3_plot>

<script>

    function select_json(new_json) {

    var margin = {
            top: 160,
            right: 0,
            bottom: 10,
            left: 200
        },
        width = 700;
        height = 700;

    var x = d3.scale.ordinal().rangeBands([0, width]),
        z = d3.scale.linear().domain([0, 4]).clamp(true),
        c = d3.scale.category10().domain(d3.range(10));

    var svg = d3.select("d3_plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .attr("display", "block")
        .attr("overflow-y", "hidden")
    .style("margin-left", "-160px")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    
    
        // Based on the user-selected input text above, make the appropriate api call and retrieve the json 
        d3.json(new_json, function(play_object) {

            console.log(new_json)

            var matrix = [],
                nodes = play_object.nodes,
                n = nodes.length;

            // Compute index per node.
            nodes.forEach(function(node, i) {
                node.index = i;
                node.count = 0;
                matrix[i] = d3.range(n).map(function(j) {
                    return {
                        x: j,
                        y: i,
                        z: 0
                    };
                });
            });

            // Convert links to matrix; count character occurrences.
            play_object.links.forEach(function(link) {
                matrix[link.source][link.target].z += link.value;
                matrix[link.target][link.source].z += link.value;
                matrix[link.source][link.source].z += link.value;
                matrix[link.target][link.target].z += link.value;
                nodes[link.source].count += link.value;
                nodes[link.target].count += link.value;
            });

            // Precompute the orders.
            var orders = {
                name: d3.range(n).sort(function(a, b) {
                    return d3.ascending(nodes[a].name, nodes[b].name);
                }),
                count: d3.range(n).sort(function(a, b) {
                    return nodes[b].count - nodes[a].count;
                }),
                group: d3.range(n).sort(function(a, b) {
                    return nodes[b].group - nodes[a].group;
                })
            };

            // The default sort order.
            x.domain(orders.name);

            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height);

            var row = svg.selectAll(".row")
                .data(matrix)
                .enter().append("g")
                .attr("class", "row")
                .attr("transform", function(d, i) {
                    return "translate(0," + x(i) + ")";
                })
                .each(row);

            row.append("line")
                .attr("x2", width);

            row.append("text")
                .attr("x", -6)
                .attr("y", x.rangeBand() / 2)
                .attr("dy", ".32em")
                .attr("text-anchor", "end")
                .text(function(d, i) {
                    return nodes[i].name;
                });

            var column = svg.selectAll(".column")
                .data(matrix)
                .enter().append("g")
                .attr("class", "column")
                .attr("transform", function(d, i) {
                    return "translate(" + x(i) + ")rotate(-90)";
                });

            column.append("line")
                .attr("x1", -width);

            column.append("text")
                .attr("x", 6)
                .attr("y", x.rangeBand() / 2)
                .attr("dy", ".32em")
                .attr("text-anchor", "start")
                .text(function(d, i) {
                    return nodes[i].name;
                });

            function row(row) {
                var cell = d3.select(this).selectAll(".cell")
                    .data(row.filter(function(d) {
                        return d.z;
                    }))
                    .enter().append("rect")
                    .attr("class", "cell")
                    .attr("x", function(d) {
                        return x(d.x);
                    })
                    .attr("width", x.rangeBand())
                    .attr("height", x.rangeBand())
                    .style("fill-opacity", function(d) {
                        return z(d.z);
                    })
                    .style("fill", function(d) {
                        return nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null;
                    })
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout);
            }

            function mouseover(p) {
                d3.selectAll(".row text").classed("active", function(d, i) {
                    return i == p.y;
                });
                d3.selectAll(".column text").classed("active", function(d, i) {
                    return i == p.x;
                });
            }

            function mouseout() {
                d3.selectAll("text").classed("active", false);
            }

            d3.select("#order").on("change", function() {
                clearTimeout(timeout);
                order(this.value);
            });

            function order(value) {
                x.domain(orders[value]);

                var t = svg.transition().duration(2500);

                t.selectAll(".row")
                    .delay(function(d, i) {
                        return x(i) * 4;
                    })
                    .attr("transform", function(d, i) {
                        return "translate(0," + x(i) + ")";
                    })
                    .selectAll(".cell")
                    .delay(function(d) {
                        return x(d.x) * 4;
                    })
                    .attr("x", function(d) {
                        return x(d.x);
                    });

                t.selectAll(".column")
                    .delay(function(d, i) {
                        return x(i) * 4;
                    })
                    .attr("transform", function(d, i) {
                        return "translate(" + x(i) + ")rotate(-90)";
                    });
            }

            var timeout = setTimeout(function() {
                order("group");
                d3.select("#order").property("selectedIndex", 2).node().focus();
            }, 50000000);
        });
    }

    // set initial json selection
    select_json("https://s3.amazonaws.com/duhaime-shakespeare/folger/MND.json");

    // handle on click event
    d3.select('#selected_json').on('change', function() {
            
            // erase old image
            d3.select("svg").remove(); 
            
            var new_json = eval(d3.select(this).property('value'));
            select_json(new_json);
        });
</script>
</p></aside>
