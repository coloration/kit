
export function objHas (obj: any, field: string) {
  return obj.hasOwnProperty(field)
}

export function objGet (value: undefined, obj: {[key: string]: any}, ...fields: string[]) {

  fields.some(function (field) {
    const has = objHas(obj, field)
    if (has) value = obj = obj[field]
    return has
  })

  return value
}
