import { curry3 } from './_curry'

export const equal = curry3(function _equal (f: undefined | ((a: any, b: any) => boolean), a: any, b: any) {
  return f ? f(a, b) : a === b
})

export const eq = equal(undefined)
export const neq = equal(function (a: any, b: any) { a !== b })