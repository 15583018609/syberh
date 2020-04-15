#ifndef HELPER_H
#define HELPER_H

#include "nativesdk_global.h"

#include <QtGlobal>
#include <QObject>
#include <cenvironment.h>
#include <cappinfo.h>
#include <QJsonObject>

namespace NativeSdk {

class NATIVESDK_EXPORT Helper : public QObject
{
  Q_OBJECT
public:
  static Helper *instance();

  Q_INVOKABLE QString getWebRootPath();
  Q_INVOKABLE QString getDefaultWebRootPath();
  Q_INVOKABLE QString getDataRootPath();
  Q_INVOKABLE QString getExternStorageRootPath();
  Q_INVOKABLE QString getInnerStorageRootPath();
  //获取日志级别
  Q_INVOKABLE QString logLevelName();

  //获取data/data/x/www路径
  Q_INVOKABLE QString getDataWebRootPath();
  //文件是否存在
  Q_INVOKABLE bool exists(QString filePath);

  Q_INVOKABLE QString sopid();

  Q_INVOKABLE QJsonObject aboutPhone();

  // 获取Qt版本号
  Q_INVOKABLE QString getQtVersion();

  // 获取Qt版本号是否大于5.6.0
  Q_INVOKABLE bool isGtQt56();

  /**
     * @brief emptyDir 清空文件夹
     * @param path
     */
  Q_INVOKABLE bool emptyDir(const QString &path);

  /**
     * @brief isPicture 判断是否是图片
     * @param filepath
     */
  Q_INVOKABLE bool isPicture(QString filepath);

  /**
     * @brief isAudio 判断是否是音频
     * @param filepath
     */
  Q_INVOKABLE bool isAudio(QString filepath);

private:
  explicit Helper(QObject *parent = 0);
  Helper(const Helper &) Q_DECL_EQ_DELETE;
  Helper &operator=(Helper client) Q_DECL_EQ_DELETE;
  static Helper *m_helper;
  CEnvironment *env;
  CAppInfo *appInfo;
};

}
#endif // HELPER_H
