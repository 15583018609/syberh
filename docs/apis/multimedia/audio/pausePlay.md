---
title: pausePlay
---


暂停播放：可以对音频文件进行暂时停止播放。


## syberh.audio.pausePlay()
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
syberh.audio.pausePlay({
	success: function(result){
    console.log('success');    
	},
	fail: function(error){
		console.log('fail: ', error.code, error.msg);
	}
});
```
