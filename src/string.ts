export function isStr (o: any) {
  return typeof o === 'string'
}

export function toStr (o: any) {
  return String(o)
}

export function divide (reg: RegExp, split: string, str: string) {
  return str.replace(reg, split)
}

export function deco (decorator: string, position: number, str: string) {
  
}