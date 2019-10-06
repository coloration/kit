import curry from 'lodash.curry'
import { not } from '@coloration/kit-operator'
import { toArray } from './toArray'

function arrAdd (
  existValid: undefined | ((oItem: any, item: any) => boolean),
  o: any[],
  item: any
): any[] {

  const valid = existValid || not
  const items = toArray(item)
  .filter(function remainItem (item: any) {
    return o.every(function validate (oItem: any) {
      return valid(oItem, item)
    })
  })

  return o.concat(items)
}

export const arrayAdd = curry(arrAdd)