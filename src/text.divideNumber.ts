// 逗号分隔数字
export function divideNumber (textNumber: number | string, interval = 3, divider = ','): string {
  
  const t = String(textNumber)
  if (isNaN(Number(textNumber))) return t
  
  const arr = t.split('.')
  const reg = new RegExp('(\\d)(?=(?:\\d{'+ interval +'})+$)', 'g')
  arr[0] = arr[0].replace(reg, '$1' + divider)

  return arr.join('.')
}