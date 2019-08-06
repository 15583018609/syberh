---
title: getAllKeys
---

返回一个包含全部已存储项键名的数组, 支持`Promise` 化使用

## getAllKeys(Object object)
### 参数
#### Object object
| 属性     | 类型    | 是否必填 | 描述                         |
| ---------- | ------- | -------- | ---------------------------- |
| success | function | 是       | 回调函数      |
| error   | function | 是       | 回调函数      |


#### object.success回调函数参数
#### 参数
#### Object res
| 属性     | 类型    | 是否必填 | 描述                     |
| ---------- | ------- | -------- | ---------------------- |
| result | boolean  | 是     | result是true, 表示执行成功  |

#### object.error回调函数
#### 参数
#### Object error
| 属性 | 类型  | 是否必填 | 描述 |
| -- | -- | -- | -- |
| code | String  | 是 | 错误码 |
| msg | String  | 是 | 错误码 |

### 代码示例
``` javascript
    syber.storage.getAllKeys({
        success: function(res) {
            console.log(res.result)
        },
        error: function(error) {
            console.log(error.msg)
        }
    })
```

#### Promise
``` javascript
    syber.storage.getAllKeys()
        .then(function(res) {
            console.log(res.result)
        }).catch(function(error) {
            console.log(error.msg)
        })
```