console.log('index.js loaded')

import newLine from './shapeFunctions/line.js'
import newVertex from './shapeFunctions/vertex.js'

const w = 800;
const h = 400;

const s = Snap(w, h);
let activeTool;

// Clears the 'on' value from the activeTool button and sets it on the button that was clicked
$('.shapeTool').click(event => {
  $(`#${activeTool}`).val('').removeClass('on')
  activeTool = event.target.id
  $(`#${activeTool}`).val('on').addClass('on')
})

// Clears the SVG canvas
$('#clear').click(() => {s.selectAll('.element').remove()})

// Click handler which checks to see which tool is selected and runs the appropriate click handler
s.click(event => {
  switch(activeTool) {
    case 'vertTool':
      newVertex(event, s)
      break
    case 'lineTool':
      newLine(event, s)
      break
  }
})


// const move = function(dx, dy) {
//   this.attr({
//     transform:
//       this.data("origTransform") +
//       (this.data("origTransform") ? "T" : "t") +
//       [dx, dy]
//   });
// };
// const start = function() {
//   this.data("origTransform", this.transform().local);
// };