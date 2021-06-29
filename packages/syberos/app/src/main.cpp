#include "App_Workspace.h"
#include <QByteArray>
#include <QGuiApplication>


bool isExistArg(int argc, char *argv[], const char* s)
{
    if(argc < 1 || strcmp(s, "") == 0){
        return false;
    }
    for(int i=0; i<argc; i++){
        if(strcmp(argv[i], s) == 0){
            return true;
        }
    }
    return false;
}


Q_DECL_EXPORT int main(int argc, char *argv[])
{
    // QT版本大于5.6，给webengine加参数启动
    #if (QT_VERSION >= QT_VERSION_CHECK(5, 6, 0))
    std::vector<char*> new_argv(argv, argv + argc);
    new_argv.push_back(const_cast<char *>("--ignore-gpu-blacklist"));
    new_argv.push_back(nullptr);
    argv = new_argv.data();
    argc = argc + 1;
    #endif

    QByteArray syberhShell = qgetenv("SYBERH_SHELL");
    if(!syberhShell.isEmpty() || isExistArg(argc, argv, "shell")){
        QGuiApplication app(argc, argv);
        new App_Workspace();
        return app.exec();
    }
    return SYBEROS::SyberosGuiCache::qApplication(argc, argv, new App_Workspace());
}
