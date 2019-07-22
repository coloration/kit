export type PlainObject = {[key: string]: any}

export function isObj (o: any) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function objHas (obj: PlainObject, ...fields: string[]) {

  return fields.every(function (field) {
    if (!isObj(obj)) return false
    const has = obj.hasOwnProperty(field)
    obj = obj[field]
    return has
  })
}

export function objGet (defaultValue: undefined, obj: PlainObject, ...fields: string[]) {

  if (!isObj(obj)) return false
  let value

  fields.some(function (field) {
    return (value = obj = obj[field]) === undefined
  })

  return value === undefined ? defaultValue : value
}