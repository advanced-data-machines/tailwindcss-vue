<template>
	<section class="px-4">
		<h1 class="text-3xl text-teal-300">Dropdown</h1>
		<tv-dropdown v-model="value" multiple aria-role="list" :has-arrow="false">
			<tv-button slot="trigger" slot-scope="props" :disabled="props.disabled">
				Default <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item value="test" aria-role="listItem" disabled>Option</tv-dropdown-item>
			<tv-dropdown-item separator />
			<tv-dropdown-item value="test2" aria-role="listItem">Option 2</tv-dropdown-item>
			<tv-dropdown-item value="test3" aria-role="listItem">Option 3</tv-dropdown-item>
		</tv-dropdown>
		<tv-dropdown placement="bottom-end" trigger="hover">
			<tv-button slot="trigger">
				Bottom Right <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item value="test" aria-role="listItem">Option</tv-dropdown-item>
		</tv-dropdown>
		<tv-dropdown placement="top-start">
			<tv-button slot="trigger">
				Top Left <tv-icon icon="menu-down" />
			</tv-button>
			<tv-dropdown-item value="test" aria-role="listItem">Option</tv-dropdown-item>
		</tv-dropdown>
		<tv-dropdown placement="top-end" append-to-body>
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

		<p>This is a test <tv-tooltip content="Hello!" class="underline" append-to-body :has-arrow="false">tooltip</tv-tooltip></p>
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
