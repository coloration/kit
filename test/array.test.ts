import { describe, expect, it } from 'vitest'

import {
  toArray, arrayAdd, arrayRemove, arrayIncludes, arrayPick, arrayRepeat
} from '../src/array'

describe('method test: toArray', () => {
  it('a single number to array', () => {
    // [12]
    const arr = toArray(12)
    expect(Array.isArray(arr)).toBe(true)
    expect(arr[0]).toBe(12)
    expect(arr.length).toBe(1)
  })

  it('multiple parameters to array', () => {
    // [1, false, 'x']
    const arr = toArray(1, false, 'x')
    expect(arr.join('')).toBe('1falsex')
    expect(arr.length).toBe(3)
  })

  it('first parameter is array return a copy', () => {
    const arr = [12]
    const newArr = toArray([12])

    expect(arr[0]).toBe(newArr[0])
    expect(arr === newArr).toBe(false)
  })
})


describe('method test: arrayAdd', () => {
  it('basic one item', () => {
    const arr = arrayAdd(undefined, [], 12)
    expect(Array.isArray(arr)).toBe(true)
    expect(arr.length).toBe(1)
    expect(arr[0]).toBe(12)
  })

  it('custom validator', () => {
    const arr = arrayAdd(
      (a, b) => a.id !== b.id, 
      [{ id: 1, name: 'wang'}, { id: 2, name: 'li'}],
      { id: 2, name: 'zhang'}
    )

    expect(arr.length).toBe(2)
    expect(arr[0].name).toBe('wang')
    expect(arr[1].name).toBe('li')

  })

  it('custom validator2', () => {
    const arr = arrayAdd(
      (a, b) => a.id !== b.id, 
      [{ id: 1, name: 'wang'}, { id: 2, name: 'li'}],
      [{ id: 2, name: 'zhang'}, { id: 3, name: 'sun'}]
    )

    expect(arr.length).toBe(3)
    expect(arr[0].name).toBe('wang')
    expect(arr[1].name).toBe('li')
    expect(arr[2].name).toBe('sun')

  })
})

describe('method test: arrayRemove', () => {
  it('basic one item', () => {
    const arr = arrayRemove(undefined, [12, 5, 7], 5)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr.length).toBe(2)
    expect(arr[0]).toBe(12)
    expect(arr[1]).toBe(7)
  })

  it('multiple remove', () => {
    const one = { a: 12 }
    const two = { b: 5 }
    const three = { c: 8 }
    const four = { d: 16 }
    const arr = arrayRemove(undefined, [one, two, three, four], [one, three])

    expect(arr.length).toBe(2)
    expect(arr[0]).toBe(two)
    expect(arr[1]).toBe(four)
  })

  it('custom validator', () => {


    const arr = arrayRemove(
      (a, b) => a.pid === b.pid,
      [
        { pid: 1, id: 1, name: 'wang'},
        { pid: 1, id: 2, name: 'liu' },
        { pid: 2, id: 1, name: 'fang' },
        { pid: 2, id: 2, name: 'yang' },
      ], [
        { pid: 1 }
      ]
    )

    expect(arr.length).toBe(2)
    expect(arr[0].name).toBe('fang')
    expect(arr[1].name).toBe('yang')
    expect(arr[1].id).toBe(2)
  })
})


describe('method test: array includes', () => {
  it('basic one item', () => {
    const arr = arrayIncludes(undefined, [], 1)
    expect(arrayIncludes(undefined, [], 1)).toBe(false)
    expect(arrayIncludes(undefined, ['s'], 1)).toBe(false)
    expect(arrayIncludes(undefined, [5, 4, 2, 1], 1)).toBe(true)
  })

  it('array items', () => {
    expect(arrayIncludes(undefined, [5, 4, 2, 1], [4, 1])).toBe(true)
    expect(arrayIncludes(undefined, [5, 4, 2, 1], [4, 7])).toBe(false)
  })

  it('custom validator', () => {

    expect(arrayIncludes(
      (a, b) => a.id === b.id, 
      [{ id: 1, name: 'wang'}, { id: 2, name: 'li'}],
      [{ id: 2, name: 'zhang'}]
    )).toBe(true)

    expect(arrayIncludes(
      (a, b) => a.name === b.name, 
      [{ id: 1, name: 'wang'}, { id: 2, name: 'li'}],
      { id: 2, name: 'zhang'}
    )).toBe(false)

  })

})


describe('test array repeat', () => {

  it('generate array width value', () => {

    const length = 7
    const contentNum = 5
    const array = arrayRepeat(length, contentNum)
    expect(array.length).toBe(length)
    expect(array.reduce((acc, n) => (acc + n), 0)).toBe(length * contentNum)

  })

  it('generate array width function', () => {

    const length = 4
    
    const array = arrayRepeat(length, (_, i, array) => i * array.length)
    expect(array.reduce((acc, n) => (acc + n), 0)).toBe(0 + 4 + 8 + 12)

  })
})


describe('test array pick', () => {

  it('generate array', () => {
    
    const res = arrayPick('value', [{ name: '1', value: 1 }, { name: '2', value: 2 }])

    expect(res.reduce((acc, n) => (acc + n), 0)).toBe(1 + 2)

  })
})