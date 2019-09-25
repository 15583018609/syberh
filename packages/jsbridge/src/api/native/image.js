export default function imageMixin(hybrid) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('image', [
        {
            namespace: 'chooseImage',
            os: ['syber'],
            defaultParams: {
                count: 9,
                sourceType: ['camera', 'album'],
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(
                    this,
                    rest,
                    'count',
                    'sourceType',
                );
                hybridJs.callInner.apply(this, args);
            },
        },
        {
            namespace: 'previewImage',
            os: ['syber'],
            defaultParams: {
                urls: [],
                current: '',
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(
                    this,
                    rest,
                    'urls',
                    'current',
                );
                hybridJs.callInner.apply(this, args);
            },
        },
    ]);
}
