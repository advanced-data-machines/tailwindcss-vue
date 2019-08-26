
// import { installComponents } from './utils/plugins.js';
import Alert from './components/alert/index.js';
import AlertNotice from './components/alert-notice/index.js';
import Button from './components/button/index.js';
import Checkbox from './components/checkbox/index.js';
import CheckboxButton from './components/checkbox-button/index.js';
import Form from './components/form/index.js';
import FormGroup from './components/form-group/index.js';
import Input from './components/input/index.js';
import Label from './components/label/index.js';
import Radio from './components/radio/index.js';
import RadioButton from './components/radio-button/index.js';
import Select from './components/select/index.js';
import SideMenu from './components/side-menu/index.js';
import SideMenuItem from './components/side-menu-item/index.js';
import SideSubmenu from './components/side-submenu/index.js';

// components to be used
const components = [
	Alert,
	AlertNotice,
	Button,
	Checkbox,
	CheckboxButton,
	Form,
	FormGroup,
	Input,
	Label,
	Radio,
	RadioButton,
	Select,
	SideMenu,
	SideMenuItem,
	SideSubmenu
];

// use components
const install = function(Vue, args = {}) {
	if (this.installed) {
		console.warn('(TV Warn[Install]) - install is being called more then again');
		return;
	}
	this.installed = true;
	const componentList = (args.components && Array.isArray(args.components)) || components;
	componentList.forEach(component => {
		Vue.use(component);
	});
};

export default {
	install,
	Alert,
	Button,
	Checkbox,
	CheckboxButton,
	Form,
	FormGroup,
	Input,
	Label,
	Radio,
	RadioButton,
	Select,
	SideMenu,
	SideMenuItem,
	SideSubmenu
};
