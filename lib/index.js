'use strict';

var _tmp = require('tmp');

var _tmp2 = _interopRequireDefault(_tmp);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = require('child_process').exec;


module.exports = function (src) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaults = {
    nPoints: 300
  };

  options = _lodash2.default.extend({}, defaults, options);

  var tmpobj = _tmp2.default.fileSync({ postfix: '.json' });
  var cmd = 'audiowaveform -i "' + src + '" -b 8 -o "' + tmpobj.name + '"';

  var p = new Promise(function (resolve, reject) {
    exec(cmd, function (error, stdout, stderr) {
      var samples = require(tmpobj.name).data;
      samples = samples.filter(function (v, i) {
        return i % 2 == 1;
      });
      var peaks = [],
          size = samples.length / options.nPoints;
      for (var i = 0; i < samples.length; i += 2) {
        peaks.push((Math.abs(samples[i]) + samples[i + 1]) / 256);
      }
      var final = [],
          size = peaks.length / options.nPoints;
      while (peaks.length > 0) {
        var t = peaks.splice(0, size).reduce(function (a, v) {
          return a + v;
        });
        final.push((t / size).toFixed(4) * 1);
      }
      resolve(final);
    });
  });

  return p;
};
