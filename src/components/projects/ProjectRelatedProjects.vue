<script>
export default {
	props: ['relatedProjects'],
};
</script>

<template>
	<div
		class="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark"
	>
		<p
			class="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left"
		>
			Related Projects
		</p>

		<div class="grid grid-cols-1 sm:grid-cols-4 gap-10">
			<div v-for="project in relatedProjects" :key="project.id">
				<img
					:src="project.images[0].url"
					class="rounded-xl cursor-pointer"
					:alt="project.title"
					:title="project.title"
				/>
				<p
				class="font-general-semibold text-xl text-ternary-dark dark:text-ternary-light font-semibold mb-2 py-2"
				>
					{{ project.title }}
				</p>
			</div>
		</div>
	</div>
</template>
