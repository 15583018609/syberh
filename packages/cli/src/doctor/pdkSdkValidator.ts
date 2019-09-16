import * as helper from '../syberos/helper'
import * as fs from 'fs-extra'
import * as path from 'path'
import { IErrorLine } from './interface'

async function buildReport(errors: IErrorLine[]) {
  return {
    desc: '检查系统编译环境',
    lines: errors
  }
}

async function checkSyberosPdk(): Promise<IErrorLine[]> {
  const pdkPath = await helper.locatePdk()
  const errorLines: IErrorLine[] = []

  if (!fs.pathExistsSync(pdkPath)) {
    errorLines.push({
      desc: '没有检查到Syberos-Pdk目录:' + pdkPath,
      valid: true,
      solution: '请重新安装sdk，并使用默认的安装路径，切勿修改sdk安装路径'
    })
    return errorLines
  }
  if (!fs.existsSync(path.join(pdkPath, 'sdk', 'sdk-root', 'syberos-sdk-chroot'))) {
    errorLines.push({
      desc: '无效的Syberos-Pdk目录:' + pdkPath,
      valid: true,
      solution: '请重新安装sdk，并使用默认的安装路径，切勿修改sdk安装路径'
    })
  }
  return errorLines
}

async function checkTarget(): Promise<IErrorLine[]> {
  const pdkPath = await helper.locatePdk()
  const errorLines: IErrorLine[] = []

  const targetPath = path.join(pdkPath, 'targets')
  if (!fs.pathExistsSync(targetPath)) {
    errorLines.push({
      desc: '没有检查到targets目录:' + targetPath,
      valid: true,
      solution: '请安装target，并使用默认的安装路径，切勿修改target安装路径'
    })
    return errorLines
  }
  const dirs = fs.readdirSync(targetPath)
  if (!dirs || dirs.length < 1 || !dirs.some((d) => { return d.startsWith('target-') })) {
    errorLines.push({
      desc: '未安装任何target',
      valid: true,
      solution: '请安装target，并使用默认的安装路径，切勿修改target安装路径'
    })
    return errorLines
  }
  return errorLines
}

async function checkSyberOSSDK(): Promise<IErrorLine[]> {
  const sdkPath = await helper.locateSdk()
  const errorLines: IErrorLine[] = []
  if (!fs.pathExistsSync(sdkPath)) {
    errorLines.push({
      desc: '没有检查到SyberOS-SDK目录:' + sdkPath,
      valid: true,
      solution: '请重新安装SyberOS SDK'
    })
    return errorLines
  }
  if (!fs.existsSync(path.join(sdkPath, 'ide', 'bin', 'qtcSyberIDE'))) {
    errorLines.push({
      desc: '无效的SyberOS-SDK目录:' + sdkPath,
      valid: true,
      solution: '请重新安装SyberOS SDK'
    })
  }
  return errorLines
}

export default async function () {
  const errorLines = await checkSyberosPdk()
  errorLines.push(...await checkTarget())
  errorLines.push(...await checkSyberOSSDK())
  return buildReport(errorLines)
}
