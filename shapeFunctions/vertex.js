import {vertices} from '../index.js'

export const newVertex = (x, y, svg, args = {}) => {
    const className = 'vertex element ' + args.className || ''
    const vertexId = vertices.length ? `vertex${parseInt(vertices[vertices.length - 1].substr(6))+1}`: 'vertex0'
    vertices.push(vertexId)
    console.log(vertices)
    svg.circle(x, y, 2).addClass(className).attr({id: vertexId})
}