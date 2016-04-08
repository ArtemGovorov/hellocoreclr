module.exports = function (wallaby) {
  'use strict'

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'bower_components/angular/angular.js', instrument: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false},
      'wwwroot/app/**/*.ts',
      'wwwroot/test/stubs.ts'
    ],
    tests: [
      'wwwroot/test/**/*.spec.ts'
    ],
    testFramework: 'mocha'
  }
}
