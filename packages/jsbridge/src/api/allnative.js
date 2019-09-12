import modalMixin from './native/modal';
import webviewMix from './native/webview';
import runtimeMixin from './native/runtime';
import deviceMixin from './native/device';
import pageMixin from './native/page';
import navigatorMixin from './native/navigator';
import utilMixin from './native/util';
import downloadMixin from './native/download';
import telephonyMixin from './native/telephony';
import storageMixin from './native/storage';
import systemMixin from './native/system';
import networkMixin from './native/network';
import captureMixin from './native/capture';
import clipboardMixin from './native/clipboard';
import audioMixin from './native/audio';
import urlMixin from './native/url';
import filepickerMixin from './native/filepicker';
import networkInfoMixin from './native/networkInfo';
import batteryMixin from './native/battery';
import networkDisabledMixin from './native/networkDisabled';
import networkEnabledMixin from './native/networkEnabled';
import fileManagerMixin from './native/fileManager';

// const hybridJs = window.syber;
export default function allNative(hybridJs) {
    // 下载模块
    downloadMixin(hybridJs);
    modalMixin(hybridJs);
    webviewMix(hybridJs);
    runtimeMixin(hybridJs);
    deviceMixin(hybridJs);
    pageMixin(hybridJs);
    navigatorMixin(hybridJs);
    utilMixin(hybridJs);
    telephonyMixin(hybridJs);
    storageMixin(hybridJs);
    systemMixin(hybridJs);
    networkMixin(hybridJs);
    captureMixin(hybridJs);
    clipboardMixin(hybridJs);
    audioMixin(hybridJs);
    networkInfoMixin(hybridJs);
    batteryMixin(hybridJs);
    networkDisabledMixin(hybridJs);
    networkEnabledMixin(hybridJs);
    fileManagerMixin(hybridJs);
    urlMixin(hybridJs);
}