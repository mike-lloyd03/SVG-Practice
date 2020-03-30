const newVertex = (parentEvent, svg) => {
    svg.circle(parentEvent.offsetX, parentEvent.offsetY, 2).addClass('element')
}

export default newVertex