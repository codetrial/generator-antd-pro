'use strict';

const path = require('path');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    this.log(
      yosay(
        `An easy way to build your ${chalk.red('ant-design-pro')} application!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Your awesome project name',
        validate(str) {
          return str.length > 0;
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  prepare() {
    const { projectName } = this.props;

    if (path.basename(this.destinationPath()) !== projectName) {
      this.log(
        `Your project must be inside a folder named ${projectName}\nI'll automatically create this folder.`
      );
      mkdirp(projectName);
      this.destinationRoot(this.destinationPath(projectName));
    }
  }

  writing() {
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
  }

  install() {
    // this.installDependencies();
  }
};
