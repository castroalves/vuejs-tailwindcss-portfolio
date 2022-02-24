<script>
export default {
	props: ['projectImages'],
};
</script>

<template>
	<div class="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12">
		<div
			class="mb-10 sm:mb-0"
			v-for="projectImage in projectImages"
			:key="projectImage.id"
		>
			<img
				:src="projectImage.url"
				class="rounded-xl cursor-pointer shadow-lg sm:shadow-none"
				alt="{{ projectImage.id }}"
			/>
		</div>
	</div>
</template>
