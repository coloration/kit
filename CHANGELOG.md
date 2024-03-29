# Change Log

## 1.8.0

### Feature

- encode/base
  - `n10ToN(2, 3)` => '11'
  - `nToN10(16, 'ff')` => 255

- encode/color
  - `ColorType[Rgb,HSL,HEX]`
  - `interface Color`
  - `colorIsHex/colorIsRgb/colorIsHsl(str)` => Color
  - `colorAnyToRgbWithDom(str)` => rgba(foo, bar, baz)
  - `colorHexToRgba/colorRgbaToHex`
  - `colorShortHexRegExp/colorHexRegExp/colorRgbaRegExp/colorHslaRegExp`

- number
  - `numberNTo10(16, 'ff')` => 255
  - `number10ToN(2, 3)` => '11'
  - `numberToDouble(9)` => '09'; ~('a') => '0a'
  - `numberIntegerLength(1000.0)` => 3
  - `numberDecimalLength(1000.0)` => 1
  - `numberFillRange(0, 1, 25)` => 1, `~(0, 255, -1)` => 0
  - `numberPercentToFloat('5%')` => 0.05

### Fix

- dom/download
  - `downloadWithDataurl` response error

### Perf

- object
  - add generic for `queryToObject<T = PlainObject>`
- add color/number tests
- replace rollup with vite

## 1.7.0

### Feature

- add `transpose` function. 
- add some number functions.
- add `suffixCrc` function for RS485 protocol.

``` js
transpose([1, 2, 3], [4, 5, 6]) 
// [[1, 4], [2, 5], [3, 6]]
```

## 1.6.2

### Opt

- replace `Object.fromEntries` with `fromEntries` in `transformToFullSymbol`, `transformToHalfSymbol`

## 1.6.1

## Fix

- can't custom field to `toTree` 

## 1.6.0

### Feature

- add `arraySlice(array, start, end)` method. support negative number and over length's number

### Fix

- delay, debounce throttle bug of argument pass


## 1.5.0

### Feature

- arrayRepeat: `fn(2, 'hi')` to `['hi', 'hi']` 
- arrayPick: `fn('v', [{ v: 7 }, {}, { v: 2 }])` to `[7, undefined, 2]`
- objectMapping
- pureObject
- constPureObject
- isFalsy
- isTruthy
- isEmptyArray
- isEmptyPlainObject
- delay
- debounce
- throttle

### Optimization

- remove `parentField` option default in `toTree` function 

## 1.4.0

### Feature

- add `frameLoop(delay: Number = 0, fn: (times: number, lastTick: number, totalTick: number) => any) => cancel<Function>` method, implement with `requestAnimationFrame`
- add `defaultValue(presetValue, value) => value | presetValue` method

### Optimization

- add `keepChildren: Boolean = false` option to `flattenTree` methods.  


## 1.3.1

### Optimization

- replace bundle tool to rollup 

## 1.3.0

### Optimization

- build with rollup for minisize
- fix module export 

### Optimize

add `toEntries` and `fromEntries` methods to replace `Object.fromEntries`, `Object.entries`

## 1.2.1

### fix

`queryToObject` `queryToObject` without JSON.stringify


## 1.2.0

- add test 

## 1.1.0

### Feature

- add `queryToObject` and `objectToQuery` methods

## 1.0.2

### Feature 

- add method `getOffset`, Receive relative parent node & current node, return the relative distance with 'px', `{ width: number, height: number, left: number, right: number }`

## 1.0.1

### Fix

- The parent node is not in result list of the flattenTree method.

## 1.0.0

### Feature

- add `object/tree` content, `toTree`, `flattenTree`, `findTreeParent`, `findTreeParentFromList`

- change file struct, `dist/index.js` is a umd js file. `lib` contains es5 code. source in `src`

## 0.0.7 ~ 0.0.6

*2020-03-05*

### Fix 

error: `curry` is not a function 

### Test

add `array`, `object`

## 0.0.5 ~ 0.0.4

*2020-03-04*

### Fix

export `operator` part

## 0.0.3

*2020-03-04*

### Feature

publish a version