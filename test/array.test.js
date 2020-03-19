import {
  toArray, arrayAdd, arrayRemove
} from '../dist/array'

describe('method test: toArray', () => {
  test('a single number to array', () => {
    const arr = toArray(12)
    expect(Array.isArray(arr)).toBe(true)
    expect(arr[0]).toBe(12)
  })

  test('multiple parameters to array', () => {
    // [1, false, 'x']
    expect(toArray(1, false, 'x').join('')).toBe('1falsex')
  })

  test('first parameter is array return a copy', () => {
    const arr = [12]
    const newArr = toArray([12])

    expect(arr[0]).toBe(newArr[0])
    expect(arr === newArr).toBe(false)
  })
})


describe('method test: arrayAdd', () => {
  test('basic one item', () => {
    const arr = arrayAdd(null, [], 12)
    expect(Array.isArray(arr)).toBe(true)
    expect(arr.length).toBe(1)
    expect(arr[0]).toBe(12)
  })

  test('custom validator', () => {
    const arr = arrayAdd(
      (a, b) => a.id !== b.id, 
      [{ id: 1, name: 'wang'}, { id: 2, name: 'li'}],
      { id: 2, name: 'zhang'}
    )

    expect(arr.length).toBe(2)
    expect(arr[0].name).toBe('wang')
    expect(arr[1].name).toBe('li')

  })

  test('custom validator2', () => {
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
  test('basic one item', () => {
    const arr = arrayRemove(undefined, [12, 5, 7], 5)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr.length).toBe(2)
    expect(arr[0]).toBe(12)
    expect(arr[1]).toBe(7)
  })

  test('multiple remove', () => {
    const one = { a: 12 }
    const two = { b: 5 }
    const three = { c: 8 }
    const four = { d: 16 }
    const arr = arrayRemove(undefined, [one, two, three, four], [one, three])

    expect(arr.length).toBe(2)
    expect(arr[0]).toBe(two)
    expect(arr[1]).toBe(four)
  })

  test('custom validator', () => {


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