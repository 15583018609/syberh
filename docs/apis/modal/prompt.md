---
title: prompt
---

输入框：用户输入信息。

可以设置输入框的标题、按钮文字等，用户点击关闭。

<!-- 支持`Promise` 化使用。 -->

## syberh.modal.prompt(Object object)
### 参数
#### Object object
| 属性     | 类型    | 默认值 | 必填 | 描述                         |
| ---------- | ------- | -------- | ---------------------------- | ---- |
| title | string |  |否 | 标题，最多7个汉字       |
| confirmText | string | 确定 | 否 | 确认按钮文字，最多4个汉字 |
| cancelText | string |  取消 |否 | 取消按钮文字，最多4个汉字 | 
| success | function |  |  是     | 回调成功      |
| fail   | function |  |  是     | 回调失败      |


#### object.success回调函数
#### 参数
#### String result
用户输入的内容, 为""时，表示用户未输入

#### object.fail回调函数
#### 参数
#### Object error
| 属性 | 类型  | 描述 |
| -- | -- | -- |
| code | String | 错误码 |
| msg | String  | 错误信息 |

### 代码示例
```javascript
syberh.modal.prompt({
    content: 'This is a prompt',
    success: function(result) {
        console.log('success',result); 
    },
    fail: function(error) {
        console.log('fail: ', error.code, error.msg);
    }
})
```

<!-- #### Promise
```javascript
syberh.modal.prompt({
    content: 'This is a prompt',
}).then(function(result) {
    console.log('success',result);
}).catch(function(error) {
    console.log('fail: ', error.code, error.msg);
})
``` -->

#### 原生prompt调用
```javascript
var result = prompt('提示', 'This is a prompt')
console.log(result); 
```