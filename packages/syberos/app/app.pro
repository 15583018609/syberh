include(../syberos.pri)

QT_VERSION = $$[QT_VERSION]
QT_VERSION = $$split(QT_VERSION, ".")
QT_VER_MAJ = $$member(QT_VERSION, 0)
QT_VER_MIN = $$member(QT_VERSION, 1)

lessThan(QT_VER_MAJ, 5) | lessThan(QT_VER_MIN, 6) {
	message(Qt版本小于5.6)
  QT += webkit
} else {
  message(Qt版本大于等于5.6)
  QT += webengine webchannel
}

QT += gui qml quick widgets network multimedia core sql dbus

TEMPLATE = app

TARGET = app

CONFIG += link_pkgconfig
CONFIG += C++11

RESOURCES += res.qrc

PKGCONFIG += syberos-application syberos-application-cache syberos-qt-system syberos-qt

QML_FILES = qml/*.qml

OTHER_FILES += $$QML_FILES *.qm

QMAKE_LFLAGS += -Wl,-rpath=$$INSTALL_DIR/lib
# The .cpp file which was generated for your project.
SOURCES += src/main.cpp \
    src/App_Workspace.cpp


HEADERS += \
    src/App_Workspace.h

# Installation path
target.path = $$INSTALL_DIR/bin

qm.files = *.qm
qm.path = $$INSTALL_DIR/qm

res.files = res/*.png
res.path = $$INSTALL_DIR/res

web.files = www
web.path = $$INSTALL_DIR

INSTALLS += target qm web res

DISTFILES += \
    res/app.png

DEFINES += EX_CONFIG=\\\"$$EX_CONFIG\\\"


DEFINES += TDEBUG

LIB_OUT_DIR = $$clean_path($$PWD/../lib)
LIBS += -L$$LIB_OUT_DIR -lpluginmanager
LIBS += -L$$LIB_OUT_DIR -lnativesdk
