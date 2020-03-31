export const newCRect =(parentEvent, svg) => {
  const rectSides = ['rH1', 'rV2', 'rH2', 'rV1']

  // Check if there is an element with the .rH1 (rectangle
  // horizontal 1) class.
  // The 0 key is because the jQuery selector returns an 
  // object with a key called 0 which contains the CRect
  // object. It is needed because the query returns true
  // always if it's not included.
  console.log($(`.${rectSides[0]}`))
  if (!$(`.${rectSides[0]}`)[0]) {
    console.log('true')
    // Create four lines for each side of the cRect and vertexes
    // at each corner
    rectSides.forEach(side => {
      svg.line(parentEvent.offsetX, parentEvent.offsetY, parentEvent.offsetX, parentEvent.offsetY)
      .attr({stroke: 'black'})
      .addClass(`line ${side}`)
      svg.circle(parentEvent.offsetX, parentEvent.offsetY, 2).addClass(`vertex ${side}v`)
    })

    // Create a mousemove handler to track the movement of
    // the cRect endpoint. This also needs to be killed if 
    // the tool changes.
    svg.mousemove(event => {
      svg.select(`.${rectSides[0]}`).attr({x2: event.offsetX})
      svg.select(`.${rectSides[0]}v`).attr({cx: event.offsetX})
      svg.select(`.${rectSides[1]}`).attr({x1: event.offsetX, x2: event.offsetX, y2: event.offsetY})
      svg.select(`.${rectSides[1]}v`).attr({cx: event.offsetX, cy: event.offsetY})
      svg.select(`.${rectSides[2]}`).attr({x1: event.offsetX, y1: event.offsetY,  y2: event.offsetY})
      svg.select(`.${rectSides[2]}v`).attr({cy: event.offsetY})
      svg.select(`.${rectSides[3]}`).attr({y2: event.offsetY})
    })
  } else {
    console.log('false')
    // And then kill the event listener here
    svg.unmousemove()

    // Finish out the CRect
    rectSides.forEach(side => {
      console.log(side)
      svg.select(`.${side}`).addClass('element').removeClass(side)
      console.log(`${side}v`)
      svg.select(`.${side}v`).addClass('element').removeClass(`${side}v`)
    })
  }
}