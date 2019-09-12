include(../syberos.pri)
include (../com/syberos/api/com_syberos_api.pri)

QT += gui qml quick widgets webkit network multimedia core

TEMPLATE = app

TARGET = app

CONFIG += link_pkgconfig
CONFIG += C++11

RESOURCES += res.qrc

PKGCONFIG += syberos-application syberos-application-cache syberos-qt-system syberos-qt

QML_FILES = qml/*.qml

OTHER_FILES += $$QML_FILES *.qm

QMAKE_LFLAGS += -Wl,-rpath,$$INSTALL_DIR/lib
# The .cpp file which was generated for your project.
SOURCES += src/main.cpp \
    src/App_Workspace.cpp


HEADERS += \
    src/App_Workspace.h

# Installation path
target.path = $$INSTALL_DIR/bin

qm.files = *.qm
qm.path = $$INSTALL_DIR/qm

res.files = res/app.png
res.path = $$INSTALL_DIR/res

web.files = www
web.path = $$INSTALL_DIR

#LIBS += -L$PWD/../lib -lquazip
#INCLUDEPATH += ../include/quazip

#quazip.files = ../lib/lib*
#quazip.path = $$INSTALL_DIR/lib
#QMAKE_RPATHDIR=$$INSTALL_DIR/lib


#LIBS += -L"/home/lihejia/Desktop/syberos-hysbrid/packages/syberos-template/com/syberos/quazip/lib" -lquazip
#INCLUDEPATH += /home/lihejia/Desktop/syberh/packages/syberos-template/com/syberos/quazip/include/quazip

#quazip.files = /home/lihejia/Desktop/syberh/packages/syberos-template/com/syberos/quazip/include/quazip/lib/*
#quazip.path = $$INSTALL_DIR/libs

#INSTALLS += quazip

INSTALLS += target qm web res

DISTFILES += \
    res/app.png

DEFINES += EX_CONFIG=\\\"$$EX_CONFIG\\\"

DEFINES += TDEBUG
