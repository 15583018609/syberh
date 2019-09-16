---
title: dial
id: version-1.1.0-dial
original_id: dial
---

拨打电话

<!-- 支持`Promise` 使用。 -->

## syberh.telephony.dial(Object object)

### 参数

#### Object object

| 属性    | 类型     | 默认值 | 必填 | 描述     |
| ------- | -------- | ------ | ---- | -------- |
| tel     | String   |        | 是   | 号码     |
| success | function |        | 否   | 回调成功 |
| fail    | function |        | 否   | 回调失败 |

#### object.fail 回调函数

#### 参数

| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误信息 |

### 代码示例

```javascript
syberh.telephony.dial({
  tel: '150xxxxxxxx',
  success: function() {
    console.log('success')
  },
  fail: function(error) {
    console.log('fail: ', error.code, error.msg)
  }
})
```

<!-- #### Promise
```javascript
syberh.telephony.dial({
	tel: "150xxxxxxxx",
}).then(function() {
	console.log('success');
}).catch(function(fail) {
	console.log('fail: ', error.code, error.msg);
});
``` -->
