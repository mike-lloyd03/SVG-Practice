import {newVertex} from './vertex.js'
import {shiftKey} from '../index.js'


export const newLine = (parentEvent, svg) => {
  // need to add a way to get the coords of a vertex if
  // the user starts drawing a line on that vertex so it
  // snaps the line start to that vertex
  const x1 = parentEvent.offsetX
  const y1 = parentEvent.offsetY
  let x2
  let y2

  // Check if there is an element with the .newLine class.
  if (!$('.newLine').length) {
    newVertex(x1, y1, svg)
    svg.select('.vertex:last-of-type').addClass('newVert')
    svg.line(x1, y1, x1, y1)
      .attr({stroke: 'black'})
      .addClass('newLine line') // Add .newLine to track the line endpoint

    // Create a mousemove handler to track the movement of
    // the line endpoint. This also needs to be killed if 
    // the tool changes.
    svg.mousemove(event => {
      x2 = event.offsetX
      y2 = event.offsetY
      const mouseCoords = [
        {x2: x2, y2: y2},
        {x2: x1, y2: y2},
        {x2: x2, y2: y1}
      ]

      svg.select('.newLine').attr(
        !shiftKey ? mouseCoords[0] :
        Math.abs(x2 - x1) >= Math.abs(y2 - y1) ?
        mouseCoords[2] : mouseCoords [1]
      )
    })
  } else {

    // And then kill the event listener here
    svg.unmousemove()

    // Add the endpoint vertex
    newVertex(svg.select('.newLine').attr('x2'), svg.select('.newLine').attr('y2'), svg)

    // Finish out the line
    svg.select('.newLine')
    .addClass('element')
    .removeClass('newLine') // Remove .newLine because we are done
    svg.select('.newVert').removeClass('newVert')

    
  }
}

export const killLine = (svg) => {
  // Kill the line if a new line was started but not completed
  // when something was changed
  svg.unmousemove()
  svg.selectAll('.newLine').remove()
  svg.selectAll('.newVert').remove()
}