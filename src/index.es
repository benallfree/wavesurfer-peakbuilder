'use strict'

let exec = require('child_process').exec;
import tmp from 'tmp'
import _ from 'lodash'
 
module.exports = function(src, options = {}) {
  let defaults = {
    nPoints: 300,
  }
  
  options = _.extend({}, defaults, options)

  let tmpobj = tmp.fileSync({postfix: '.json'})
  let cmd = `audiowaveform -i "${src}" -b 8 -o "${tmpobj.name}"`

  let p = new Promise((resolve,reject)=>{
    exec(cmd, function(error, stdout, stderr) {
      let samples = require(tmpobj.name).data;
      samples = samples.filter( (v,i)=> { return i%2==1; })
      var peaks = [], size = samples.length/options.nPoints;
      for(var i=0; i < samples.length; i+=2)
      {
        peaks.push(((Math.abs(samples[i])+samples[i+1])/256));
      }
      var final = [], size = peaks.length/300;
      while(peaks.length>0)
      {
        var t = peaks.splice(0,size).reduce((a,v) => { return a+v; });
        final.push((t/size).toFixed(4)*1);
      }
      resolve(final);
    });    
  })
  

  return p;
}
