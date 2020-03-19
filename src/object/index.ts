import { PlainObject, isObject, curry } from "../operator"

export function objectHas (obj: PlainObject, ...fields: string[]): boolean {

  return fields.every(function (field) {
    if (!isObject(obj)) return false
    const has = obj.hasOwnProperty(field)
    obj = obj[field]
    return has
  })
}

export function objectGet<V = any, D = undefined> (defaultValue: D, obj: PlainObject, ...fields: string[]) {

  if (!isObject(obj)) return defaultValue
  let value: V

  fields.some(function (field) {
    return (value = obj = obj[field]) === undefined
  })

  return value === undefined ? defaultValue : value
}

export const objectGetDefaultNull: <T = any>(obj: PlainObject, ...fields: string[]) => T | null
  = curry(objectGet, null)

export * from './tree'