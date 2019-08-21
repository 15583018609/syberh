#include "download.h"
#include "helper.h"

#include <QNetworkAccessManager>
#include <QJsonObject>
#include <QDir>
#include <QObject>
#include <QDebug>

//key 既是downloadID也是callbackId
static QMap<QString, TaskInfo*> tasks;


QString getDownloadPath(){
    Helper *helper = Helper::instance();
    QString sopid = helper->sopid();

    QString downloadPath = helper->getInnerStorageRootPath() + "/" + sopid;
    if(!helper->exists(downloadPath)){
        QDir dir(downloadPath);
        dir.mkpath(downloadPath);
    }
    return downloadPath;
}

QJsonObject successJson(QString callbackId, QString path, int status, qint64 received, qint64 total){
    QJsonObject json;
    json.insert("downloadID", callbackId);
    json.insert("path", path);
    json.insert("status", status);
    json.insert("received", received);
    json.insert("total", total);
    return json;
}


int Download::typeId = qRegisterMetaType<Download *>();

Download::Download()
{
}

Download::~Download() {
    QMap<QString, TaskInfo*>::ConstIterator it = tasks.begin();
    for(; it!=tasks.end(); it++){
        TaskInfo *taskInfo = it.value();
        delete taskInfo;
    }
    tasks.clear();
}



void Download::request(QString callbackId, QString actionName, QVariantMap params)
{
    qDebug() << Q_FUNC_INFO << "callbackId" << callbackId << "actionName" << actionName << "params" << params << endl;

    if (actionName == "start") {
        start(callbackId, params.value("url").toString(), params.value("name").toString());
    } else if (actionName == "cancel"){
        cancel(params.value("downloadID").toString());
    } else {
        emit failed(callbackId.toLong(), 500, "Invalid call");
    }
}

void Download::submit(QString typeID,QString callBackID,QString actionName,QVariant dataRowList, QVariant attachementes){
    Q_UNUSED(typeID)
    Q_UNUSED(callBackID)
    Q_UNUSED(actionName)
    Q_UNUSED(dataRowList)
    Q_UNUSED(attachementes)
}

void Download::start(QString callbackId, QString url, QString name){
    if (name.isEmpty()) {
        name = callbackId;
    }
    qDebug() << Q_FUNC_INFO << "url:" << url << "name:" << name << endl;

    DownloadManager *downloadManager = new DownloadManager(this);
    downloadManager->setDownloadId(callbackId);

    connect(downloadManager, &DownloadManager::signalDownloadProcess, this, &Download::onDownloadProcess);
    connect(downloadManager, &DownloadManager::signalReplyFinished, this, &Download::onReplyFinished);

    TaskInfo *taskInfo = new TaskInfo();
    taskInfo->downloadID = callbackId;
    taskInfo->downloadManager = downloadManager;
    tasks.insert(callbackId, taskInfo);

    QString path = getDownloadPath() + "/" + name;
    downloadManager->downloadFile(url, path);

    QJsonObject json = successJson(callbackId, path, Started, 0, 0);
    emit success(callbackId.toLong(), json);
}

void Download::cancel(QString downloadID){
    if (downloadID == "") {
        emit failed(downloadID.toLong(), 500, "downloadID为空");
        return;
    }
    if (!tasks.contains(downloadID)) {
        emit failed(downloadID.toLong(), 500, "下载任务不存在或已完成");
        return;
    }
    TaskInfo *taskInfo = tasks.value(downloadID);
    taskInfo->downloadManager->closeDownload();

    QJsonObject json;
    json.insert("result", true);
    emit success(taskInfo->downloadID.toLong(), json);
}


TaskInfo* Download::findTaskInfo(DownloadManager *downloadManager){
    QMap<QString, TaskInfo*>::ConstIterator it = tasks.begin();
    for(; it!=tasks.end(); it++){
        TaskInfo *taskInfo = it.value();
        if(taskInfo->downloadManager == downloadManager){
            return taskInfo;
        }
    }
    return NULL;
}


// 更新下载进度;
void Download::onDownloadProcess(QString downloadId, QString path, qint64 bytesReceived, qint64 bytesTotal) {
    QJsonObject json = successJson(downloadId, path, Downloading, bytesReceived, bytesTotal);
    qDebug() << Q_FUNC_INFO << "downloadProgress" << json << endl;
    emit success(downloadId.toLong(), json);
}


void Download::onReplyFinished(QString downloadId, QString path, int statusCode, QString errorMessage){
    qDebug() << Q_FUNC_INFO << "download finished " << statusCode << errorMessage << endl;

    qint64 received = 0;
    qint64 total = 0;
    TaskInfo *taskInfo = tasks.value(downloadId);
    if(taskInfo!=NULL){
        received = taskInfo->downloadManager->getBytesReceived();
        total = taskInfo->downloadManager->getBytesTotal();
    }
    // 根据状态码判断当前下载是否出错;
    if (statusCode > 200 && statusCode < 400) {
        qDebug() << Q_FUNC_INFO << "download failed " << statusCode << errorMessage << endl;
        emit failed(downloadId.toLong(), statusCode, errorMessage);
    }
    else {
        QJsonObject json = successJson(downloadId, path, Completed, received, total);

        qDebug() << Q_FUNC_INFO << "download success " << statusCode << errorMessage << endl;
        emit success(downloadId.toLong(), json);
    }
    if(taskInfo!=NULL){
        disconnect(taskInfo->downloadManager, &DownloadManager::signalDownloadProcess, this, &Download::onDownloadProcess);
        disconnect(taskInfo->downloadManager, &DownloadManager::signalReplyFinished, this, &Download::onReplyFinished);
        tasks.remove(downloadId);
        delete taskInfo;
        taskInfo = NULL;
    }
}
