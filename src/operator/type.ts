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

export const isString = (o: any): o is string => typeof o === 'string'

// NaN
export const isNumber = (o: any): o is number => toRawType(o) === 'Number'

export const isSymbol = (o: any): o is symbol => typeof o === 'symbol'
export const isBoolean = (o: any): o is boolean => typeof o === 'boolean'
export const isFunction = (o: any): o is Function => typeof o === 'function'

export const isArrayBuffer = (o: any) => toRawType(o) === 'ArrayBuffer'

export const isRegExp = (o: any): o is RegExp => toRawType(o) === 'RegExp'

export const isNumberLike = (o: any) => isNumber(Number(o))


export function isPrimitive (o: any): boolean {
  return isString(o) || isNumber(o) || isSymbol(o) || isBoolean(o)
}

export function isPromise (o: any): boolean {
  return isDefind(o) && isFunction(o.then) && isFunction(o.catch)
}

export function isIE (): boolean {
  return !!('ActiveXObject' in globalThis)
}

export function isFalsy (o: any) : boolean {
  return !isDefind(o) || ['', 0, false, NaN, /* 0n */].includes(o)
}

export function isTruthy (o: any): boolean {
  return !isFalsy(o)
}

export function isNodeEnv (): boolean {
  return !!globalThis.process
}

export function isWebEnv (): boolean {
  return !!('document' in globalThis)
}

export function isEmptyArray (o: any): boolean {
  return Array.isArray(o) ? o.length === 0 : false
}

export function isEmptyPlainObject (o: any): boolean {
  return isPlainObject(o) ? Object.keys(o).length === 0 : false
}

export type PlainObject<T = any> = { [key: string]: T }