---
title: delRecorder
id: version-1.1.1-alpha.2-delRecorder
original_id: delRecorder
---


删除录音：可以对录音进行删除。


## syberh.record.delRecorder(Object object)
### 参数
#### Object object
| 属性     | 类型   | 默认值  |  必填 | 描述                         |
| ---------- | ------- | -------- | ---------------- | ----------------------------------|
| path | string |        | 是       | 录音路径                           |
| success | function |        | 否       | 回调成功                    |
| fail   | function |        | 否       | 回调失败                    |

#### object.success回调函数 
#### 参数
| 属性     | 类型    | 必填 | 描述                     |
| ---------- | ------- | -------- | ---------------------- |
| result | boolean  | 是     | 返回true, 表示执行成功  |

#### object.fail回调函数
#### 参数
| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误消息 |



### 代码示例
``` javascript
syberh.record.delRecorder({
  path: "/home/user/record/20190905_1567662466.aac",
	success: function(result){
    console.log('success',result);    
	},
	fail: function(error){
		console.log('fail: ', error.code, error.msg);
	}
});
```
