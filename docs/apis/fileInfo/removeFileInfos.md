---
title: removeFileInfos
---

### syber.fileinfos.removeFileInfos(Object object)

> 删除某个保存的文件

### 入参

> Object类型，属性如下：

属性 | 类型 | 必填 | 描述
---|---|---|---
src | String | 是 | 图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径
success | Function | 否 | 调用成功的回调函数
error | Function | 否 | 调用失败的回调函数


### 示例代码
```javascript
syber.fileinfos.removeFileInfos({
      src: 'http://*/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg',
      success: function(res) {
        console.log(res);
      },
      error: function(res) {
        console.log(res);
      }
    });
	
syber.fileinfos.removeFileInfos({
      src: 'http://*/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg'
    }).then(function(res) {
		console.log(res);
	}).catch(function(res) {
		console.log(res);
	});
```