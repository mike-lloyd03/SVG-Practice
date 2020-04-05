import {elements} from '../index.js'

export const removeElement = (elementID) => {
  let elementType = elementID.match(/[a-z]+/)[0]
  let arrIndex = elements[elementType].findIndex(e => e == elementID)
  elements[elementType].splice(arrIndex, 1)
  $(`#${elementID}`).remove()

  console.log(elements)
}