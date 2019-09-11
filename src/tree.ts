export function toTree (idField, pidField, childrenField, parentField, arr) {
  
  idField = idField || 'id'
  pidField = pidField || 'pid'
  childrenField = childrenField || 'children'
  parentField = parentField || 'parent'

  const nodeMap = {}

  arr.forEach(function format (node) {
    
  })
  

}

export function flatTree (childrenField, childValid, node) {

  let result = []
  childrenField = childrenField || 'children'

  function flat (n) {

    const hasChild = childValid ? childValid(n) : n[childrenField].length > 0

    if (hasChild) {
      const children = n[childrenField]
      result.concat(children)
      children.forEach(flat)
    }
  }

  flat(node)

  return result
}