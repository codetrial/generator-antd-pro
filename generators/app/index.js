'use strict'

const path = require('path')
const mkdirp = require('mkdirp')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const fetchRemoteRepo = require('./fetchRemoteRepo')

module.exports = class extends Generator {
  initializing() {
    this.props = {}
  }

  prompting() {
    this.log(
      yosay(
        `An easy way to build your ${chalk.red('ant-design-pro')} application!`
      )
    )

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your awesome project name:',
        validate(str) {
          return str.length > 0
        }
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Choose the package manager you use:',
        choices: [
          {
            name: 'NPM',
            value: 'npm'
          },
          {
            name: 'Yarn',
            value: 'yarn'
          }
        ],
        default: 'npm'
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }

  prepare() {
    const { projectName } = this.props

    if (path.basename(this.destinationPath()) !== projectName) {
      this.log(
        `\nYour project must be inside a folder named ${chalk.red.bold.underline(
          projectName
        )}.\nIf this folder does not exist, it will be created automatically.\n`
      )
      mkdirp(projectName)
      this.destinationRoot(this.destinationPath(projectName))
    }
  }

  writing() {
    return fetchRemoteRepo().then(repo => {
      this.fs.copy(repo, this.destinationPath(), { globOptions: { dot: true } })
    })
  }

  install() {
    const { packageManager } = this.props

    switch (packageManager) {
      case 'npm':
        this.npmInstall()
        break
      case 'yarn':
        this.yarnInstall()
        break
      default:
        this.installDependencies({
          bower: false
        })
        break
    }
  }

  end() {
    const { projectName } = this.props

    this.log(
      [
        chalk.bold(`All Done!`),
        chalk.green.bold(`cd ${projectName}`),
        chalk.green.bold(`yarn start`)
      ].join('\n')
    )
  }
}
