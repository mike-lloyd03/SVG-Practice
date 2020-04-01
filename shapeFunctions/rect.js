import {newVertex} from './vertex.js'

export const newCRect =(parentEvent, svg) => {
  const rectSides = ['rH1', 'rV2', 'rH2', 'rV1']

  // Check if there is an element with the #rH1 (rectangle
  // horizontal 1) id.
  if (!$(`#${rectSides[0]}`).length) {
    console.log('true')
    // Create four lines for each side of the cRect and vertexes
    // at each corner
    rectSides.forEach(side => {
      svg.line(parentEvent.offsetX, parentEvent.offsetY, parentEvent.offsetX, parentEvent.offsetY)
      .attr({stroke: 'black', id: side})
      .addClass(`line newRect`)
      newVertex(parentEvent.offsetX, parentEvent.offsetY, svg)
      $('.vertex:last-of-type').attr('id', `${side}v`).addClass('newRect')
    })

    // Create a mousemove handler to track the movement of
    // the cRect endpoint. This also needs to be killed if 
    // the tool changes.
    svg.mousemove(event => {
      svg.select(`#${rectSides[0]}`).attr({x2: event.offsetX})
      svg.select(`#${rectSides[0]}v`).attr({cx: event.offsetX})
      svg.select(`#${rectSides[1]}`).attr({x1: event.offsetX, x2: event.offsetX, y2: event.offsetY})
      svg.select(`#${rectSides[1]}v`).attr({cx: event.offsetX, cy: event.offsetY})
      svg.select(`#${rectSides[2]}`).attr({x1: event.offsetX, y1: event.offsetY,  y2: event.offsetY})
      svg.select(`#${rectSides[2]}v`).attr({cy: event.offsetY})
      svg.select(`#${rectSides[3]}`).attr({y2: event.offsetY})
    })
  } else {
    console.log('false')
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