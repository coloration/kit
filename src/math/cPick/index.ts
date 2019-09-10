export function cPick (nColl: any[], m: number): any[][] {
  if (m === 0) return []
  const n = nColl.length
  if (m === n) return [nColl.slice()]
  
  const result: any[][] = []
  for (let i = 0; i < n; i++) {
    const x = nColl.slice(i, i + 1)
    const subs = m > 1 ? 
      cPick(nColl.slice(i + 1), m - 1) :
      [[]]

    for (let j = 0, len = subs.length; j < len; j++) {
      result.push(x.concat(subs[j]))
    }
  }

  return result 
}
