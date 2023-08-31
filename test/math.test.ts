import { describe, expect, it } from 'vitest'

import { a, c, cPick, transpose } from '../src/math'

describe('test c', () => {
  it('c32 equal 3', () => expect(c(3, 2)).toBe(3))
  it('c53 equal 10', () => expect(c(5, 3)).toBe(10))
})


describe('test a', () => {
  it('a32 equal 6', () => expect(a(3, 2)).toBe(6))
  it('a53 equal 60', () => expect(a(5, 3)).toBe(60))
})

describe('test cPick', () => {

  const collection = [
    1, 2, 3, 4, 5, 6
  ]

  it('return empty', () => {
    const result = cPick(collection, 0)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  it('pick one', () => {
    const result = cPick(collection, 1)
    expect(Array.isArray(result)).toBe(true)
    expect(result.every((r, i) => {

      return Array.isArray(r) &&
      r.length === 1 &&
      r[0] === collection[i]
    })).toBe(true)
    expect(result.length).toBe(collection.length)

  })
})

describe('test transpose', () => {
  it('base', () => {
    const result = transpose([[1, 2, 3], [4, 5, 6]])
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(3)
    result.forEach((row, i) => {
      expect(row.length).toBe(2)
      expect(row[0]).toBe(1 + i)
      expect(row[1]).toBe(4 + i)
    })
  })
})