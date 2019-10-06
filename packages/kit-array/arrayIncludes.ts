import curry from 'lodash.curry'
import { is } from '@coloration/kit-operator'
import { toArray } from './toArray'

function arrIncludes (
  existValid: undefined | ((oItem: any, item: any) => boolean),
  o: any[],
  item: any
) {
  const valid = existValid || is
  const items = toArray(item)

  return items.every(function (item) {
    return o.some(function (oItem) {
      return valid(oItem, item)
    })
  })
}

export const arrayIncludes = curry(arrIncludes)


