import { a, c } from '../dist'

describe('test c', () => {
  test('c32 equal 3', () => expect(c(3, 2)).toBe(3))
  test('c53 equal 10', () => expect(c(5, 3)).toBe(10))
})


describe('test a', () => {
  test('a32 equal 6', () => expect(a(3, 2)).toBe(6))
  test('a53 equal 60', () => expect(a(5, 3)).toBe(60))
})