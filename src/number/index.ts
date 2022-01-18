import { format } from 'd3-format'
import { isNumberLike } from '../operator'
// https://observablehq.com/@d3/d3-format

/**
 * @enum {string} 
 * @tutorial https://observablehq.com/@d3/d3-format
 */
export enum NumberFormatType {
  thousands = ',',
  thousands2fFloat = ',.2f',
  percent = '.0%',
  percent2fFloat = '.2%'
}

/**
 * format a number to string
 * @param {NumberFormatType | string} pattern 
 * @param {any} o
 * @returns {string} formatted string with numLike
 * @example
 * numberFormat(NumberFormatType.thousands, 1000) // '1,000'
 * @tutorial https://observablehq.com/@d3/d3-format
 */
export function numberFormat (
  pattern: NumberFormatType | string,
  o: any, 
): string {
  return format(pattern)(Number(o))
}

/**
 * pick a default value if payload is invalid  
 * @param {function | undefined } validator a valid function return a boolean value. Default is `isNumberLike`
 * @param {number | undefined} def if `o` is invalid return `def` value. Default is `0`
 * @param {any} o 
 * @returns {number}
 * @example 
 * numberDefault(isNumberLike, 0, 'abc') // 0
 * 
 * const positiveDefault = curry(numberDefault, (n) => isNumberLike(n) && n > 0, 0)
 * positiveDefault('abc') // 0
 * positiveDefault(-1) // 0
 * positiveDefault(0.5) // 0.5
 */
export function numberDefault (
  validator: undefined | ((n: any) => boolean), 
  def: undefined | number, 
  o: any
) {
  return (validator || isNumberLike)(o) ? Number(o) : (def || 0)
}


/**
 * sum numbers function
 * @param {(number[] | number)[]} args 
 * @returns {number} a sum of the flat args
 * @example 
 * numberSum(1, 4) => 5
 * numberSum([2, 3]) => 5
 */
export function numberSum (...args: (number[] | number)[]): number {
  return args.reduce<number>((acc, item) => {
    const curr: number = Array.isArray(item) ? numberSum(item) : item
    return acc + curr
  }, 0)
}

/**
 * max number function
 * @param {(number[] | number)[]} args  
 * @returns return a max number in args
 * @example
 * numberMax(1, 4) => 4
 * numberMax([2, 3]) => 3
 */
export function numberMax (...args: (number[] | number)[]) : number {
  return args.reduce<number>((max, n) => {
    let curr: number = Array.isArray(n) ? numberMax(n) : n
    return max > curr ? max : curr
  }, Number.NEGATIVE_INFINITY)
}

/**
 * min number function
 * @param {(number[] | number)[]} args  
 * @returns return a min number in args
 * @example
 * numberMin(1, 4) => 1
 * numberMin([2, 3]) => 2
 */
export function numberMin (...args: (number[] | number)[]): number {
  return args.reduce<number>((min, n) => {
    let curr = Array.isArray(n) ? numberMin(n) : n
    return min < curr ? min : curr
  }, Number.POSITIVE_INFINITY)
}

/**
 * formart numbe to a fixed number string.
 * @param {string | number | undefined } placeholder Default is '0'
 * @param {number | undefined } len Default is String(n).length
 * @param {any} n 
 * @returns {string}
 * @example
 * numberPrefix(undefined, 4, 'AF') // '00AF'
 * @example
 * const f = curry(numberPrefix, undefined, 2)
 * const d = new Date()
 * `${f(d.getHours())}:${f(d.getMintunes())}:${f(getSeconds())}` // '09:12:01'
 */
export function numberPrefix (
  placeholder: undefined | string | number, 
  len: undefined | number, 
  n: any
): string {
  let r = String(n)
  placeholder = placeholder || '0'
  len = len || r.length
  while (r.length < len) {
    r = placeholder + r
  }
  return r 
}