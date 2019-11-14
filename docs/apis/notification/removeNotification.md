---
title: removeNotification
---


删除指定消息：根据消息id删除状态栏中的指定消息，删除成功则返回true。


> 删除通知消息属于敏感权限,必须获取通知权限,在sopconfig.xml文件中添加如下字段:

``` javascript
<uses-permission syberos:name="syberos.permission.ACCESS_NOTIFICATION"/>
```

## syberh.notification.removeNotification(Object object)
### 参数
#### Object object
| 属性     | 类型   | 默认值  |  必填 | 描述                         |
| ---------- | ------- | -------- | ---------------- | ----------------------------------
| updateId | String |        | 是       | 消息id                    |
| success | function |        | 否       | 回调成功                    |
| fail   | function |        | 否       | 回调失败                    |

### object.success回调函数
#### 参数
| 属性     | 类型    | 必填 | 描述                     |
| ---------- | ------- | -------- | ---------------------- |
| result | boolean  | 是     | 返回true, 表示执行成功  |

### object.fail回调函数
#### 参数
| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误消息 |



### 代码示例
``` javascript
syberh.notification.removeNotification({
  updateId："{ba7b48e3-1e52-484e-85ac-0d7a2149e76c}"，
	success: function(result){
		console.log('success: ', result);
	},
	fail: function(error){
		console.log('fail: ', error.code, error.msg);
	}
});
```
