
import { identity, isString, curry } from '../operator/index'
import { ID, PID, CHILDREN, PARENT } from '../const/index'
import { arrayRemove } from '../array/index'
import { objectGet } from '.'

export type ToTreeOption<T = any> = {
  idField?: string, 
  pidField?: string, 
  childrenField?: string, 
  parentField?: string, 
  childValid?: (parent: T, childLike: T) => boolean 
}

export function toTree<T = any, K = T> (
  option: ToTreeOption<T>, 
  arr: Array<T> 
) {
  
  const defaultOpt = { 
    idField: ID, 
    pidField: PID, 
    childrenField: CHILDREN, 
    /* parentField: PARENT, */
    childValid: (parent: T, childLike: T) => 
      (parent as any)[defaultOpt.idField] === (childLike as any)[defaultOpt.pidField]
  }
  const opt = Object.assign(defaultOpt, option)
  const result:K[] = []

  arr.forEach(function format (node) {
    const parent = arr.find(item => opt.childValid(item, node))

    if (parent) {
      if (isString(opt.parentField)) (node as any)[opt.parentField] = parent
      if (!Array.isArray((parent as any)[opt.childrenField])) {
        (parent as any)[opt.childrenField] = []
      }
      (parent as any)[opt.childrenField].push(node)
    }
    else {
      result.push(node as any)
    }
  })
  
  return result

}

export function flattenTree<T = any> (
  option: { childrenField?: string, childValid?: (n: T) => boolean, keepChildren?: boolean }, 
  node: T | T[]
) {

  const nodes = Array.isArray(node) ? node : [node]
  let result: T[] = []
  const defaultOpt = { 
    childrenField: CHILDREN, 
    childValid: (n:T) => (n as any)[opt.childrenField] && (n as any)[opt.childrenField].length > 0,
    keepChildren: false
  }
  const opt = Object.assign(defaultOpt, option)

  function flat (n: T) {

    result.push(n)

    if (opt.childValid(n)/* hasChild */) {
      (n as any)[opt.childrenField].forEach(flat)
      if (!opt.keepChildren) delete (n as any)[opt.childrenField]
    }
  }

  nodes.forEach(flat)

  return result
}

export function findTreeParent<T> (
  option: {
    parentField?: string
    valid?: (parent: T) => boolean
  },
  node: T
): T | null {

  const defaultOpt = { parentField: PARENT, valid: identity }
  const opt = Object.assign(defaultOpt, option)

  if (opt.valid(node)) return node
  const parent = (node as any)[opt.parentField]
  return parent ? findTreeParent(opt, parent) : null
}

const arrayDelete = curry(arrayRemove, undefined)

export function findTreeParentFromList<T> (
  option: {
    pidField?: string,
    idField?: string,
    parentValid?: (parentLike: T, child: T) => boolean,
    valid: (parent: T) => boolean
  },
  node: T,
  list: T[]
): T | null {
  const defaultOpt = { 
    pidField: PID, 
    idField: ID, 
    parentValid: (parentLike: T, child: T) => (parentLike as any)[ID] === (child as any)[PID],
    valid: identity
  }
  const opt = Object.assign(defaultOpt, option)


  if (opt.valid(node)) return node
  const parent = list.find(n => opt.parentValid(n, node))
  if (parent === null) return null
  

  return parent ? 
    findTreeParentFromList(opt, parent, arrayDelete(list, parent)) :
    null
}
