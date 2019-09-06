import * as net from 'net'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import * as uuid from 'uuid'
import ip from 'internal-ip'
import * as path from 'path';

import { startServer } from './HttpServer';


/**
 * 文件头信息
 */
interface FileHead {
  // 传送ID,可以通过传输id判断是否重新传输
  uid: number
  server: string
  files: [string]
}

interface ServerConfig {
  host?: string
  port: number
}

enum SendStatus {
  // 等待
  WATING = 0,
  // 发送中
  PENDING = 1,
  RESOLVE = 2
}
/**
 * socket 服务端
 */
export default class Server {
  // 当前服务端
  private server: any

  // uid
  private uid: number = 0

  // 默认配置
  private conf: ServerConfig = {
    port: 8080
  }

  // 发送队列
  private queue: any[] = []

  // 发送状态
  private sendStatus: SendStatus

  private timer: any = null

  private httpPort: number = 0;

  // 客户端列表
  private clients: any[] = []

  constructor(config = {}) {
    this.conf = { ...this.conf, ...config }
    // 设置待发送状态
    this.sendStatus = SendStatus.WATING
    this.server = net.createServer()
    this.server.on('listening', async () => {
      // 初始化ip地址
      const vhost = this.conf.host || (await ip.v4())

      this.conf.host = vhost;
      console.log(`syberos-dev-server 服务监听 ${vhost}:${this.conf.port}`)
      console.log(chalk.default.green(`socket 服务监听 ${vhost}:${this.conf.port}`))
      this.httpPort = this.conf.port + 1;

      startServer(this.httpPort);
      console.log(chalk.default.green(`http 服务监听 ${this.httpPort}`))
    })

    this.server.on('close', () => {
      console.log('syberos-dev-server服务端关闭')
    })
    this.server.listen(this.conf.port)
  }

  /**
   * 保存客户端socket
   * @param socket
   */
  private async saveClient(socket: net.Socket) {
    this.clients.push(socket)
  }

  /**
   * 移除socket
   * @param socket
   */
  private async removeClient(socket) {
    const { sid } = socket
    for (let i = 0; i < this.clients.length; i += 1) {
      if (this.clients[i].sid === sid) {
        this.clients.splice(i, 1)
        break
      }
    }
  }

  onConnections(callback) {
    this.server.on('connection', (socket: net.Socket) => {
      Object.assign(socket, { sid: uuid() })
      this.saveClient(socket)

      socket.on('error', e => {
        console.log(`syberos-dev-server:客户端 error: ${e.stack}`)
      })

      socket.on('close', () => {
        this.removeClient(socket)
        console.log('syberos-dev-server:客户端 连接断开')
      })

      socket.on('end', () => {
        console.log('syberos-dev-server:客户端 end')
      })

      typeof callback === 'function' && callback(socket)
    })
  }


  /**
   * 发送文件
   * @param socket
   * @param filePath  文件信息
   * @param callback   发送完成的回调,成功会返回true
   */
  public async writeFile(
    socket: net.Socket,
    fileHead: FileHead,
    filePath: string,
    callback?: Function
  ) {
    // if (!socket) {
    //   throw new Error('socket 不能为空')
    // }

    // this.uid += 1
    // // const hsize=JSON.stringify(obj).length;
    // const objString = JSON.stringify(fileHead)
    // await this.write(socket, objString)
    // // socket.write(objString)
    // let sendSize = 0
    // const packSize = 1024
    // const fd = fs.openSync(filePath, 'r')
    // const buf = Buffer.alloc(packSize)
    // let countData = 0
    // const { name, size } = fileHead.fileInfo
    // console.log(chalk.default.green(`开始发送数据，文件名:${name} ,文件大小:${size}`))
    // while (sendSize < fileHead.fileInfo.size) {
    //   // readSync参数:文件ID,buffer对象,写入buffer的起始位置,写入buffer的结束位置,读取文件的起始位置
    //   fs.readSync(fd, buf, 0, buf.length, sendSize)
    //   const data = buf.toString('hex') // 以十六进制传输
    //   socket.write(data)
    //   sendSize += packSize
    //   countData += buf.length
    // }
    // // 发送完成标志
    // socket.write("#");
    // console.log('发送完成', countData)

    // callback && callback(true)
  }

