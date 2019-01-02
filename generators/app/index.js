'use strict'

const path = require('path')
const mkdirp = require('mkdirp')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const fetchRemoteRepo = require('./fetchRemoteRepo')

const cwd = process.cwd()

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
      this.log()
      this.log(
        `Your project must be inside a folder named ${chalk.red.bold.underline(
          projectName
        )}.`
      )
      this.log(
        `If this folder does not exist, it will be created automatically.`
      )
      this.log()

      mkdirp(projectName)

      this.destinationRoot(this.destinationPath(projectName))
    }
  }

  writing() {
    return fetchRemoteRepo().then(repo => {
      this.fs.copy(repo, this.destinationPath(), {
        globOptions: { dot: true }
      })
    })
  }

  install() {
    const { packageManager } = this.props

    this.log()
    this.log(`📦  Installing additional dependencies...`)
    this.log()

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
    const { projectName, packageManager } = this.props

    this.log()
    this.log(`🎉  Successfully created project ${chalk.yellow(projectName)}.`)
    this.log(
      `👉  Get started with the following commands:\n\n` +
        (this.destinationPath() === cwd
          ? ``
          : chalk.cyan(` ${chalk.gray('$')} cd ${projectName}\n`)) +
        chalk.cyan(
          ` ${chalk.gray('$')} ${
            packageManager === 'yarn' ? 'yarn start' : 'npm run start'
          }`
        )
    )
    this.log()
  }
}
