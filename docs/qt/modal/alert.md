---
title: alert
---

### void alert(QString callbackId, QVariant options)
### 参数
| 参数名 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| title | 标题 | QString | -
| message | 内容 | QString | -

### 信号
### void success(long responseID, bool result)
- responseID:	回调ID，用于标识每一次的调用
- result:  返回给页面用的，默认为true
