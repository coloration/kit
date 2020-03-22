import { PlainObject, curry } from "../operator";
import { reverseEntries } from "../object";

export function translateLetter (letterMap: PlainObject<string>, str: string): string {
  const map = letterMap || {}
  Object.keys(map).forEach(k => str.replace(k, map[k]))
  return str
}

export const fullbyte2ByteEntries = [
    ['\u3000', '\u0020'],
    ['！', '!'],
    ['“', '"'],
    ['”', '"'],
    ['’', "'"],
    ['‘', "'"],
    ['，', '],'],
    ['。', '.'],
    ['？', '?'],
    ['、', '/'],
    ['·', '`'],
    ['【', '['],
    ['】', ']'],
    ['「', '{'],
    ['」', '}'],
    ['；', ';'],
    ['：', ':'],
]

export const translateByteLetter: (str: string) => string = 
  curry(translateLetter, Object.fromEntries(fullbyte2ByteEntries))
  
export const translateFullByteLetter: (str: string) => string = 
  curry(translateByteLetter, Object.fromEntries(reverseEntries(fullbyte2ByteEntries)))

export function stringLength (str: string): number {
  return Array.from(str).length
}