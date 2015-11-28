'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crossSpawnAsync = require('cross-spawn-async');

var _lodashAssign = require('lodash.assign');

var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

exports['default'] = crossEnv;

var envSetterRegex = /(\w+)=(\w+)/;

function crossEnv(args) {
  var _getCommandArgsAndEnvVars = getCommandArgsAndEnvVars(args);

  var _getCommandArgsAndEnvVars2 = _slicedToArray(_getCommandArgsAndEnvVars, 3);

  var command = _getCommandArgsAndEnvVars2[0];
  var commandArgs = _getCommandArgsAndEnvVars2[1];
  var env = _getCommandArgsAndEnvVars2[2];

  if (command) {
    return (0, _crossSpawnAsync.spawn)(command, commandArgs, { stdio: 'inherit', env: env });
  }
}

function getCommandArgsAndEnvVars(args) {
  var command = undefined;
  var envVars = (0, _lodashAssign2['default'])({}, process.env);
  var commandArgs = args.slice();
  while (commandArgs.length) {
    var shifted = commandArgs.shift();
    var match = envSetterRegex.exec(shifted);
    if (match) {
      envVars[match[1]] = match[2];
    } else {
      command = shifted;
      break;
    }
    envVars.APPDATA = process.env.APPDATA;
  }
  return [command, commandArgs, envVars];
}
module.exports = exports['default'];