import isArray from 'lodash.isarray'

export function toArray (o: any) {
  return isArray(o) ? o.slice() : Array.from(arguments)
}