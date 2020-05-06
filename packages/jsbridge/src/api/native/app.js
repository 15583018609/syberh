import hybridJs from '../../hybrid';

export default function appMixin() {
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('app', [
        {
            namespace: 'setAppOrientation',
            os: ['syberos'],
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(
                    this,
                    rest,
                    'orientation',
                );
                hybridJs.callInner.apply(this, args);
            },
        },
    ]);
}
