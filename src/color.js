/**
 * hex: #3
 */

export function pruehex (hex) {
  return hex.replace('#', '')
}

export function hexful (hex, withDeco) {
  hex = pruehex(hex)

  while(hex.length < 6) { hex += hex }

  return (withDeco ? '#' :'') + hex.substr(0, 6)
}

export function hex2rgba (hex, withDeco) {
  hex = pruehex(hex)
  let res = []
  while (hex.length > 0) {
    res.push(parseInt(hex.substr(0, 2), 16))
    hex = hex.substr(2)
  }

  return withDeco ? `rgba(${res})` : res

}

export function hex2hsl () {

}

export function rgba2hex (rgba, withDeco) {
  return (withDeco ? '#' : '') + rgba.match(/(\d+)/g).map(n => n.toString(16))
} 

export function hsl2hex () {

}

export function rgba2hsl () {

}