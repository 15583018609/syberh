export default function contactMixin(hybrid) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('contact', [
        {
            namespace: 'pick',
            os: ['syber'],
            defaultParams: {},
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest);
                hybridJs.callInner.apply(this, args);
            },
        },
    ]);
}
