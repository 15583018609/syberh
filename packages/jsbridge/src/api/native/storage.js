/**
 * 存储
 * @param {*} hybrid
 */
export default function storageMixin(hybrid) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('storage', [{
        namespace: 'setItem',
        os: ['syberos'],
        defaultParams: {
            // 键名
            key: '',
            // 键值
            value: '',
        },
        runCode(...rest) {
            // 兼容字符串形式
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'key',
                'value',
            );
            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'getItem',
        os: ['syberos'],
        defaultParams: {
            // 键名
            key: '',
        },
        runCode(...rest) {
            // 兼容字符串形式
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'key',
            );

            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'removeItem',
        os: ['syberos'],
        defaultParams: {
            // 键名
            key: '',
        },
        runCode(...rest) {
            // 兼容字符串形式
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'key');
            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'getAllKeys',
        os: ['syberos'],
    }, {
        namespace: 'removeAll',
        os: ['syberos'],
        runCode(...rest) {
            // 兼容字符串形式
            const args = innerUtil.compatibleStringParamsToObject.call(this, rest);
            hybridJs.callInner.apply(this, args);
        },
    }]);
}