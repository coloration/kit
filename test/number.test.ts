
import { describe, expect, it } from 'vitest'
import { number10ToN, numberNTo10 } from '../src/number'


describe('dom', () => {
  it('getOffset', () => {
    
  })
})

describe('radix 10 to n', () => {

  it('simple', () => {
    expect(number10ToN(2, 4)).toBe('100')
    expect(number10ToN(8, 12)).toBe('14')
    expect(number10ToN(7, 12)).toBe('15')
    expect(number10ToN(16, 255)).toBe('ff')
    expect(number10ToN(36, 1295)).toBe('zz')
    expect(number10ToN(16, 10)).toBe('a')
  })
  
  it('with decimal', () => {
    expect(number10ToN(8, 12.5)).toBe('14.4')
    expect(number10ToN(8, 12.3)).toBe('14.231')
  })
  
})


describe('radix n to 10', () => {

  it('simple', () => {
    expect(numberNTo10(2, '100')).toBe(4)
    expect(numberNTo10(8, '14')).toBe(12)
    expect(numberNTo10(7, '15')).toBe(12)
    expect(numberNTo10(16, 'ff')).toBe(255)
    expect(numberNTo10(36, 'zz')).toBe(1295)
  })
  
  it('with decimal', () => {
    expect(numberNTo10(8, '14.4')).toBe(12.5)
    expect(numberNTo10(16, 'fa')).toBe(250)
  })
  
})