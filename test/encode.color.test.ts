import { describe, expect, it } from 'vitest'
import {
  ColorType,
  // colorHexToHsla,
  colorHexToRgba,
  // colorHslaToRgba,
  colorRgbaToHex, 
  // colorRgbaToHsla, 
  isColorHex, 
  isColorHsl, 
  isColorRgb
} from '../src/encode'

describe('hex', () => {
  it('string to color object', () => {
    const o = isColorHex('#ff0000')!

    expect(o.type).toBe(ColorType.HEX)
    expect(o.opacity).toBe(1)
    expect(o.hex!.join('')).toBe('ff0000')
    expect(o.rgb.join(',')).toBe('255,0,0')
  })

  it('long str to color object', () => {
    const o = isColorHex('#ff00ff80')!

    expect(o.type).toBe(ColorType.HEX)
    expect(o.opacity).toBe(0.5)
    expect(o.hex!.join('')).toBe('ff00ff')
    expect(o.rgb.join(',')).toBe('255,0,255')
  })

  it('short str to color object', () => {
    const o = isColorHex('#ff0')!

    expect(o.type).toBe(ColorType.HEX)
    expect(o.opacity).toBe(1)
    expect(o.hex!.join('')).toBe('ffff00')
    expect(o.rgb.join(',')).toBe('255,255,0')
  })

  it('error string', () => {
    expect(isColorHex('#ZXCERT')).toBeNull()
  })

  it('hex to rgb str', () => {
    expect(colorHexToRgba('#ff0a00')).toBe('rgba(255,10,0,1)')
    expect(colorHexToRgba('#ff0a0080')).toBe('rgba(255,10,0,0.5)')
    expect(colorHexToRgba('#6af')).toBe('rgba(102,170,255,1)')
  })



  // it('hex to hsl str', () => {
  //   expect(colorHexToHsla('#ff0a00')).toBe('hsla(2,100%,50%,1)')
  //   expect(colorHexToHsla('#66aaff33')).toBe('hsla(213,100%,70%,0.2)')
  //   expect(colorHexToHsla('#6af')).toBe('hsla(213,100%,70%,1)')
  // })
})

describe('rgba', () => {
  it('short str to object', () => {
    const o = isColorRgb('rgb(255, 0,0)')!

    expect(o.type).toBe(ColorType.RGB)
    expect(o.opacity).toBe(1)
    expect(o.rgb.join(',')).toBe('255,0,0')

  })

  it('full str to color object', () => {
    const o = isColorRgb('rgba(102,170,255,.4)')!

    expect(o.type).toBe(ColorType.RGB)
    expect(o.opacity).toBe(.4)
    expect(o.hex).toBe(undefined)
    expect(o.rgb.join(',')).toBe('102,170,255')
  })

  it('overflow', () => {
    expect(isColorRgb('rgba(-4,799,0.2,123.4)')!).toBeNull()
    expect(isColorRgb('rgba(0,0,2,123.4)')!.opacity).toBe(1)
  })


  it('rgb to hex str', () => {
    expect(colorRgbaToHex('rgba(255,10,0,1)')).toBe('#ff0a00ff')
    expect(colorRgbaToHex('rgba(255,10,0,0.5)')).toBe('#ff0a0080')
    expect(colorRgbaToHex('rgba(102,170,255,.2)')).toBe('#66aaff33')
  })


  // it('rgb to hsl str', () => {
  //   expect(colorRgbaToHsla('rgba(255,255,255,.1)')).toBe('hsla(0,0%,100%,0.1)')
  //   expect(colorRgbaToHsla('rgba(125,255,255,.1)')).toBe('hsla(180,100%,74.5%,0.1)')
  //   expect(colorRgbaToHsla('rgba(255,10,0,4.1)')).toBe('hsla(2,100%,50%,1)')
  //   expect(colorRgbaToHsla('rgba(102,170,255,.2)')).toBe('hsla(213,100%,70%,0.2)')
  // })

})


describe('hsl', () => {
  it('short str to object', () => {
    const o = isColorHsl('hsl(213, 100%,70%)')!

    expect(o.type).toBe(ColorType.HSL)
    expect(o.opacity).toBe(1)
    expect(o.hsl!.length).toBe(3)

  })

  it('full str to color object', () => {
    const o = isColorHsl('hsla(270,100%,70%,0.2)')!

    expect(o.type).toBe(ColorType.HSL)
    expect(o.opacity).toBe(.2)
    expect(o.hex).toBe(undefined)
    expect(o.rgb.length).toBe(0)
    expect(o.hsl!.join(',')).toBe('0.75,1,0.7')
  })

  it('overflow', () => {
    expect(isColorHsl('hsla(-180,100%,70%,0.2)')!.hsl!.join(',')).toBe('0.5,1,0.7')
    expect(isColorHsl('hsla(213,100%,70%,123.4)')!.opacity).toBe(1)
  })


  // it.only('hsl to rgb str', () => {
  //   expect(colorHslaToRgba('hsla(0,0%,0%,0.1)')).toBe('rgba(0,0,0,0.1)')
  //   expect(colorHslaToRgba('hsla(180,100%,74.5%,0.1)')).toBe('rgba(125,255,255,0.1)')
  //   // expect(colorHslaToRgba('hsla(213,100%,70%,0.2)')).toBe('rgba(102,170,255,0.2)')
  // })

})