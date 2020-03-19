
import { curry } from '../operator'
import { ID, PID, CHILDREN, PARENT } from '../const'

function _toTree<T = any, K = T> (
  option: { 
    idField?: string, 
    pidField?: string, 
    childrenField?: string, 
    parentField?: string, 
    childValid?: (parent: T, childLike: T) => boolean 
  }, 
  arr: Array<T> 
) {
  
  const defaultOpt = { 
    idField: ID, 
    pidField: PID, 
    childrenField: CHILDREN, 
    parentField: PARENT,
    childValid: (parentLike: T, child: T) => parentLike[opt.idField] === child[opt.pidField]
  }
  const opt = Object.assign(defaultOpt, option)
  const result:K[] = []

  arr.forEach(function format (node) {
    const parent = arr.find(item => opt.childValid(item, node))

    if (parent) {
      node[opt.parentField] = parent
      if (!Array.isArray(parent[opt.childrenField])) {
        parent[opt.childrenField] = []
      }
      parent[opt.childrenField].push(node)
    }
    else {
      result.push(node as any)
    }
  })
  
  return result

}

function _flattenTree<T = any> (
  option: { childrenField?: string, childValid?: (n: T) => boolean }, 
  node: T | T[]
) {

  const nodes = Array.isArray(node) ? node : [node]
  let result: T[] = []
  const defaultOpt = { childrenField: CHILDREN, childValid: (n:T) => n[opt.childrenField].length > 0 }
  const opt = Object.assign(defaultOpt, option)

  function flat (n: T) {

    const hasChild = opt.childValid(n)

    if (hasChild) {
      const children = n[opt.childrenField]
      result.concat(children)
      children.forEach(flat)
    }
  }

  nodes.forEach(flat)

  return result
}

export const toTree = curry(_toTree)
export const flattenTree = curry(_flattenTree)