/*
 * Generates a tooltip for a SVG circle element. Will use the current position
 * to place the tooltip, and the id as the tooltip text.
 *
 * Will use the parent of the circle as the container to place the tooltip,
 * and to calculate the bounds for the tooltip.
 */
function addTooltip(circle) {
    var x = parseFloat(circle.attr("cx"));
    var y = parseFloat(circle.attr("cy"));
    var r = parseFloat(circle.attr("r"));
    var text = circle.attr("id");

    var parent = d3.select(circle.node().parentNode);

    var tooltip = parent.append("text")
        .text(text)
        .attr("x", x)
        .attr("y", y)
        .attr("dy", -r * 2)
        .attr("dx", 0)
        .attr("id", "tooltip")
        .attr("text-anchor", "middle");

    var outerBBox = parent.node().getBBox();
    var innerBBox = tooltip.node().getBBox();

    var outerMin = outerBBox.x;
    var innerMin = innerBBox.x;

    var outerMax = outerBBox.x + outerBBox.width;
    var innerMax = innerBBox.x + innerBBox.width;

    var epsilon = 1;

    // check if too close to edge
    if (Math.abs(innerMin - outerMin) < epsilon) {
        tooltip.attr("text-anchor", "start");
        tooltip.attr("dx", -r);
    }
    else if (Math.abs(innerMax - outerMax) < epsilon) {
        tooltip.attr("text-anchor", "end");
        tooltip.attr("dx", r);
    }
}

