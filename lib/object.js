"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObj(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}
exports.isObj = isObj;
function objHas(obj, ...fields) {
    return fields.every(function (field) {
        if (!isObj(obj))
            return false;
        const has = obj.hasOwnProperty(field);
        obj = obj[field];
        return has;
    });
}
exports.objHas = objHas;
function objGet(defaultValue, obj, ...fields) {
    if (!isObj(obj))
        return false;
    let value;
    fields.some(function (field) {
        return (value = obj = obj[field]) === undefined;
    });
    return value === undefined ? defaultValue : value;
}
exports.objGet = objGet;
