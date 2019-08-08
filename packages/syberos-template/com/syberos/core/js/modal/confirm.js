/* eslint-disable no-undef */

/***
 * modal.confirm(Object)
 */
function Confirm () {
  var defaultOpts = {
    id: 'confirm',
    name: 'confirm',
    module: 'modal',
    source: '../qml/confirm.qml'
  }
  SyberPlugin.call(this, defaultOpts)

  var that = this

  this.onReady = function (object) {
    console.log('\n')
    console.log('confirm ready', object)
    console.log('\n')
    var component = object || that.object
    component.titleText123 = that.param.title
    component.messageText = that.param.message
    component.show()

    component.accepted.connect(function () {
      console.log('-----confirm accepted')
    })
  }
}

Confirm.prototype = SyberPlugin.prototype