  /**
   * 添加到队列
   * @param filePath
   * @param callback
   */
  private addQueue(filePath: string, callback?: Function) {

    console.log("队列等待中   addQueue:", filePath);
    if (this.queue.length > 0) {
      // 清空数组
      this.queue = []
    }
    // 保存队列内容
    this.queue.push({ filePath, callback })
  }

  /**
   * 获取当前待传输内容
   */
  private getQueue() {
    // 删除并返回第一个
    return this.queue.shift()
  }

  /**
   * 发送给所有客户端
   * @param filePath
   * @param callback
   */
  public async writeFileToClients(filePath: string) {
    if (!fs.existsSync(filePath)) {
      // throw new Error(`文件:${filePath},不存在,请检查`)
      console.error(`文件:${filePath},不存在,请检查`)
      return
    }

    if (this.sendStatus === SendStatus.PENDING) {
      // 当前状态发送中，加入队列等待
      this.addQueue(filePath)
      return
    }
    // 设置问发送状态
    this.sendStatus = SendStatus.PENDING
    const fileList = [];

    let count = 0
    const { clients } = this
    this.readDirSync(filePath, fileList, (files) => {
      console.log('files length', files.length)

      const splitFiles: any = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const nf = 'www' + file.replace(filePath, '');

        splitFiles.push(nf);
      }
      console.log('----当前客户端数量:', clients.length)
      // console.log('----替换后的地址:', JSON.stringify(splitFiles))
      clients.forEach(async socket => {
        this.uid += 1

        const serverhost = `http://${this.conf.host}:${this.httpPort}/download`;

        console.log('----serverhost:', serverhost)
        // 发送数据格式
        const fileHead: FileHead = {
          uid: this.uid,
          server: serverhost,
          files: splitFiles

        }
        await this.write(socket, JSON.stringify(fileHead));
        count += 1;
      })
    });

    // 启动定时器扫描发送情况
    this.timer = setInterval(() => {
      if (count === clients.length) {
        console.log('-----发送完成')
        clearInterval(this.timer)
        this.timer = null
        // 说明已经发送完成，开始检查队列
        this.sendStatus = SendStatus.RESOLVE
        const queue = this.getQueue()
        if (!queue) {
          return
        }
        console.log('------queue', JSON.stringify(queue))
        // tslint:disable-next-line: no-floating-promises
        this.writeFileToClients(queue.filePath)
      }
    }, 1000)
  }

  readDirSync(dirPath, files: any = [], callback) {
    const pa = fs.readdirSync(dirPath);
    const that = this;
    pa.forEach(function (ele, index) {
      const info = fs.statSync(path.join(dirPath, ele));
      if (info.isDirectory()) {
        console.log('dir: ', ele)
        that.readDirSync(path.join(dirPath, ele), files, null);
      } else {

        const filePath = path.join(dirPath, ele);
        files.push(filePath)
      }
    })

    if (callback) callback(files);
  }

  /**
   * 获取当前链接
   * @param callback 回调方法
   */
  getConnections(callback) {
    this.server.getConnections(callback)
  }

  onEnd(socket, callback) {
    socket.on('end', () => {
      console.log('connect end')
    })
  }

  onClose(callback) {
    this.server.on('close', () => {
      console.log('onClose')
      callback && callback()
    })
  }

  /**
   * 刷新发送soket数据
   * @param socket
   * @param buffer
   */
  async write(socket: net.Socket, buffer: string) {
    return new Promise(function (resole, reject) {

      console.log('--buffer----', buffer)
      socket.write(buffer, function () {
        resole(true)
      })
    })
  }
}
