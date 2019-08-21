/* eslint-disable no-undef */

/***
 * modal.confirm(Object)
 */
function Confirm () {
  var defaultOpts = {
    id: 'confirm',
    name: 'confirm',
    module: 'modal',
    methods: ['confirm'],
    source: '../qml/SConfirm.qml'
  }
  SyberPlugin.call(this, defaultOpts)

  // 默认是否绑定接受信号
  this.acceptedConnect = false
  // 默认是否绑定接受信号
  this.rejectedConnect = false

  var that = this

  this.on('confirm', function (object) {

    console.log('\n')
    console.log('confirm ready', JSON.stringify(that.param))
    console.log('\n')
    var component = object || that.object

    component.titleText = that.param.title || ''
    component.icon = that.param.titleIcon||""
    component.messageText = that.param.content || ''
    component.acceptButtonLoading = that.param.showLoading  || false
    component.rejectButtonVisible = that.param.showCancel  || false
    component.rejectButtonText = that.param.cancelText || '取消'
    component.rejectButtonColor = that.param.cancelColor || '#333333'
    component.acceptedButtonText = that.param.confirmText || '确定'
    component.acceptButtonColor = that.param.confirmColor || '#007aff'

    component.show()


    // 只做一次信号绑定,防止多次信号被触发
    if(!that.acceptedConnect) {
        // 确认事件
        component.accepted.connect(function() {
            // 设置绑定信号
            that.acceptedConnect = true
            // 此处必须用that.xx ，因为后续的参数不会被传到该方法范围内
            WEBVIEWCORE.trigger('success', that.handlerId, { confirm: true })
            // 清理相关参数信息
            that.clearParam()
        })
    }

    // 只做一次信号绑定,防止多次信号被触发
    if(!that.rejectedConnect) {
        // 确认事件
        component.rejected.connect(function() {
            // 设置绑定信号
            that.rejectedConnect = true
            // 此处必须用that.xx ，因为后续的参数不会被传到该方法范围内
            WEBVIEWCORE.trigger('success', that.handlerId, { cancel: true })
            // 清理相关参数信息
            that.clearParam()
        })
    }

  })

}

Confirm.prototype = SyberPlugin.prototype
