import * as path from 'path'
import Server, { Watcher } from '@syberos/dev-server/dist/index'
import { AppBuildConfig } from '../util/constants'
import Build from './build'
import { getProjectConfig } from '../syberos/helper'

/**
 * 编译APP
 * @param appPath 工程目录
 * @param param1 参数信息
 */
export const build = (appPath: string, config: AppBuildConfig) => {
  const newConfig = { ...config, ...getProjectConfig(appPath) }
  let serverPort = 4399;
  if (!newConfig.port) {
    Object.assign(newConfig, { port: serverPort })
  }
  const build = new Build(appPath, newConfig)
  if (newConfig.onlyBuildSop === true) {
    build.buildSop()
  } else {
    build.start()
  }

  const server = new Server({ prot: serverPort })

  const wpath = path.join(appPath, 'www')
  new Watcher(server, wpath)
}
