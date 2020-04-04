import {newVertex} from './vertex.js'

export const newRect =(parentEvent, svg, mode) => {
  const rectSides = ['rH1', 'rV2', 'rH2', 'rV1'] // rH1 = rect Horizontal 1
  const eventX1 = parentEvent.offsetX
  const eventY1 = parentEvent.offsetY
  let eventX2
  let eventY2

  // Check if there is an element with the #rH1 (rectangle
  // horizontal 1) id.
  if (!$(`#${rectSides[0]}v`).length) {
    console.log(`Beginning ${mode} rect`)
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

      // which mode we are using will determine how the elements are moved
      if (mode == 'corner') {
        svg.select(`#${rectSides[0]}`).attr({x2: eventX2})
        svg.select(`#${rectSides[0]}v`).attr({cx: eventX2})
        svg.select(`#${rectSides[1]}`).attr({x1: eventX2, x2: eventX2, y2: eventY2})
        svg.select(`#${rectSides[1]}v`).attr({cx: eventX2, cy: eventY2})
        svg.select(`#${rectSides[2]}`).attr({x1: eventX2, y1: eventY2,  y2: eventY2})
        svg.select(`#${rectSides[2]}v`).attr({cy: eventY2})
        svg.select(`#${rectSides[3]}`).attr({y2: eventY2})
      }
      else {
        const eventDX = eventX1-(eventX2-eventX1)
        const eventDY = eventY1-(eventY2-eventY1)

        svg.select(`#${rectSides[0]}`).attr({x1: eventDX, y1: eventDY, x2: eventX2, y2: eventDY})
        svg.select(`#${rectSides[0]}v`).attr({cx: eventX2, cy: eventDY})
        svg.select(`#${rectSides[1]}`).attr({x1: eventX2, y1: eventDY, x2: eventX2, y2: eventY2})
        svg.select(`#${rectSides[1]}v`).attr({cx: eventX2, cy: eventY2})
        svg.select(`#${rectSides[2]}`).attr({x1: eventX2, y1: eventY2, x2: eventDX, y2: eventY2})
        svg.select(`#${rectSides[2]}v`).attr({cx: eventDX, cy: eventY2})
        svg.select(`#${rectSides[3]}`).attr({x1: eventDX, y1: eventY2, x2: eventDX, y2: eventDY})
        svg.select(`#${rectSides[3]}v`).attr({cx: eventDX, cy: eventDY})

      }
    })
  } else {
    // And then kill the event listener here
    svg.unmousemove()

    // Finish out the CRect
    rectSides.forEach(side => {
      svg.select(`#${side}`).addClass('element').attr({id: ''}).removeClass('newRect')
      $(`#${side}v`).addClass('element').removeClass('newRect').attr({id: ''})
    })
  }
}

export const killRect = (svg) => {
  // Kill the rect if a new line was started but not completed
  // when something was changed
  svg.unmousemove()
  svg.selectAll('.newRect').remove()
}