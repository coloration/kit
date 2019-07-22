import { 
  objHas, objGet 

} from '../src/object'

let testObject

beforeAll(() => {
  testObject = { a: 12, b: { ba: 'x', bb: 'y' }, c: true }
})

describe('method test: objHas', () => {
  test('nomal', () => {
    expect(objHas(testObject, 'a')).toBe(true)
    expect(objHas(testObject, 'd')).toBe(false)
  })

  test('has deeply', () => {
    expect(objHas(testObject, 'b', 'ba')).toBe(true)
    expect(objHas(testObject, 'b', 'zz')).toBe(false)
  })

  test('obj does not have but parent has', () => {
    const obj = Object.create(testObject)
    expect(objHas(obj, 'a')).toBe(false)
  })

})

describe('method test: objGet', () => {
  test('get object value', () => {
    expect(objGet(undefined, testObject, 'a')).toBe(12)
  })

  test('get object value deeply', () => {
    expect(objGet(undefined, testObject, 'b', 'bb')).toBe('y')
  })

  test('unexist value will return undefined', () => {
    expect(objGet(undefined, testObject, 'b', 'zz')).toBe(undefined)
  })

  test('unexist value will return default value', () => {
    expect(objGet('--', testObject, 'x')).toBe('--')
  })
})


test 