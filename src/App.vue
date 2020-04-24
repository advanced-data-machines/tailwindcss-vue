<template>
	<div class="flex flex-col h-screen">
		<div class="relative flex flex-wrap items-center py-2 px-4 shadow bg-gray-900 flex-grow-0">
			<a class="text-xl py-2 cursor-pointer text-white hover:text-gray-500 mr-auto">Tailwindcss-Vue</a>
		</div>
		<div class="flex flex-row flex-grow">
			<tv-side-menu :default-active="activeRoute" :collapse="menuCollapse" class="flex flex-col bg-gray-700">
				<div class="flex-grow">
					<tv-side-menu-item @click="handleToggle">
						<i :class="['mdi mdi-menu', 'text-2xl']" />
						<template slot="title" slot-scope="props">
							<transition
								enter-class="opacity-0"
								enter-active-class="ease-out duration-300"
								enter-to-class="opacity-100"
								leave-class="opacity-100"
								leave-active-class="ease-out duration-300"
								leave-to-class="opacity-0"
							>
								<span class="ml-4 nowrap" v-show="!props.menuCollapsed">Menu</span>
							</transition>
						</template>
					</tv-side-menu-item>
					<template v-for="item in routes">
						<tv-side-submenu v-if="item.children && item.children.length > 0" :key="item.meta.index" :index="item.meta.index" :popup-width="'200px'">
							<i slot="icon" :class="['mdi', item.meta.icon, 'text-2xl']" />
							<template slot="title" slot-scope="props">
								<transition
									enter-class="opacity-0"
									enter-active-class="ease-out duration-300"
									enter-to-class="opacity-100"
									leave-class="opacity-100"
									leave-active-class="ease-out duration-300"
									leave-to-class="opacity-0"
								>
									<span class="ml-4 nowrap" v-show="!props.menuCollapsed">{{ item.meta.title }}</span>
								</transition>
							</template>
							<template v-for="child in item.children">
								<tv-side-menu-item :key="child.meta.index" :index="child.meta.index" :route="routeConverter(child)" :transition-title="false">
									<template slot="title" slot-scope="props">
										<transition
											enter-class="opacity-0"
											enter-active-class="ease-out duration-300"
											enter-to-class="opacity-100"
											leave-class="opacity-100"
											leave-active-class="ease-out duration-300"
											leave-to-class="opacity-0"
										>
											<span class="ml-4 nowrap" v-show="!props.menuCollapsed">{{ child.meta.title }}</span>
										</transition>
									</template>
								</tv-side-menu-item>
							</template>
						</tv-side-submenu>
						<tv-side-menu-item v-else :key="item.meta.index" :index="item.meta.index" :route="routeConverter(item)">
							<i :class="['mdi', item.meta.icon, 'text-2xl']" />
							<template slot="title" slot-scope="props">
								<transition
									enter-class="opacity-0"
									enter-active-class="ease-out duration-300"
									enter-to-class="opacity-100"
									leave-class="opacity-100"
									leave-active-class="ease-out duration-300"
									leave-to-class="opacity-0"
								>
									<span class="ml-4 nowrap" v-show="!props.menuCollapsed">{{ item.meta.title }}</span>
								</transition>
							</template>
						</tv-side-menu-item>
					</template>
				</div>
				<div v-if="!menuCollapse" slot="footer" class="w-full text-center border-t border-grey p-4 pin-b">
					<p class="text-white text-xs">
						Version: 1.2.12345.6
					</p>
				</div>
			</tv-side-menu>
			<div class="w-full overflow-x-hidden">
				<router-view />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			routes: [],
			menuCollapse: false
		};
	},
	computed: {
		activeRoute() {
			const current = this.$route;
			let index = null;
			if (current && current.meta && current.meta.index) {
				index = current.meta.index;
			}
			return index;
		}
	},
	methods: {
		routeConverter(route) {
			return { name: route.name };
		},
		handleToggle() {
			this.menuCollapse = !this.menuCollapse;
		}
	},
	mounted() {
		const router = this.$router;
		if (router && router.options && router.options.routes) {
			const routes = router.options.routes.filter((r) => Object.prototype.hasOwnProperty.call(r, 'meta'));
			this.routes = routes;
		}
	}
};
</script>
