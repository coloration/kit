import { isDefind } from './type'

/**
 * return 'presetValue' if 'value' is undefind or null
 * @param presetValue
 * @param value
 */
export function defaultValue<T = any, K = T> (presetValue: T, value: K) : T | K {
  return isDefind(value) ? value : presetValue
}