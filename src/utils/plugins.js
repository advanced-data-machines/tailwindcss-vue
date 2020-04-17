import { extendDefaultTheme, setThemeKey } from './theme.js';

export const setComponentTheme = (Vue, args, themeName, defaultTheme) => {
	const extend = extendDefaultTheme(args.theme || {}, themeName, defaultTheme);
	setThemeKey(themeName, extend);
};

export const installComponents = function(Vue, args, component, defaultTheme) {
	setComponentTheme(Vue, args, component.name, defaultTheme);
	Vue.component(component.name, component);
};

export const useComponent = function(Vue, component) {
	Vue.component(component.name, component);
};

export const registerComponentProgrammatic = (Vue, property, component) => {
	if (!Vue.prototype.$tailwindVue) Vue.prototype.$tailwindVue = {};
	Vue.prototype.$tailwindVue[property] = component;
};
