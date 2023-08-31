import { PlainObject, isObject, curry, isPlainObject, isString, isDefind } from "../operator/index"

export function objectHas (obj: PlainObject, ...fields: string[]): boolean {
  return fields.every(function (field) {
    if (!isObject(obj)) return false
    const has = obj.hasOwnProperty(field)
    obj = obj[field]
    return has
  })
}

export function objectGet<V = any, D = undefined> (
  defaultValue: D, 
  obj: PlainObject, 
  ...fields: string[]
) {

  if (!isObject(obj)) return defaultValue
  let value: V = defaultValue as any

  fields.some(function (field) {
    return (value = obj = obj[field]) === undefined
  })

  return value === undefined ? defaultValue : value
}

export function objectMapping<T = any, K = any> (
  option: { deep: boolean, keepOthers: boolean },
  map: { [key: string]: string },
  obj: T
) {
  const opt = Object.assign({ deep: false, keepOthers: false }, option)
  const mp = Object.assign({}, map)

  return Object.keys(obj as any)
  .filter(k => isDefind(mp[k]) || opt.keepOthers)
  .reduce((o: any, k) => {
    const child = (obj as any)[k]
    o[mp[k] || k] = opt.deep && isPlainObject(child) ? objectMapping(opt, mp, child) : child
    return o
  }, {}) as K
}

export function toEntries<T = any> (obj: any): T[][] {
  return Object.keys(obj).map(key => ([key, obj[key]]))
}

export function fromEntries<T = string> (obj: T[][]) : PlainObject<T> {
  if (!Array.isArray(obj)) return {}
  return obj.reduce((acc, entry) => { 
    if (Array.isArray(entry) && entry.length > 1) acc[entry[0] as any] = entry[1]
    return acc
  }, {} as any)
}

export function reverseEntries <T = string>(entries: T[][]) : T[][] {
  return entries.map(entry => entry.reverse())
}

export const objectGetDefaultNull: <T = any>(obj: PlainObject, ...fields: string[]) => T | null
  = curry(objectGet, null)


export function reverseKeyValue <T = string> (obj: PlainObject<T>): PlainObject<T> {
  return fromEntries(reverseEntries<T>(toEntries(obj)))
}

export function pureObject<T = any> (v: T) {
  return isPlainObject(v) 
    ? Object.keys(v as any).reduce((obj, k) => {
        obj[k] = (v as any)[k]
        return obj
      }, Object.create(null))
    : v
}

export function constPureObject<T = any> (v: T) {
  return Object.freeze(pureObject(v))
}

export function objectToQuery<T = PlainObject> (encode: boolean, object: T): string {
  
  if (!isPlainObject(object)) return ''
  
  const result = []

  for (const key in object) {
    const stringValue = object[key] + ''
    const value = encode ? encodeURIComponent(stringValue) : stringValue
    result.push(`${key}=${value}`)
  }

  return result.join('&')
}

/**
 * 
 * @param raw  try to JSON.parse() the field value
 * @param query 'id=5&age=20'
 * @returns if 'raw' field is `true` { id: 5, age: 20 } else { id: '5', age: '20' }
 */
export function queryToObject<T = PlainObject> (raw: boolean, query: string): T {
  const result = Object.create(null)
  
  if (!isString(query)) return result
  query = query.replace(/^\?/, '')

  return query.split('&').reduce(function (acc, curr) {
    const p = curr.split('=')
    if (p.length === 2) {
      let val = p[1]
      if (raw) {
        try { val = JSON.parse(val) } catch (e) {}
      }
      acc[p[0]] = val
    }
    return acc
  }, result)
}

export * from './tree'