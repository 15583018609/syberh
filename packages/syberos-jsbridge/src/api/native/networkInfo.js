export default function getInfoMixin(hybrid) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('networkInfo', [{
        namespace: 'getInfo',
        os: ['syber'],
        defaultParams: {
        },
        runCode(...rest) {
            // 兼容字符串形式
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
            );
            hybridJs.callInner.apply(this, args);
        },
    }]);
}
