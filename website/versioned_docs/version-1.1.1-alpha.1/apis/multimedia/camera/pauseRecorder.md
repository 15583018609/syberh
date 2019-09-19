---
title: pauseRecorder
id: version-1.1.1-alpha.1-pauseRecorder
original_id: pauseRecorder
---


暂停录音：可以对录音进行暂时停止。

> 录音功能属于敏感权限,要实现录音必须获取录音权限以及数据存储权限,在sopconfig.xml文件中添加如下字段:

``` javascript
<uses-permission syberos:name="syberos.permission.RECORD"/>
<uses-permission syberos:name="syberos.permission.ACCESS_STORAGE"/>
```


## syberh.audio.pauseRecorder(Object object)
#### Object object
| 属性     | 类型   | 默认值  |  必填 | 描述                         |
| ---------- | ------- | -------- | ---------------- | ----------------------------------|
| success | function |        | 否       | 回调成功                    |
| fail   | function |        | 否       | 回调失败                    |

**object.fail回调函数**
#### 参数
| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误消息 |



### **代码示例**
``` javascript
syberh.audio.pauseRecorder({
	success: function(result){
    console.log('success');    
	},
	fail: function(error){
		console.log('fail: ', error.code, error.msg);
	}
});
```
