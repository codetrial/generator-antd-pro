'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-antd-pro:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ projectName: 'antd-pro-project' });
  });

  it('creates files', () => {
    assert.file(['README.md']);
  });
});
