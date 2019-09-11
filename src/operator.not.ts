import { equal } from './operator.equal'

export const not = equal(function () {
  return !Object.is.apply(null, arguments)
})