import Alert from './components/alert';
import AlertNotice, { NotifyProgrammatic } from './components/alert-notice';
import Autocomplete from './components/autocomplete';
import AutocompleteItem from './components/autocomplete-item';
import Button from './components/button';
import Checkbox from './components/checkbox';
import CheckboxButton from './components/checkbox-button';
import CollapseTransition from './components/collapse-transition';
import Dropdown from './components/dropdown';
import DropdownItem from './components/dropdown-item';
import Form from './components/form';
import FormGroup from './components/form-group';
import Icon from './components/icon';
import Input from './components/input';
import Label from './components/label';
import Loading from './components/loading';
import Modal, { ModalProgrammatic } from './components/modal';
import Pagination from './components/pagination';
import PaginationButton from './components/pagination-button';
import Popper from './components/popper';
import ProgressBar from './components/progress-bar';
import Radio from './components/radio';
import RadioButton from './components/radio-button';
import Resizable from './components/resizable';
import Select from './components/select';
import SideMenu from './components/side-menu';
import SideMenuItem from './components/side-menu-item';
import SideSubmenu from './components/side-submenu';
import Switch from './components/switch';
import Table from './components/table';
import Tooltip from './components/tooltip';

// components to be used
const components = [
	Alert,
	AlertNotice,
	Autocomplete,
	AutocompleteItem,
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
	Resizable,
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
	Autocomplete,
	AutocompleteItem,
	NotifyProgrammatic,
	Button,
	Checkbox,
	CheckboxButton,
	CollapseTransition,
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
	Popper,
	ProgressBar,
	Radio,
	RadioButton,
	Resizable,
	Select,
	SideMenu,
	SideMenuItem,
	SideSubmenu,
	Switch,
	Table,
	Tooltip
};
