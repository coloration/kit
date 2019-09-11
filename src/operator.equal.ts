import { curry, isFunction } from 'lodash'


function _equal (f: undefined | ((a: any, b: any) => boolean), a: any, b: any) {
  return isFunction(f) ? f(a, b) : Object.is(a, b)
}

export const equal = curry(_equal)