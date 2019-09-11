export function c (m: number, n: number) {
  let x = 1, y = 1
  let max = Math.max(n, m)
  let min = Math.min(n, m)

  if (min === 0) return min 
  
  min = Math.min(min, max - min)

  while (min > 0) {
    x *= max--
    y *= min--
  }

  return x / y
}