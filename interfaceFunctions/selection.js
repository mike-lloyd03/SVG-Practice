import {shiftKey} from '../index.js'

export const selectElement = (event) => {
  if (event.target.tagName == 'svg' && $('.selected').length) {
    $('.selected').removeClass('selected')
  }
  else if (shiftKey) {
    $(`#${event.target.id}`).addClass('selected')
  }
  else {
    $('.selected').removeClass('selected')
    $(`#${event.target.id}`).addClass('selected')
  }
}