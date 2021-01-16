import { isFunction } from "../operator"

export function microDelay(fn: (...args: any[]) => any) {
  let microtaskStarted = false
  const resolvePromise = Promise.resolve()
  let cache = []

  return function (...args: any[]) {
    if (!microtaskStarted) microtaskStarted = true
    cache[0] = args

    resolvePromise.then(() => {
      if (microtaskStarted) {
        fn.apply(null, cache[0])
        cache = []
        microtaskStarted = false
      }
    })
  }
}

export function macroDelay (fn: (...args: any[]) => any) {

  let count = 0
  let cache = []

  return function (...args: any[]) {
    cache[0] = args

    if (count === 0) {
      setTimeout(() => {
        fn.apply(null, cache[0])
        cache = []
        count = 0
      }, 0)
    }
    count++
  }
}

export function delay<T = Function> (time: number, fn: T) {
  return function (...args: any[]) {
    const timer = setTimeout(() => {
      isFunction(fn) && (fn as any).call(null, args)
    }, time)

    return function dispose () {
      clearTimeout(timer)
    }
  }
}

export function debounce<T = Function> (time: number, fn: T) {

  let timer: any = undefined
  let enable = true

  return function (...args: any[]) {
    if (!enable) return
    clearTimeout(timer)
    timer = setTimeout(() => {
      isFunction(fn) && (fn as any).call(null, args)
    }, time)

    return function dispose (enable = true) {
      clearTimeout(timer)
      enable = enable
    }
  }
}

export function throttle<T = Function> (time: number, fn: T) {
  
  let enable = true
  let doing = false

  return function (...args: any) {
    if (doing || !enable) return

    isFunction(fn) && (fn as any).call(null, args)

    const timer = setTimeout(() => {
      doing = false
    }, time)
    
    return function dispose (enable = true) {
      clearTimeout(timer)
      enable = false
    }
  }
}