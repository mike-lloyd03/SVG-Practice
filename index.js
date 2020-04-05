console.log('index.js loaded')

import {newVertex} from './shapeFunctions/vertex.js'
import {newLine, killLine} from './shapeFunctions/line.js'
import {newRect, killRect} from './shapeFunctions/rect.js'
import {selectElement} from './interfaceFunctions/selection.js'
import {removeElement} from './interfaceFunctions/removeElement.js'

// SVG Dimensions
const w = 800;
const h = 400;
const s = Snap(w, h);

// Tool definitions
let activeTool
export let elements = {vertex: [], line: [], arc: []}
const vertTool = 'vertTool'
const lineTool = 'lineTool'
const cornerRectTool = 'cornerRectTool'
const centerRectTool = 'centerRectTool'
const selectTool = 'selectTool'
export let shiftKey = false

// Shape Tool logic
$('.shapeTool').click(event => {
  if (activeTool == lineTool && $('.newLine').length) {killLine(s)}
  if ([cornerRectTool, centerRectTool].includes(activeTool) && $('.newRect').length) {killRect(s)}

  if (activeTool != '') {
    $(`#${activeTool}`).val('').removeClass('on')
  }
  if (activeTool == event.target.id) {
    activeTool = ''
  }
  else {
    activeTool = event.target.id
    $(`#${activeTool}`).val('on').addClass('on')
  }
  console.log("activeTool=" + activeTool)
})

// Clears the SVG canvas
$('#clear').click(() => {s.selectAll('.element').remove()})

// Click handler which checks to see which tool is selected and runs the appropriate click handler
s.click(event => {
  switch(activeTool) {
    case selectTool:
      selectElement(event)
      break
    case vertTool:
      newVertex(event.offsetX, event.offsetY, s)
      break
    case lineTool:
      newLine(event, s)
      break
    case cornerRectTool:
      newRect(event, s, 'corner')
      break
    case centerRectTool:
      newRect(event, s, 'center')
      break
    default:
      break
  }
})

$('body').keydown(event => {
  console.log(event.keyCode)
  switch (event.keyCode) {
    case 8:
    case 46:
      $('.selected').each((i, e) => removeElement(e.id))
    case 16: //
      shiftKey = true
      break
    case 27: //esc
      if ($('.newLine').length) {killLine(s)}
      else if ($('.newRect').length) {killRect(s)}
      break
    default:
      break
  }
})

$('body').keyup(event => {
  switch (event.keyCode) {
    case 16: //shift
      shiftKey = false
      break
    default:
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