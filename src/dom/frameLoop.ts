export function frameLoop (delay: number, fn: (times: number, lastTick: number, totalTick: number) => any) {

  delay = delay || 0

  let times = 0
  let start = 0
  let next = true
  let stamp = start = Date.now()

  function loop () {
    if (!next) return

    const now = Date.now() 
    if (now - stamp <= delay) return requestAnimationFrame(loop)
    
    fn(++times, now - stamp, now - start)
    stamp = Date.now()
    
  }

  requestAnimationFrame(loop)

  return function cancel () {
    next = false
  }
  
}