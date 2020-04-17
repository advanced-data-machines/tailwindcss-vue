const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const path = args.path;
if (typeof path === 'undefined') {
	console.log('Path is undefined!');
	return;
}

function deleteFolderRecursive(path) {
	if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
		fs.rmdirSync(path, { recursive: true });
	}
}

console.log('Cleaning ' + path);

deleteFolderRecursive(path);

console.log('Successfully cleaned!');
