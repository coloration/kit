/**
 * 用于图表轴线的分割
 * 默认以10作为最小分割，如果数字普遍小于10，可以设置 minDivNum 为1，可以保证整数
 */ 
export function divideInterval (max: number, divCount = 4, minDivNum = 10) {

  // 根据 max/2 判断[分割数字]后几位是零
  // 700000 => 10000 最少后四位是零
  // 3000 => 100 最少后两位是零
  
  let limit = Math.pow(10, `${Math.floor(max / 2)}`.length - 2)
  
  // divNum 不能小于 minDivNum(default: 10)
  limit = limit < minDivNum ? minDivNum : limit

  const divNum = limit * divCount
  const maxVal = Math.ceil(max / divNum) * divNum

  return maxVal / divCount
}