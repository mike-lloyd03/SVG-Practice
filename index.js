console.log('index.js loaded')

const w = 800;
const h = 400;

const move = function(dx, dy) {
  this.attr({
    transform:
      this.data("origTransform") +
      (this.data("origTransform") ? "T" : "t") +
      [dx, dy]
  });
};
const start = function() {
  this.data("origTransform", this.transform().local);
};

const s = Snap(w, h);

$('#vertTool').click(buttonEvent => {
  if (buttonEvent.target.value) {
    s.unclick()
    $('#vertTool').val('').removeClass('on')
  }
  else {
    s.click(event => s.circle(event.offsetX, event.offsetY, 2).addClass('element'))
    $('#vertTool').val('on').addClass('on')
  }
})

$('#clear').click(() => {s.selectAll('.element').remove()})

$('#lineTool').click(buttonEvent => {
  if (buttonEvent.target.value) {
    s.unclick()
    $('#lineTool').val('').removeClass('on')
  }
  else {
    s.click(event => {
      if (!$('.newLine:last-of-type')[0]) {
        s.line(event.offsetX, event.offsetY, event.offsetX, event.offsetY)
        .attr({stroke: 'black', strokeWidth: '1'})
        .addClass('element newLine')
      }
      else {
        s.select('.element:last-of-type').attr({x2: event.offsetX, y2: event.offsetY})
        $('.newLine:last-of-type').removeClass('newLine')
      }
    })
    $('#lineTool').val('on').addClass('on')
  }
})
