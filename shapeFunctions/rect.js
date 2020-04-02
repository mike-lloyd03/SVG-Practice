import {newVertex} from './vertex.js'

export const newCRect =(parentEvent, svg) => {
  const rectSides = ['rH1', 'rV2', 'rH2', 'rV1']
  const eventX1 = parentEvent.offsetX
  const eventY1 = parentEvent.offsetY
  let eventX2
  let eventY2

  // Check if there is an element with the #rH1 (rectangle
  // horizontal 1) id.
  if (!$(`#${rectSides[0]}`).length) {
    // Create four lines for each side of the cRect and vertexes
    // at each corner
    rectSides.forEach(side => {
      svg.line(eventX1, eventY1, eventX1, eventY1)
      .attr({stroke: 'black', id: side})
      .addClass(`line newRect`)
      newVertex(eventX1, eventY1, svg, {id: `${side}v`, className: 'newRect'})
    })

    // Create a mousemove handler to track the movement of
    // the cRect endpoint. This also needs to be killed if 
    // the tool changes.
    svg.mousemove(event => {
      eventX2 = event.offsetX
      eventY2 = event.offsetY

      svg.select(`#${rectSides[0]}`).attr({x2: eventX2})
      svg.select(`#${rectSides[0]}v`).attr({cx: eventX2})
      svg.select(`#${rectSides[1]}`).attr({x1: eventX2, x2: eventX2, y2: eventY2})
      svg.select(`#${rectSides[1]}v`).attr({cx: eventX2, cy: eventY2})
      svg.select(`#${rectSides[2]}`).attr({x1: eventX2, y1: eventY2,  y2: eventY2})
      svg.select(`#${rectSides[2]}v`).attr({cy: eventY2})
      svg.select(`#${rectSides[3]}`).attr({y2: eventY2})
    })
  } else {
    // And then kill the event listener here
    svg.unmousemove()

    // Finish out the CRect
    rectSides.forEach(side => {
      svg.select(`#${side}`).addClass('element').attr({id: ''}).removeClass('newRect')
      svg.select(`#${side}v`).addClass('element').attr({id: ''}).removeClass('newRect')
    })
  }
}

export const killRect = (svg) => {
  // Kill the rect if a new line was started but not completed
  // when something was changed
  svg.unmousemove()
  svg.selectAll('.newRect').remove()
}