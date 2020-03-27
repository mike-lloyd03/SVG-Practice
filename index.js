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

// const v = s.circle(100, 100, 5);
// v.drag(move, start);



$('#vertTool').click(event => {
  if (event.target.value) {
    s.unclick()
    $('#vertTool').val('').removeClass('on')
  }
  else {
    s.click(event => s.circle(event.offsetX, event.offsetY, 2).addClass('element'))
    $('#vertTool').val('on').addClass('on')
  }
})

$('#clear').click(() => {s.selectAll('.element').remove()})

$('#lineTool').click(event => {
  if (event.target.value) {
    s.unclick()
    $('#lineTool').val('').removeClass('on')
  }
  else {
    s.click(event => s.line(event.offsetX, event.offsetY, event.offsetX + 50, event.offsetY + 50).addClass('element'))
    $('#lineTool').val('on').addClass('on')
  }
})