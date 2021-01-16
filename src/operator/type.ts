const _toString = Object.prototype.toString

export function toRawType (value: any): string {
  return _toString.call(value).slice(8, -1)
}

export function isDefind (o: any): boolean {
  return o !== undefined && o !== null
}

export function isObject (o: any): boolean {
  return o !== null && typeof o === 'object'
}

export function isPlainObject (o: any): boolean {
  return isDefind(o) && !isPrimitive(o)
}

export const isString = (o: any) => typeof o === 'string'
export const isNumber = (o: any) => typeof o === 'number'
export const isSymbol = (o: any) => typeof o === 'symbol'
export const isBoolean = (o: any) => typeof o === 'boolean'
export const isFunction = (o: any) => typeof o === 'function'

export function isRegExp (o: any): boolean {
  return _toString.call(o) === '[object RegExp]'
}

export function isPrimitive (o: any): boolean {
  return isString(o) || isNumber(o) || isSymbol(o) || isBoolean(o)
}

export function isPromise (o: any): boolean {
  return isDefind(o) && isFunction(o.then) && isFunction(o.catch)
}

export function isIE (): boolean {
  return !!(window as any).ActiveXObject || "ActiveXObject" in window
}

export function isFalsy (o: any) : boolean {
  return !isDefind(o) || ['', 0, false, NaN, /* 0n */].includes(o)
}

export function isTruthy (o: any): boolean {
  return !isFalsy(o)
}

export function isEmptyArray (o: any): boolean {
  return Array.isArray(o) ? o.length === 0 : false
}

export function isEmptyPlainObject (o: any): boolean {
  return isPlainObject(o) ? Object.keys(o).length === 0 : false
}

export type PlainObject<T = any> = { [key: string]: T }