import {elements} from '../index.js'

export const newVertex = (x, y, svg, args = {}) => {
    console.log(args.className || 'nope')
    const className = 'vertex element ' + (args.className || '')

    // Add the vertex id to the elements object
    const vertexId = elements.vertex.length ? `vertex${parseInt(elements.vertex[elements.vertex.length - 1].substr(6))+1}`: 'vertex0'
    elements.vertex.push(vertexId)

    // Create the svg element
    // svg.circle(x, y, 2).addClass(className).attr({id: vertexId, strokeWidth: 20, strokeFill: 'white', strokeOpacity: 0.5 })
    let vertex = svg.circle(x, y, 2)
    let selectArea = svg.circle(x, y, 4).attr({fill: 'pink'})
    svg.g(selectArea, vertex).addClass(className).attr({id: vertexId})
}