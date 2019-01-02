'use strict'
const fs = require('fs-extra')

module.exports = async function fetchRemoteRepo() {
  const os = require('os')
  const path = require('path')
  const download = require('download-git-repo')
  const tmpDir = path.join(os.tmpdir(), 'generator-antd-pro')

  await fs.remove(tmpDir)

  return new Promise((resolve, reject) => {
    download('ant-design/ant-design-pro', tmpDir, { clone: false }, err => {
      if (err) {
        return reject(err)
      }
      resolve(tmpDir)
    })
  })
}
