import {newVertex} from './vertex.js'
import {shiftKey} from '../index.js'


export const newLine = (parentEvent, svg) => {

  // Check if there is an element with the .newLine class.
  if (!$('.newLine').length) {
    newVertex(parentEvent.offsetX, parentEvent.offsetY, svg)
    svg.select('.vertex:last-of-type').addClass('newVert')
    svg.line(parentEvent.offsetX, parentEvent.offsetY, parentEvent.offsetX, parentEvent.offsetY)
      .attr({stroke: 'black'})
      .addClass('newLine line') // Add .newLine to track the line endpoint

    // Create a mousemove handler to track the movement of
    // the line endpoint. This also needs to be killed if 
    // the tool changes.
    svg.mousemove(event => {
      const mouseCoords = [
        {x2: event.offsetX, y2: event.offsetY},
        {x2: parentEvent.offsetX, y2: event.offsetY},
        {x2: event.offsetX, y2: parentEvent.offsetY}
      ]

      svg.select('.newLine').attr(
        !shiftKey ? mouseCoords[0] :
        Math.abs(event.offsetX - parentEvent.offsetX) >= Math.abs(event.offsetY - parentEvent.offsetY) ?
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