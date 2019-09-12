import { curry } from 'lodash'

function lastNAny (timeRange: number, n: number, from?: Date) {
  from = from || new Date()
  
  const last = from.getTime() - n * timeRange

  return last
}

export const lastNTime = curry(lastNAny)