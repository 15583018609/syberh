---
title: getItem
---

传入键名返回对应的键值。

### getItem(options)
### 参数
| 参数名     | 类型    | 是否必填 | 描述                         |
| ---------- | ------- | -------- | ---------------------------- |
| key | string | 是       | 键名 |
| success | function | 是       | 回调函数      |
| error   | function | 是       | 回调函数      |

#### success回调函数参数
| 参数名     | 类型    | 是否必填 | 描述                     |
| ---------- | ------- | -------- | ---------------------- |
| result | boolean  | 是     | result是true, 表示执行成功  |

#### error回调函数参数
| 参数名 | 类型  | 是否必填 | 描述 |
| -- | -- | -- | -- |
| code | String  | 是 | 错误码 |
| msg | String  | 是 | 错误码 |


### 代码示例
``` javascript
    syber.storage.getItem({
        key: 'name',
        success: function(res) {
            console.log(res.result)
        },
        error: function(error) {
            console.log(error.msg)
        }
    })
```