"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isArr(o) {
    return Array.isArray(o);
}
exports.isArr = isArr;
function toArr(o) {
    return isArr(o) ? o.slice() : Array.from(arguments);
}
exports.toArr = toArr;
function arrAdd(existValid, o, item) {
    const valid = existValid || function (oItem, item) { return oItem !== item; };
    const items = toArr(item)
        .filter((item) => o.every(oitem => valid(oitem, item)));
    return o.concat(items);
}
exports.arrAdd = arrAdd;
function arrRemove(existValid, o, item) {
    const items = toArr(item);
    const valid = existValid || function (oItem, item) { return oItem === item; };
    return o.filter((oItem) => !items.some((item) => valid(oItem, item)));
}
exports.arrRemove = arrRemove;
