---
title: confirm
---

确认框用于使用户可以验证或者接受某些信息。当确认框出现后，用户需要点击确定或者取消按钮才能继续进行操作, 支持`Promise` 化使用


## syber.modal.confirm(Object object)
### 参数
#### Object object
| 属性     | 类型   | 默认值  |  是否必填 | 描述                         |
| ---------- | ------- | -------- | -------- | ---------------------------- |
| title | string |  | 否 | 警告框内显示的文字信息 |
| titleIcon | string |       | 否 | 标题左侧的图标 |
| content | string |  | 是 | 确认按钮上显示的文字信息 |
| showCancel | boolean | true | 否 | 取消按钮上显示的文字信息 |
| cancelText | string  | '取消' | 否 | 取消按钮的文字，最多 4 个字符 |
| cancelColor | string | '#000000' | 否 | 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串 |
| confirmText | string | '确定' | 否 | 确认按钮的文字，最多 4 个字符 |
| confirmIcon | string |       | 否 | 确认按钮的图标 |
| confirmColor | string| '#576B95'  | 否 | 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串 |
| success | function |  |  是     | 回调函数      |
| error   | function |  |  是     | 回调函数      |

#### object.success回调函数
#### 参数
#### Object res
| 属性     | 类型    | 说明 |
| ---------- | ------- | -------- | 
| confirm | boolean  | 为 true 时，表示用户点击了确定按钮 |
| cancel | boolean  | 为 true 时，表示用户点击了取消  |

#### object.error回调函数
#### 参数
#### Object error
| 属性 | 类型  | 描述 |
| -- | -- | -- | -- |
| code | String | 错误码 |
| msg | String  | 错误信息 |


### 代码示例
```javascript
    syber.modal.confirm({
        title: '提示',
        content: '这是一个模态弹窗',
        success: function(res) {
            if (res.confirm) {
                console.log('用户点击确定')
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        },
        error: function(error) {
            console.log(error.msg)
        }
    })
```

#### Promise
```javascript
    syber.modal.confirm({
        title: '提示',
        content: '这是一个模态弹窗',
    }).then(function(res) {
        if (res.confirm) {
            console.log('用户点击确定')
        } else if (res.cancel) {
            console.log('用户点击取消')
        }
    }).catch(function(error) {
        console.log(error.msg)
    })
```