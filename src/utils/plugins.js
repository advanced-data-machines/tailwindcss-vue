
import { extendDefaultTheme, setThemeKey } from './theme.js';

export const setComponentTheme = (Vue, args, themeName) => {
	const extend = extendDefaultTheme(args.theme || {}, themeName);
	setThemeKey(themeName, extend);
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
