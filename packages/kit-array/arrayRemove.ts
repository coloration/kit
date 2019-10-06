import curry from 'lodash.curry'
import { toArray } from './toArray'
import { is } from '@coloration/kit-operator'

function arrRemove (
  existValid: undefined | ((o: any, item: any) => boolean),
  o: any[],
  item: any
) {
  const items = toArray(item)
  const valid = existValid || is

  return o.filter(function remain (oItem, any) {
    return !items.some(function (item: any) {
      return valid(oItem, item)
    })
  })
}

export const arrayRemove = curry(arrRemove)