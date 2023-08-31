export function copy<T = any> (o: T) { 
  return Object.assign(Object.create(null), o) as T 
}

export function clone <T = any> (o: T) {
  return JSON.parse(JSON.stringify(o)) as T
}