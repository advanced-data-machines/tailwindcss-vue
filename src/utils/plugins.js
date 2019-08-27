
import { extendDefaultTheme } from './theme.js';

export const setComponentTheme = (Vue, args, themeName) => {
	if (!Vue.prototype.$tailwindVue || !Vue.prototype.$tailwindVue.theme) {
		registerComponentProgrammatic(Vue, 'theme', {});
	}

	const extend = extendDefaultTheme(args.theme || {}, themeName);
	Vue.prototype.$tailwindVue.theme[themeName] = extend;
};

export const installComponents = function(Vue, args, components) {
	components.forEach(component => {
		setComponentTheme(Vue, args, component.name);
		Vue.component(component.name, component);
	});
};

export const registerComponentProgrammatic = (Vue, property, component) => {
	if (!Vue.prototype.$tailwindVue) Vue.prototype.$tailwindVue = {};
	Vue.prototype.$tailwindVue[property] = component;
};
