---
title: capturePhoto
---




## syber.camera.capturePhoto（Object object）

进行拍照功能，成功则返回图片文件路径



### **参数**

**Object object**

| 属性    | 类型     | 是否必填 | 描述                                      |
| ------- | -------- | -------- | ----------------------------------------- |
| camera  | number   | 是       | 指定摄像头，`1` ：主摄像头，`2`：辅摄像头 |
| success | function | 否       | 接口调用成功的回调函数                    |
| fail    | function | 否       | 接口调用失败的回调函数                    |

**object.success回调参数**

| 属性 | 类型   | 描述         |
| ---- | ------ | ------------ |
| path | String | 图片文件路径 |

**error回调参数**

| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误消息 |



### **示例代码**

```
syber.camera.capturePhoto({
	camera: '1',
	success: function(result){
		console.log('success: ', result.path);
	},
	error: function(err){
		console.log('error: ', err.code, err.msg);
	}
});
```

