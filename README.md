# Kit

项目里常用的工具库函数，可以配合 ramda.js 或者 lodash.js 进行柯里化再使用

## 使用

#### 安装
```bash
$ yarn add @coloration/kit
```

#### 使用

``` js
import { arrAdd } from '@coloration/kit'
// or
import { addRemove } from '@coloration/kit/lib/array'


const arr = arrAdd(undefined, [1, 2, 3, 4], [2, 4, 5, 7])
// [1, 2, 3, 4, 5, 7]
const arr2 = arrRemove(undefined, arr, [8, 7, 6, 5])
// [1, 2, 3, 4]
```

## 项目结构

- ★: 实现已测试
- ☆: 实现未测试
- \[empty\]: 未实现

``` 
/-src
|- [★]array.ts/
|  |- [★Function]isArr
|  |- [★Function]toArr
|  |- [★Function]arrAdd
|  |- [★Function]arrRemove
|  |-...
|
|- [★]object.ts/
|  |- [★Function]isObj
|  |- [★Function]objHas
|  |- [★Function]objGet
|  |-...
|
|- [★]string.ts/
|  |- [★Function]isStr
|  |-...
|
|- [★]math.ts/
|  |- [★Function]c
|  |- [★Function]a
|  |- [☆Function]cPick
|  |- [Function]aPick
|  |-...
|
|- []color.ts/
```


## 构建发布

``` bash
$ yarn test
$ yarn build

$ npm config set registry your_registry_address
$ npm login 
$ npm publish --access public
```