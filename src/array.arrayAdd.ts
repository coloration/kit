import { curry } from 'lodash'
import { not } from './operator.not'
import { toArray } from './array.toArray'

function arrAdd (
  existValid: undefined | ((oItem: any, item: any) => boolean), 
  o: any[], 
  item: any
): any[] {
  
  const valid = existValid || not
  const items = toArray(item)
  .filter((item: any) => o.every(oitem => valid(oitem, item)))

  return o.concat(items)
}

export const arrayAdd = curry(arrAdd)