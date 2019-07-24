import { isPlaceholder as is_ } from './_placeholder'

export function curry1 (fn: Function) {
  return function f1 (a: any) {
    return arguments.length === 0 || is_(a) ? 
      f1 :
      fn.call(this, arguments)
  }
}

export function curry2 (fn: Function) {
  return function f2 (a?: any, b?: any) {
    switch (arguments.length) {
      case 0: 
        return f2
      case 1:
        return is_(a) ? f2 : curry1(function (_b: any) { return fn(a, _b) })
      default:
        const aIs_ = is_(a), bIs_ = is_(b)
        return aIs_ && bIs_ ?
          f2 :
          aIs_ ?
            curry1(function (_a: any) { return fn(_a, b) }) :
            bIs_ ? 
              curry1(function (_b: any) { return fn(a, _b)}) :
              fn(a, b)
    }

  }
}

export function curry3 (fn: Function) {
  return function f3 (a?: any, b?: any, c?: any) {
    switch (arguments.length) {
      case 0:
        return f3
      case 1:
        return is_(a) ? f3 : curry2(function (_b?: any, _c?: any) { return fn(a, _b, _c )})
      case 2:
        return is_(a) && is_(b) ?
          f3 :
          is_(a) ?
            curry2(function (_a?: any, _c?: any) { return fn(_a, b, _c) }) :
            is_(b) ?
              curry2(function (_b?: any, _c?: any) { return fn (a, _b, _c) }) :
              curry1(function (_c?: any) { return fn (a, b, _c) })

      default:
        const aIs_ = is_(a), bIs_ = is_(b), cIs_ = is_(c)
        return aIs_ && bIs_ && cIs_ ?
          f3:
          aIs_ && bIs_ ?
            curry2(function (_a?: any, _b?: any) { return fn(_a, _b, c) }) :
            aIs_ && cIs_ ?
              curry2(function (_a?: any, _c?: any) { return fn(_a, b, _c) }):
              bIs_ && cIs_?
                curry2(function (_b?: any, _c?: any) { return fn(a, _b, _c) }) :
                aIs_ ?
                  curry1(function (_a?: any) { return fn(_a, b, c) }) :
                  bIs_ ?
                    curry1(function (_b?: any) { return fn(a, _b, c) }) :
                    cIs_ ?
                      curry1(function (_c?: any) { return fn(a, b, _c) }) :
                      fn(a, b, c)
    }
  }
}

export function curryN(length: number, received: any[], fn: Function) {
  return function() {
    var combined = []
    var argsIdx = 0
    var left = length
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result
      if (combinedIdx < received.length &&
          (!is_(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx]
      } else {
        result = arguments[argsIdx]
        argsIdx += 1;
      }
      combined[combinedIdx] = result
      if (!is_(result)) {
        left -= 1
      }
      combinedIdx += 1
    }
    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, curryN(length, combined, fn))
  };
}

export function _arity(n: number, fn: Function) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0: any) { return fn.apply(this, arguments); };
    case 2: return function(a0: any, a1: any) { return fn.apply(this, arguments); };
    case 3: return function(a0: any, a1: any, a2: any) { return fn.apply(this, arguments); };
    case 4: return function(a0: any, a1: any, a2: any, a3: any) { return fn.apply(this, arguments); };
    case 5: return function(a0: any, a1: any, a2: any, a3: any, a4: any) { return fn.apply(this, arguments); };
    case 6: return function(a0: any, a1: any, a2: any, a3: any, a4: any, a5: any) { return fn.apply(this, arguments); };
    case 7: return function(a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) { return fn.apply(this, arguments); };
    case 8: return function(a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any) { return fn.apply(this, arguments); };
    case 9: return function(a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any) { return fn.apply(this, arguments); };
    case 10: return function(a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}