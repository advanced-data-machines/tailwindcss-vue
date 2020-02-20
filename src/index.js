import Alert from './components/alert/index.js';
import AlertNotice, { NotifyProgrammatic } from './components/alert-notice/index.js';
import Button from './components/button/index.js';
import Checkbox from './components/checkbox/index.js';
import CheckboxButton from './components/checkbox-button/index.js';
import Dropdown from './components/dropdown/index.js';
import DropdownItem from './components/dropdown-item/index.js';
import Form from './components/form/index.js';
import FormGroup from './components/form-group/index.js';
import Icon from './components/icon/index.js';
import Input from './components/input/index.js';
import Label from './components/label/index.js';
import Loading from './components/loading/index.js';
import Modal, { ModalProgrammatic } from './components/modal/index.js';
import Pagination from './components/pagination/index.js';
import PaginationButton from './components/pagination-button/index.js';
import ProgressBar from './components/progress/index.js';
import Radio from './components/radio/index.js';
import RadioButton from './components/radio-button/index.js';
import Select from './components/select/index.js';
import SideMenu from './components/side-menu/index.js';
import SideMenuItem from './components/side-menu-item/index.js';
import SideSubmenu from './components/side-submenu/index.js';
import Switch from './components/switch/index.js';
import Table from './components/table/index.js';
import Tooltip from './components/tooltip/index.js';
import Theme from './utils/theme.js';

// components to be used
const components = [
	Alert,
	AlertNotice,
	Button,
	Checkbox,
	CheckboxButton,
	Dropdown,
	DropdownItem,
	Form,
	FormGroup,
	Icon,
	Input,
	Label,
	Loading,
	Modal,
	Pagination,
	PaginationButton,
	ProgressBar,
	Radio,
	RadioButton,
	Select,
	SideMenu,
	SideMenuItem,
	SideSubmenu,
	Switch,
	Table,
	Tooltip
];

export default {
	install(Vue, args = {}) {
		if (this.installed) {
			return;
		}
		this.installed = true;
		const componentList = (args.components && Array.isArray(args.components)) || components;
		componentList.forEach(component => {
			Vue.use(component, args);
		});
	}
};

export {
	Alert,
	AlertNotice,
	NotifyProgrammatic,
	Button,
	Checkbox,
	CheckboxButton,
	Dropdown,
	DropdownItem,
	Form,
	FormGroup,
	Icon,
	Input,
	Label,
	Loading,
	Modal,
	ModalProgrammatic,
	Pagination,
	PaginationButton,
	ProgressBar,
	Radio,
	RadioButton,
	Select,
	SideMenu,
	SideMenuItem,
	SideSubmenu,
	Switch,
	Table,
	Theme,
	Tooltip
};
