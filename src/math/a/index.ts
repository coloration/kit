export function a (m: number, n: number) {
  let x = 1
  let max = Math.max(n, m)
  let min = Math.min(n, m)
  
  if (min === 0) return min 

  min = Math.max(min, max - min)
  
  while (max >= min) { x *= max-- }

  return x
}