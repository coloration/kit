"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function a(m, n) {
    let x = 1;
    let max = Math.max(n, m);
    let min = Math.min(n, m);
    if (min === 0)
        return min;
    min = Math.max(min, max - min);
    while (max >= min) {
        x *= max--;
    }
    return x;
}
exports.a = a;
function c(m, n) {
    let x = 1, y = 1;
    let max = Math.max(n, m);
    let min = Math.min(n, m);
    if (min === 0)
        return min;
    min = Math.min(min, max - min);
    while (min > 0) {
        x *= max--;
        y *= min--;
    }
    return x / y;
}
exports.c = c;
function aPick(m, n) {
}
exports.aPick = aPick;
function cPick(nColl, m) {
    if (m === 0)
        return [];
    const n = nColl.length;
    if (m === n)
        return [nColl.slice()];
    const result = [];
    for (let i = 0; i < n; i++) {
        const x = nColl.slice(i, i + 1);
        const subs = m > 1 ?
            cPick(nColl.slice(i + 1), m - 1) :
            [[]];
        for (let j = 0, len = subs.length; j < len; j++) {
            result.push(x.concat(subs[j]));
        }
    }
    return result;
}
exports.cPick = cPick;
