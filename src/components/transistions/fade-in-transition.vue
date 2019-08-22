<template>
	<component :is="componentType"
		v-bind="$attrs"
		@before-enter="beforeEnter"
		@after-enter="afterEnter"
		@before-leave="beforeLeave"
		@leave="leave"
		@after-leave="afterLeave"
		enter-active-class="fadeIn"
		move-class="fade-move"
		leave-active-class="fadeOut"
	>
		<slot />
	</component>
</template>
<script>
import Transition from './transistion-mixin.js';
export default {
	name: 'FadeTransition',
	mixins: [Transition]
};
</script>
<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .fadeIn {
    animation-name: fadeIn;
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .fadeOut {
    animation-name: fadeOut;
  }
  .fade-move {
    transition: transform .3s ease-out;
  }
</style>
