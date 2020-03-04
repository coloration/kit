export function copy<T = any> (o: T) { 
  return Object.assign(Object.create(null), o) as T 
}