import { isStr } from '../src/string'

test('number is not a string', () => {
  expect(isStr(12)).toBe(false)
})