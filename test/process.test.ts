import { microDelay, macroDelay } from '../src'
import { describe, expect, it, vi } from 'vitest'

describe('process', () => {

  it('microDelay', () => {

    const a = vi.fn()

    const delayA = microDelay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()

    expect(a).not.toBeCalled()

    return Promise.resolve()
    .then(() => {
      expect(a).toBeCalled()
      expect(a).toHaveBeenCalledTimes(1)
    })
  })

  vi.useFakeTimers()

  it('microDelay2', () => {
    let b = 0
    function delay (fn: any) {
      return function () {
        setTimeout(() => {
          b++
          microDelay(fn)
        }, 0)
      }
    }


    const a = vi.fn()

    const delayA = delay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()

    expect(a).not.toBeCalled()
    
    vi.runAllTimers()
    expect(a).not.toBeCalled()
    expect(b).toBe(5)
    
  })

  vi.useFakeTimers()

  it('macroDelay', () => {
    const a = vi.fn()

    const delayA = macroDelay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()

    expect(a).not.toBeCalled()
    vi.runAllTimers()
    expect(a).toBeCalled()
    expect(a).toHaveBeenCalledTimes(1)
    
  })

  it('macroDelay 2', () => {
    const a = vi.fn()

    const delayA = macroDelay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()
   
    return Promise.resolve()
    .then(() => {
      expect(a).not.toBeCalled()
    })
  })
})