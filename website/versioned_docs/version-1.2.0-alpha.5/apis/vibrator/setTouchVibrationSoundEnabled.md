---
title: setTouchVibrationSoundEnabled
id: version-1.2.0-alpha.5-setTouchVibrationSoundEnabled
original_id: setTouchVibrationSoundEnabled
---

## syberh.vibrator.setTouchVibrationSoundEnabled(Object object)

设置物理按键是否震动。

### 权限


### 参数

#### Object object

| 属性    | 类型     | 必填 | 描述                |
| ------- | -------- | -------- | ------------|
| state   | string   | 是       | 0表示关闭，1表示开启，默认为0                                       |
| success | function | 否       | 成功回调      |
| fail    | function | 否       | 失败回调      |


#### object.success 回调函数参数
#### 参数


#### object.fail回调函数参数
#### 参数
| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误信息 |


### 代码示例
```js
syberh.vibrator.setTouchVibrationSoundEnabled({
    state:"0",
	success:function(result){
        console.log('result: ', result.result);

    },
    fail:function(error){
        console.log('fail: ', error.code, error.msg);
    }
});
```