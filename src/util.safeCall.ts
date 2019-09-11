export function safeCall (exceptHandler) {
  return function (scopeFunction) {
    let scopeReturn
    try {
      scopeReturn = scopeFunction(exceptHandler)

      if (scopeReturn instanceof Promise) {
        scopeReturn = scopeReturn.catch(exceptHandler)
      }

      return scopeReturn
    }
    catch (e) {
      exceptHandler(e)
    }
  }
}