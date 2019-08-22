import DefaultTheme from '../themes/default/index.js';
import { objectAssign } from '../utils/utils.js';

export const currentTheme = function(args) {
	return {
		...DefaultTheme,
		...args.theme || {}
	};
};

export const extendTheme = function(theme, name) {
	const themeCustom = theme[name];
	const themeDefault = DefaultTheme[name];

	if (themeCustom === undefined) {
		console.warn(`(TV Warn[Install Extend]) - the component '${name}' is invalid`);
		return null;
	}
	return objectAssign({}, themeDefault, themeCustom);
};

export const installComponents = function(Vue, args, components) {
	const current = currentTheme(args);
	if (Vue.prototype.$tvTheme === undefined) Vue.prototype.$tvTheme = {};
	components.forEach(component => {
		const extend = extendTheme(current, component.name);
		if (extend == null) {
			return;
		}
		Vue.component(component.name, component);
		Vue.prototype.$tvTheme[component.name] = extend;
	});
};
