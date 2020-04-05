import {shiftKey} from '../index.js'

export const selectElement = (event) => {
  console.log(event.target)
  if (event.target.tagName == 'svg' && $('.selected').length) {
    $('.selected').removeClass('selected')
  }
  else if (event.target.tagName == 'svg' && !$('.selected').length) {
  }
  else if (shiftKey) {
    $(`#${event.target.id}`).addClass('selected')
  }
  else {
    $('.selected').removeClass('selected')
    $(`#${event.target.id}`).addClass('selected')
  }
}