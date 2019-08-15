/*
* This file is part of hybrid-core
*
* Copyright (C) 2014 Beijing Yuan Xin Technology Co.,Ltd.
All rights reserved.
*
* Authors:guohongfei
*
* guohongfei <guohongfei@syberos.com>
*
* This software, including documentation, is protected by
copyright controlled
* by Beijing Yuan Xin Technology Co.,Ltd. All rights are
reserved.
*/

import QtQuick 2.3
import com.syberos.basewidgets 2.0
import QtQuick.Controls 1.4

/*
* This file is part of hybrid-core
*
* Copyright (C) 2014 Beijing Yuan Xin Technology Co.,Ltd.
All rights reserved.
*
* Authors:guohongfei
*
* guohongfei <guohongfei@syberos.com>
*
* This software, including documentation, is protected by
copyright controlled
* by Beijing Yuan Xin Technology Co.,Ltd. All rights are
reserved.
*/

import QtQuick 2.3
import com.syberos.basewidgets 2.0
import QtQuick.Controls 1.4

Rectangle {
    id: stoast;

    /*! 模态框和页面的宽度比例 */
    property real proportion: 840 / 1080

    /*! 提示的内容 */
    property string title: ""
    /*! 提示的延迟时间 */
    property real duration: 1500
    /*! 图标 */
    property string icon: "success"
    /*! 图标路径 */
    property string iconPath: ""
    /*! 一行文本的字符数（英文） */
    property real textLength: 14

    width: proportion * 330
    height: proportion * 330

    anchors.horizontalCenter: parent.horizontalCenter
    anchors.verticalCenter: parent.verticalCenter

    color: "#000000"
    radius: 6
    opacity: 0

    Column {
        spacing: 40;
        anchors.centerIn: parent
        Image {
            id: toastIcon
            anchors.horizontalCenter: parent.horizontalCenter
            width: proportion * 120
            height: proportion * 90
            source: iconPath
            fillMode: Image.PreserveAspectFit
        }

        Text {
            id: toastText
            anchors.horizontalCenter: parent.horizontalCenter
            font.pixelSize: proportion * 40
            text: stoast.title
            color: "white"
        }
    }

    NumberAnimation on opacity {
        id: showAnimation
        duration: 300
        from: 0
        to: 0.8
        running:false
    }

    NumberAnimation on opacity {
        id: hideAnimation
        duration: 500
        from: 0.8
        to: 0
        running:false
    }

    Timer{
        id: closeTimer
        interval: stoast.duration + showAnimation.duration
        repeat: false
        triggeredOnStart: false

        onTriggered: {
            closeTimer.stop()
            if(!hideAnimation.running){
                hideAnimation.start();
            }
        }
    }

    function parseIcon(){

        stoast.width = stoast.proportion * 330
        stoast.height = stoast.proportion * 330
        toastIcon.visible = true;

        if(icon === "success"){
            stoast.iconPath = "toast-true.png";
        }else if(icon === "error"){
            stoast.iconPath = "toast-false.png";
        }else if(icon === "none"){
            toastIcon.visible = false;
            stoast.title = getOutputStr(stoast.title, stoast.textLength);
            stoast.width = stoast.proportion * toastText.contentWidth + 80
            stoast.height = stoast.proportion * toastText.contentHeight + 80
        }
    }

    /*! 显示弹层。 */
    function show() {
        parseIcon();
        if(!showAnimation.running){
            showAnimation.start();
        }
        closeTimer.start();
    }

    /*! 隐藏弹层。 */
    function hide() {
        stoast.opacity = 0;
        if(showAnimation.running){
            showAnimation.stop();
        }
        if(hideAnimation.running){
            hideAnimation.stop();
        }
        closeTimer.stop();
    }

    /*! 获取最终展现字符串。 */
    function getOutputStr(inputStr, maxRowLength){

        if(!inputStr){
            return "";
        }

        var currLength = 0;
        var outputStr = "";
        var lineBreak = false;
        for(var i = 0; i < inputStr.length; i++){
            var item = inputStr.charAt(i);
            //中文字符的长度经编码之后大于4
            if(escape(item).length > 4){
                currLength += 2;
            }else{
                currLength += 1;
            }
            outputStr = outputStr.concat(item);
            //如果未换行且已达到单行字符串最大长度，则给文本换行
            if(!lineBreak && currLength >= maxRowLength){
                outputStr = outputStr.concat("\n");
                lineBreak = true;
            }
        }
        return outputStr;
    }

}



