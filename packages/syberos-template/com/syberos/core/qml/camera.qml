import QtQuick 2.0
import QtMultimedia 5.2
import com.syberos.basewidgets 2.0

CPage {
    id: cameraPage

    property string imgPath

    signal back(string path)

    Camera {
        id: cameraObj

        cameraPosition: Camera.BackFace //设置后置摄像头
        captureMode: Camera.CaptureStillImage //相机捕捉图片
        flash.mode: Camera.FlashRedEyeReduction //控制照相机闪光灯的方法和属性。红眼减少闪光
        imageProcessing.whiteBalanceMode: CameraImageProcessing.WhiteBalanceFlash //调整相机图像处理参数的方法和属性。闪光白平衡模式

        exposure {
            exposureCompensation: -1.0
            exposureMode: Camera.ExposurePortrait //曝光模式
        }

        imageCapture {
            //捕捉了图片，又没有保存到磁盘时，这个信号被发射
            onImageCaptured: {
                photoPreview.source = preview
            }
            //捕捉的图片被写入磁盘时，这个信号被发射
            onImageSaved: {
                imgPath = "file://" + path
                photoPreview.source = imgPath
            }
            //捕捉请求出现错误
            onCaptureFailed: {
                console.log("image onCaptureFailed! reqId: " + requestId)
                console.log("image onCaptureFailed! message:  " + message)
            }
        }
    }

    VideoOutput {
        source: cameraObj
        orientation: -90 //摄像头旋转90度
        focus: visible // 接收焦点并在可见时捕获关键事件
    }

    Image {
        id: photoPreview
        anchors.fill: parent
        focus: visible
        //        rotation: +90
        MouseArea {
            anchors.fill: parent
            onClicked: {
                photoPreview.source = ""
            }
        }
    }

    //底部靠左 返回不保存操作
    Rectangle {
        id: backRect
        width: 65 * 2
        height: width
        radius: 65 //弧度大小
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 40
        anchors.left: parent.left
        anchors.leftMargin: 50

        MouseArea {
            anchors.fill: parent
            onClicked: {
                cameraObj.stop() //返回前关闭相机功能
                back(null)
            }
        }

        Image {
            id: backImg
            source: "/res/back.png"
            anchors.fill: parent
        }
    }

    //底部居中 拍照操作
    Rectangle {
        id: captureRect
        width: 65 * 2
        height: width
        radius: 65 //弧度大小
        anchors.bottomMargin: 40
        anchors.bottom: parent.bottom
        anchors.horizontalCenter: parent.horizontalCenter

        MouseArea {
            anchors.fill: parent
            visible: cameraObj.imageCapture.ready
            onClicked: cameraObj.imageCapture.capture()
        }

        Image {
            id: captureImg
            source: "/res/start.png"
            anchors.fill: parent
        }
    }

    //底部靠右 返回保存操作
    Rectangle {
        id: saveRect
        width: 65 * 2
        height: width
        radius: 65 //弧度大小
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 40
        anchors.right: parent.right
        anchors.rightMargin: 50

        MouseArea {
            anchors.fill: parent
            onClicked: {
                cameraObj.stop() //返回前关闭相机功能
                back(imgPath)
            }
        }

        Image {
            id: saveImg
            source: "/res/save.png"
            anchors.fill: parent
        }
    }

    //左上角 切换摄像头操作
    Rectangle {
        id: switchRect
        width: 35 * 2
        height: width
        radius: 35 //弧度大小
        anchors.top: parent.top
        anchors.topMargin: 50
        anchors.right: parent.right
        anchors.rightMargin: 10

        MouseArea {
            anchors.fill: parent
            onClicked: {
                var postition = cameraObj.cameraPosition
                console.log("---------------------------------------cameraObj.cameraPosition--front: " + cameraObj.cameraPosition)
                if (postition === 1) {
                    cameraObj.cameraPosition = Camera.FrontFace
                } else if (postition === 2) {
                    cameraObj.cameraPosition = Camera.BackFace
                }
                console.log("---------------------------------------cameraObj.cameraPosition--after: " + cameraObj.cameraPosition)
            }
        }

        Image {
            id: switchImg
            source: "/res/switch.png"
            anchors.fill: parent
        }
    }
}
