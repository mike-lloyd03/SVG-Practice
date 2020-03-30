const newLine = (event, svg) => {
      if (!$('.newLine:last-of-type')[0]) {
        svg.line(event.offsetX, event.offsetY, event.offsetX, event.offsetY)
          .attr({
            stroke: 'black',
            strokeWidth: '1'
          })
          .addClass('element newLine')
      } else {
        svg.select('.element:last-of-type').attr({
          x2: event.offsetX,
          y2: event.offsetY
        })
        $('.newLine:last-of-type').removeClass('newLine')
      }
}

export default newLine