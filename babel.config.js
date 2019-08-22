// use 'entry' if dependency ships ES5 code, but uses ES6+ features without explicitly listing polyfill requirements
module.exports = {
	presets: [ [ '@vue/app', { useBuiltIns: 'entry' } ] ]
};
