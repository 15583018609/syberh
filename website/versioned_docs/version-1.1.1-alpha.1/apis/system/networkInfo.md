---
title: networkInfo
id: version-1.1.1-alpha.1-networkInfo
original_id: networkInfo
---

## syberh.system.networkInfo(Object object)

获取网络信息。

### 权限
需要申请 `syberos.permission.READ_NETWORK_STATE` 敏感权限才可以调用

### 参数

#### Object object

| 属性    | 类型     | 必填 | 描述                                                         |
| ------- | -------- | -------- | ------------------------------------------------------------ |
| success | function | 否       | 成功回调                                       |
| fail    | function | 否       | 失败回调                                       |

#### object.success 回调函数参数
#### 参数
| 属性           | 类型    | 描述                                 |
| -------------- | ------  | ------------------------------------ |
| networkType               | string  | 返回当前网络类型。|
| isNetworkAvailable        | boolean   | 当前网络是否可用。可用返回 true ，不可用返回 false 。      |
| isWifiConnected           | boolean   | 返回当前WiFi是否处于连接状态。WiFi连接返回 true，否则返回 false 。|
| wifiSignalStrength        | int   |返回当前信号强度。-1 表示WiFi网络不可用，-2 表示获取数据失败。      |

#### object.success.networkType 回调函数参数
#### 网络类型 

| 值            | 描述                                 |
| ------        | ------------------------------------ |
| 0             | 无网络                                |
| 1             | WiFi网络                              |
| 2             | 数据网络                               |
| 3             | 以太网网络                             |


#### object.fail回调函数参数
#### 参数
| 属性 | 类型   | 描述     |
| ---- | ------ | -------- |
| code | String | 错误码   |
| msg  | String | 错误信息 |


### 代码示例
```js
syberh.networkInfo.info({
	success:function(result){
        console.log('networkType: ', result.networkType);
        console.log('isNetworkAvailable: ', result.isNetworkAvailable);
        console.log('isWifiConnected: ', result.isWifiConnected);
        console.log('wifiSignalStrength: ', result.wifiSignalStrength);
    },
    fail:function(error){
        console.log('fail: ', error.code, error.msg);
    }
});
```