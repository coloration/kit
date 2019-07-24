const key = '@coloration/kit'

export const placeholder = { [key]: true }

export function isPlaceholder (_: any) {
  return _ != null && typeof _ === 'object' && _[key] === true
}