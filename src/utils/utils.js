const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {}

export function hasOwn(obj, key) {
	return hasOwnProperty.call(obj, key);
}

export const isEmpty = function(val) {
	// null or undefined
	if (val == null) return true;
	// boolean
	if (typeof val === 'boolean') return false;
	// number
	if (typeof val === 'number') return !val;
	// errors
	if (val instanceof Error) return val.message === '';
	// objects
	switch (Object.prototype.toString.call(val)) {
	// String or Array
	case '[object String]':
	case '[object Array]':
		return !val.length;

	// Map or Set or File
	case '[object File]':
	case '[object Map]':
	case '[object Set]': {
		return !val.size;
	}
	// Plain Object
	case '[object Object]': {
		return !Object.keys(val).length;
	}
	}
	return false;
};

export const objectAssign = function(target) {
	for (let i = 0; i < arguments.length; i++) {
		const source = arguments[i] || {};
		// eslint-disable-next-line no-unused-vars
		for (const prop in source) {
			if (hasOwn(source, prop)) {
				const value = source[prop];
				if (value !== undefined) {
					target[prop] = value;
				}
			}
		}
	}
	return target;
};

export function getPropByPath(obj, path, strict) {
	let tempObj = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');

	const keyArr = path.split('.');
	let i = 0;
	for (let len = keyArr.length; i < len - 1; ++i) {
		if (!tempObj && !strict) break;
		const key = keyArr[i];
		if (key in tempObj) {
			tempObj = tempObj[key];
		} else {
			if (strict) {
				throw new Error('please transfer a valid prop path to form item!');
			}
			break;
		}
	}
	return {
		o: tempObj,
		k: keyArr[i],
		v: tempObj ? tempObj[keyArr[i]] : null
	};
}

export function getValueByPath(obj, path) {
	const value = path.split('.').reduce((o, i) => o[i], obj);
	return value;
}

export function indexOf(array, obj, fn) {
	if (!array) return -1;
	if (!fn || typeof fn !== 'function') return array.indexOf(obj);

	for (let i = 0; i < array.length; i++) {
		if (fn(array[i], obj)) {
			return i;
		}
	}

	return -1;
}
