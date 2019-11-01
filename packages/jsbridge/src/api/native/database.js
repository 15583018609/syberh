export default function databaseMixin(hybrid) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('database', [{
        namespace: 'createTable',
        os: ['syberos'],
        defaultParams: {
            sql: '',
            sqlindex: '',
            databaseName: '',
        },
        runCode(...rest) {
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'sql',
                'sqlindex',
                'databaseName',
            );
            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'selectOperate',
        os: ['syberos'],
        defaultParams: {
            sql: '',
            databaseName: '',
        },
        runCode(...rest) {
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'sql',
                'databaseName',
            );
            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'execOperate',
        os: ['syberos'],
        defaultParams: {
            sql: '',
            databaseName: '',
        },
        runCode(...rest) {
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'sql',
                'databaseName',
            );
            hybridJs.callInner.apply(this, args);
        },
    }, {
        namespace: 'isDataExists',
        os: ['syberos'],
    }, {
        namespace: 'isTableExists',
        os: ['syberos'],
        defaultParams: {
            tableName: '',
            databaseName: '',
        },
        runCode(...rest) {
            const args = innerUtil.compatibleStringParamsToObject.call(
                this,
                rest,
                'tableName',
                'databaseName',
            );
            hybridJs.callInner.apply(this, args);
        },
    }]);
}