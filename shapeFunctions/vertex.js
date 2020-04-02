export const newVertex = (x, y, svg, args = {}) => {
    const className = 'vertex element ' + args.className || ''
    svg.circle(x, y, 2).addClass(className).attr({id: args.id || ''})
}