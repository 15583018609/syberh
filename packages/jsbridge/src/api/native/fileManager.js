import hybridJs from '../../hybrid';

export default function fileManagerMixin() {

    hybridJs.extendModule('fileManager', [
        {
            namespace: 'copy',
            os: ['syberos'],
            defaultParams: {
                srcPath: '',
                destPath: '',
            },
        },
        {
            namespace: 'move',
            os: ['syberos'],
            defaultParams: {
                srcPath: '',
                destPath: '',
            },
        },
        {
            namespace: 'fileList',
            os: ['syberos'],
            defaultParams: {
                srcPath: '',
            },
        },
        {
            namespace: 'getInfo',
            os: ['syberos'],
            defaultParams: {
                srcPath: '',
            },
        },
        {
            namespace: 'remove',
            os: ['syberos'],
            defaultParams: {
                srcPath: '',
                recursive: 0,
            },
        },
    ]);
}
