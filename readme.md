# wavesurfer-peakbuilder

This package prebuilds peaks for [wavesurfer.js](https://wavesurfer-js.org/).

By default, wavesurfer must use XHR to download an audio fully before it can draw peaks. Wavesurfer accepts an optional array of precalculated peaks and will use these instead of downloading the complete audio file if the array is supposed. The [audiowaveform](https://github.com/bbc/audiowaveform) tool can be used to build peaks, but its output is not compatible with wavesurfer. This package solves everything by using audiowaveform to build peaks and output them in a wavesurfer-compatible array.

For a more practical example that uses this package, see [gulp-wavesurfer-peakbuilder](https://github.com/benallfree/gulp-wavesurfer-peakbuilder).

```
yarn add wavesurfer-peakbuilder --dev
```

## Usage

`wavesurfer-peakbuilder` requires local access to the audio file. This is necessary so it can prebuild peaks. 
```
import peakbuilder from 'wavesurfer-peakbuilder'

peakbuilder('./path/to/audio.mp3').resolve( (peaks) => {
  console.log(peaks);
}).reject((err)=>{
  console.log(err);
});
```

* 