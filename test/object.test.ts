import { describe, expect, it, beforeAll } from 'vitest'

import { 
  objectHas, objectGet 

} from '../src/object'

let testObject = {}

beforeAll(() => {
  testObject = { a: 12, b: { ba: 'x', bb: 'y' }, c: true }
})

describe('method test: objectHas', () => {
  it('nomal', () => {
    expect(objectHas(testObject, 'a')).toBe(true)
    expect(objectHas(testObject, 'd')).toBe(false)
  })

  it('has deeply', () => {
    expect(objectHas(testObject, 'b', 'ba')).toBe(true)
    expect(objectHas(testObject, 'b', 'zz')).toBe(false)
  })

  it('obj does not have but parent has', () => {
    const obj = Object.create(testObject)
    expect(objectHas(obj, 'a')).toBe(false)
  })

})

describe('method test: objectGet', () => {
  it('get object value', () => {
    expect(objectGet(undefined, testObject, 'a')).toBe(12)
  })

  it('get object value deeply', () => {
    expect(objectGet(undefined, testObject, 'b', 'bb')).toBe('y')
  })

  it('unexist value will return undefined', () => {
    expect(objectGet(undefined, testObject, 'b', 'zz')).toBe(undefined)
  })

  it('unexist value will return default value', () => {
    expect(objectGet('--', testObject, 'x')).toBe('--')
  })
})