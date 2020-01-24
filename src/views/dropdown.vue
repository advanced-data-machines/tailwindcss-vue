<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-teal-300">Dropdown</h1>
		<tv-dropdown v-model="value" multiple aria-role="list" :disabled="true">
			<tv-button slot="trigger" slot-scope="props" :disabled="props.disabled">
				Default <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item value="test" aria-role="listItem" disabled>Option</tv-dropdown-item>
			<tv-dropdown-item separator />
			<tv-dropdown-item value="test2" aria-role="listItem">Option 2</tv-dropdown-item>
			<tv-dropdown-item value="test3" aria-role="listItem">Option 3</tv-dropdown-item>
		</tv-dropdown>
		<tv-dropdown position="bottom-right" hoverable>
			<tv-button slot="trigger">
				Bottom Right <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item value="test" aria-role="listItem">Option</tv-dropdown-item>
		</tv-dropdown>
		<tv-dropdown position="top-left">
			<tv-button slot="trigger">
				Top Left <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item value="test" aria-role="listItem">Option</tv-dropdown-item>
		</tv-dropdown>
		<tv-dropdown position="top-right">
			<tv-button slot="trigger">
				Top Right <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item value="test" aria-role="listItem">Option</tv-dropdown-item>
		</tv-dropdown>
		<br>
		<p>Value:</p>
		<code>
			{{ value }}
		</code>

		<p>This is a test <tv-tooltip label="I am a label">tooltip</tv-tooltip></p>
	</section>
</template>
<script>
export default {
	name: 'Dropdown',
	data() {
		return {
			value: []
		};
	},
	methods: {
	}
};
</script>
