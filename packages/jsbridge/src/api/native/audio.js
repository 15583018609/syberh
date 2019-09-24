export default function audioMixin(hybrid) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('audio', [{
        namespace: 'startPlay',
        os: ['syber'],
        defaultParams: {
            path: '',
            position: 0,
        },
        runCode(...rest) {
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'path',
                'position',
            );
            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'pausePlay',
        os: ['syber'],
    }, {
        namespace: 'continuePlay',
        os: ['syber'],
        defaultParams: {
            position: 0,
        },
        runCode(...rest) {
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'position',
            );
            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'stopPlay',
        os: ['syber'],
    }]);
}