import { format } from 'd3-format'
import { isNumber, isNumberLike, isString } from '../operator'
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

export function numberToDouble(n: any) {
  return numberPrefix(undefined, 2, n)
}

export function numberIntegerLength(n: number) {
  return (String(n).split('.')[0] || '').length
}

export function numberDecimalLength(n: number) {
  return (String(n).split('.')[1] || '').length
}


export function numberNTo10(radix: number, num: string): number {
  if (!isString(num)) throw new Error()
  if (!num || !radix || radix === 10) return Number(num)
  if (radix < 2 || radix > 36) { throw new TypeError('The radix range is limited to 2-36.') }

  num = num.trim()
  let isPositive = true
  if (/^[+-]/.test(num)) {
    isPositive = /^[+]/.test(num)
    num = num.slice(1)
  }
  if (radix === 16 && /^0x/.test(num)) {
    num = num.slice(2)
  }
  num = num.replace(/^0/, '')

  function exchange(letter: string) {
    const code = letter.charCodeAt(0)
    if (letter >= 'A' && letter <= 'Z') {
      return code - 'A'.charCodeAt(0) + 10
    } else if (letter >= 'a' && letter <= 'z') {
      return code - 'a'.charCodeAt(0) + 10
    } else {
      return code - '0'.charCodeAt(0)
    }
  }

  let total = 0
  const str = num.toString()
  const integer = str.split('.')[0] ? str.split('.')[0].split('') : []
  const decimal = str.split('.')[1] ? str.split('.')[1].replace(/0+$/, '').split('') : []

  for (const [index, letter] of integer.entries()) {
    const num = radix > 10 ? exchange(letter) : +letter
    total += num * Math.pow(radix, integer.length - index - 1)
  }

  for (const [index, letter] of decimal.entries()) {
    const num = radix > 10 ? exchange(letter) : +letter
    if (isPositive) {
      total += num * Math.pow(radix, -(index + 1))
    } else {
      total -= num * Math.pow(radix, -(index + 1))
    }
  }

  return isPositive ? total : -total
}

export function numberFillRange(min: number, max: number, n: number): number {
  return numberMin(numberMax(min, n), max)
}

export function number10ToN(radix: number, num: number) {
  if (!isNumber(num)) throw new TypeError()
  if (!num || !radix || radix === 10) return num
  if (radix < 2 || radix > 36) { throw new Error() }

  const getLetter = (num: number) => num >= 10 ? String.fromCharCode('a'.charCodeAt(0) + num - 10) : `${num}`
  const isPositive = num > 0
  num = Math.abs(num)
  let integer = Math.floor(num)
  let decimal = ((d) => {
    return isNaN(d) ? 0 : d/ Math.pow(10, numberIntegerLength(d))
  })(Number((num + '').split('.')[1]))
  
  
  let str = ''
  
  // 整数
  while (integer >= radix) {
    const yu = integer % radix
    str = `${getLetter(yu)}${str}`
    integer = Math.floor(integer / radix)
  }

  str = `${getLetter(integer)}${str}`

  if (decimal) {
    // 小数
    str += '.'
    const len = `${decimal}`.length
    for (let i = 0; i < len; i++) {
      const num = Math.floor(radix * decimal)
      str = `${str}${getLetter(num)}`
      decimal = radix * decimal - num
    }

    str = str.replace(/0+$/, '')
  }

  

  return isPositive ? str : `-${str}`
}

export function numberPercentToFloat(nStr: string): number {
  const v = nStr === '' 
    ? 1
    : nStr.endsWith('%')
      ? parseFloat(nStr.slice(0, -1)) / 100
      : parseFloat( nStr.startsWith('.') ? '0' + nStr : nStr)

  return v 
   
}