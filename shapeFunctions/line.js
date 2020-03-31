export const newLine = (parentEvent, svg) => {

  // Check if there is an element with the .newLine class.
  // The 0 key is because the jQuery selector returns an 
  // object with a key called 0 which contains the line
  // object. It is needed because the query returns true
  // always if it's not included.
  if (!$('.newLine:last-of-type')[0]) {
    svg.circle(parentEvent.offsetX, parentEvent.offsetY, 2).addClass('element vertex')
    svg.line(parentEvent.offsetX, parentEvent.offsetY, parentEvent.offsetX, parentEvent.offsetY)
      .attr({stroke: 'black'})
      .addClass('newLine line') // Add .newLine to track the line endpoint

    // Create a mousemove handler to track the movement of
    // the line endpoint. This also needs to be killed if 
    // the tool changes.
    svg.mousemove(event => {
      svg.select('.newLine:last-of-type').attr({
        x2: event.offsetX,
        y2: event.offsetY
      })
    })
  } else {

    // And then kill the event listener here
    svg.unmousemove()

    // Finish out the line
    svg.select('.newLine:last-of-type')
    .addClass('element')
    .removeClass('newLine') // Remove .newLine because we are done

    // Add the endpoint vertex
    svg.circle(parentEvent.offsetX, parentEvent.offsetY, 2).addClass('element vertex')
  }
}

export const killLine = (svg) => {
  // Kill the line if a new line was started but not completed
  // when something was changed
  svg.unmousemove()
  svg.select('.newLine:last-of-type').remove()
}