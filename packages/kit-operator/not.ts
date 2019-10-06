import { equal } from './equal'

export const not = equal(function () {
  return !Object.is.apply(null, arguments)
})