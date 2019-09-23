---
title: removeAll
id: version-1.1.1-alpha.2-removeAll
original_id: removeAll
---

删除本地存储中的所有键值对。

<!-- 支持`Promise` 使用。 -->

## syberh.storage.removeAll()

### 参数

#### Object object

| 属性    | 类型     | 默认值 | 必填 | 描述     |
| ------- | -------- | ------ | ---- | -------- |
| success | function |        | 是   | 回调成功 |
| fail    | function |        | 是   | 回调失败 |

#### object.success 回调函数参数

#### 参数

| 属性   | 类型    | 必填 | 描述                    |
| ------ | ------- | ---- | ----------------------- |
| result | boolean | 是   | 返回 true, 表示执行成功 |

#### object.fail 回调函数

#### 参数

| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误信息 |

### 代码示例

```javascript
syberh.storage.removeAll({
  success: function(result) {
    console.log('success', result)
  },
  fail: function(error) {
    console.log('fail: ', error.code, error.msg)
  }
})
```

<!-- #### Promise
``` javascript
syberh.storage.removeAll().then(function(result) {
  console.log('success',result);
}).catch(function(error) {
  console.log('fail: ', error.code, error.msg);
})
``` -->
