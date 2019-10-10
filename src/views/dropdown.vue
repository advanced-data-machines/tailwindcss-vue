<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-teal-300">Dropdown</h1>
		<tv-dropdown>
			<tv-button slot="trigger">
				Default <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item>Option</tv-dropdown-item>
		</tv-dropdown>
		<tv-dropdown position="bottom-right" hoverable>
			<tv-button slot="trigger">
				Bottom Right <tv-icon icon="menu-down" />
			</tv-button>
			Test 2
		</tv-dropdown>
		<tv-dropdown position="top-left">
			<tv-button slot="trigger">
				Top Left <tv-icon icon="menu-down" />
			</tv-button>
			Test 3
		</tv-dropdown>
		<tv-dropdown position="top-right">
			<tv-button slot="trigger">
				Top Right <tv-icon icon="menu-down" />
			</tv-button>
			Test 4
		</tv-dropdown>
	</section>
</template>
<script>
export default {
	name: 'Dropdown',
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>
