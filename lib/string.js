"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isStr(o) {
    return typeof o === 'string';
}
exports.isStr = isStr;
function toStr(o) {
    return String(o);
}
exports.toStr = toStr;
function divide(reg, split, str) {
    return str.replace(reg, split);
}
exports.divide = divide;
function deco(decorator, position, str) {
}
exports.deco = deco;
