# Coloration/Kit

- [Document](https://coloration.github.io/#/kit)


#### Start Up

```bash
$ npm install @coloration/kit -S
```

#### Use

``` js
import { arrayAdd, arrayRemove, curry } from '@coloration/kit'

const arrAdd = curry(arrayAdd, undefined)
const arr = arrAdd([1, 2, 3, 4], [2, 4, 5, 7])
// [1, 2, 3, 4, 5, 7]
const arr2 = arrayRemove(undefined, arr, [8, 7, 6, 5])
// [1, 2, 3, 4]
```
