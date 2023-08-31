import { number10ToN, numberFillRange, numberPercentToFloat, numberToDouble } from '../number'
import { curry } from '../operator'

export const colorShortHexRegExp = /^#([0-9A-F])([0-9A-F])([0-9A-F])$/i
export const colorHexRegExp = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i
export const colorRgbaRegExp = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?(\d{0,}\.?\d+%?)?\)$/i
export const colorHslaRegExp = /^hsla?\((-?\d+),(\d{0,}\.?\d+%),(\d{0,}\.?\d+%),?(\d{0,}\.?\d+%?)?\)$/i

export enum ColorType {
  HEX = 'hex',
  RGB = 'rgb',
  HSL = 'hsl'
}

export interface Color {
  rgb: number[],
  hsl?: number[],
  hex?: string[],
  opacity: number, // 0..1
  type: ColorType
}

const COLOR_DEFAULT_RGB: Color = { rgb: [0, 0, 0], opacity: 1, type: ColorType.RGB }
const COLOR_DEFAULT_HSL: Color = { rgb: [], hsl: [0, 0, 0], opacity: 1, type: ColorType.HSL }

const range0To1 = curry(numberFillRange, 0, 1)

export function isColorHex (str: string) : null | Color {

  let match = str.match(colorHexRegExp)
  let result: string[] 
  if (match) {
    const [_, sr, sg, sb, sa] = match
    result = [sr, sg, sb, sa || 'ff']
  }

  else {
    match = str.match(colorShortHexRegExp)
    if (!match) return null
    const [_, sr, sg, sb] =  match
    result = [sr + sr, sg + sg, sb + sb, 'ff']
  }

  const [r, g, b, a] = result!.map((sn) => parseInt('0x' + sn))

  const opacity = Number((a / 255).toFixed(2))
  return {
    rgb: [r, g, b],
    opacity,
    hex: result.slice(0, 3),
    type: ColorType.HEX 
  }
}

export function isColorRgb(str: string): null | Color {
  const match = str.replace(/\s/g, '').match(colorRgbaRegExp)
  if (!match) return null

  const [_, sr, sg, sb, sa = '1'] =  match
  
  const range = (n: string) => numberFillRange(0, 255, Number(n))
  return {
    rgb: [range(sr), range(sg), range(sb)],
    opacity: range0To1(numberPercentToFloat(sa)),
    type: ColorType.RGB
  }
}


export function isColorHsl(str: string): null | Color {
  const match = str.replace(/\s/g, '').match(colorHslaRegExp)
  if (!match) return null

  const [_, sh, ss, sl, sa = '1'] =  match
  const format = (s: string) => range0To1(numberPercentToFloat(s))
  return {
    rgb: [],
    hsl: [
      Number(((Number(sh) % 360 + 360) % 360 / 360).toFixed(2)), 
      format(ss), 
      format(sl)
    ],
    opacity: format(sa),
    type: ColorType.HSL
  }
}


// export function colorConvertRgbToHsl(c: Color): Color {
//   let [r, g, b] = c.rgb
//   r /= 255, g /= 255, b /= 255;
//   const max = Math.max(r, g, b)
//   const min = Math.min(r, g, b);
//     let h = 0
//     let s = 0
//     const l = (max + min) / 2;

//     if (max !== min) {
//         var d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch(max) {
//             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//             case g: h = (b - r) / d + 2; break;
//             case b: h = (r - g) / d + 4; break;
//         }
//         h /= 6;
//     }



 

//   return {
//     ...c,
//     hsl: [
//       h, 
//       s, 
//       l
//     ]
//   }
// }
// export function colorConvertHslToRgb(c: Color): Color {
//   const [h, s, l] = c.hsl!

//   let r, g, b
//   if(s == 0) {
//     r = g = b = l; // achromatic
//   } else {
//     var hue2rgb = function hue2rgb(p, q, t) {
//         if(t < 0) t += 1;
//         if(t > 1) t -= 1;
//         if(t < 1/6) return p + (q - p) * 6 * t;
//         if(t < 1/2) return q;
//         if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//         return p;
//     }

//     var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     var p = 2 * l - q;
//     r = hue2rgb(p, q, h + 1/3);
//     g = hue2rgb(p, q, h);
//     b = hue2rgb(p, q, h - 1/3);
//   }

//   return {
//     ...c,
//     rgb: [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
//   }
// }



export function colorAnyToRgbWithDom(str: string): string {
  var div = document.createElement('div')
    div.style.backgroundColor = str
    document.body.appendChild(div)
    var c = window.getComputedStyle(div).backgroundColor 
    document.body.removeChild(div)
    return c
}


export function colorHexToRgba(str: string): string {
  const c = isColorHex(str) || COLOR_DEFAULT_RGB
  return `rgba(${c.rgb.join(',')},${c.opacity})`
}

// export function colorHexToHsla(str: string): string {
//   const c = colorConvertRgbToHsl(isColorHex(str) || COLOR_DEFAULT_RGB)
//   const [h, s, l] = c.hsl!
//   return `hsla(${Math.floor(h*360)},${Number((s*100).toFixed(1))}%,${Number((l*100).toFixed(1))}%,${c.opacity})`
// }

export function colorRgbaToHex(str: string): string {
  const c = isColorRgb(str) || COLOR_DEFAULT_RGB
  const t = (n: number) => numberToDouble(number10ToN(16, n))
  return `#${c.rgb.map(t).join('')}${t(Math.round(c.opacity * 255))}`
}

// export function colorRgbaToHsla(str: string): string {
//   const c = colorConvertRgbToHsl(isColorRgb(str) || COLOR_DEFAULT_RGB)
  
//   const [h, s, l] = c.hsl!;
//   return `hsla(${Math.round(h*360)},${Number((s*100).toFixed(1))}%,${Number((l*100).toFixed(1))}%,${c.opacity})`
// }

// export function colorHslaToHex(str: string): string {
//   const c = colorConvertHslToRgb(isColorHsl(str) || COLOR_DEFAULT_HSL)
//   const t = (n: number) => numberToDouble(number10ToN(16, n))
//   return `#${c.rgb.map(t).join('')}${t(Math.round(c.opacity * 255))}`
// }

// export function colorHslaToRgba(str: string): string {
//   const c = colorConvertHslToRgb(isColorHsl(str) || COLOR_DEFAULT_HSL)
//   return `rgba(${c.rgb.join(',')},${c.opacity})`
// }