<script>
import feather from 'feather-icons';
import ProjectHeader from '../components/projects/ProjectHeader.vue';
import ProjectGallery from '../components/projects/ProjectGallery.vue';
import ProjectInfo from '../components/projects/ProjectInfo.vue';
import ProjectRelatedProjects from '../components/projects/ProjectRelatedProjects.vue';

import { gql } from 'graphql-request';

export default {
	name: 'Projects',
	components: {
		ProjectHeader,
		ProjectGallery,
		ProjectInfo,
		ProjectRelatedProjects,
	},
	data: () => {
		return {
			relatedProjects: [],
			project: {
				socialSharingsHeading: 'Share This',
				socialSharings: [
					{
						id: 1,
						name: 'Twitter',
						icon: 'twitter',
						url: 'https://twitter.com/realstoman',
					},
					{
						id: 2,
						name: 'Instagram',
						icon: 'instagram',
						url: 'https://instagram.com/realstoman',
					},
					{
						id: 3,
						name: 'Facebook',
						icon: 'facebook',
						url: 'https://facebook.com/',
					},
					{
						id: 4,
						name: 'LinkedIn',
						icon: 'linkedin',
						url: 'https://linkedin.com/',
					},
					{
						id: 5,
						name: 'Youtube',
						icon: 'youtube',
						url: 'https://www.youtube.com/c/StomanStudio',
					},
				],
			},
		};
	},
	async created() {
		this.getSingleProject();
		this.getRelatedProjects();
	},
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
	methods: {
		async getSingleProject() {
			const data = await this.$graphcms.request(
				gql`
					query GetSingleProject($slug: String!) {
						project(where: {slug: $slug}, stage: PUBLISHED) {
							id
							title
							objective
							description {
							html
							}
							techStack
							categories {
							id
							name
							}
							images {
							id
							url
							}
							publishedAt
							client {
							name
							phone
							id
							services
							website
							}
						}
					}
				`,
				{
					slug: this.$route.params.slug
				}
			);

			this.project = Object.assign(this.project, data.project);
		},
		async getRelatedProjects() {
			const data = await this.$graphcms.request(
				gql`
					query GetRelatedProjects($slug: String!) {
						projects(where: {slug_not: $slug}, stage: PUBLISHED) {
							id
							title
							slug
							objective
							description {
								html
							}
							techStack
							categories {
								id
								name
							}
							images {
								id
								url
							}
							publishedAt
							client {
								name
								phone
								id
								services
								website
							}
						}
					}
				`,
				{
					slug: this.$route.params.slug
				}
			);

			this.relatedProjects = data.projects;
		},
	},
};
</script>

<template>
	<div class="container mx-auto mt-10 sm:mt-20">
		<!-- Project header -->
		<ProjectHeader :singleProjectHeader="project" />

		<!-- Project gallery -->
		<ProjectGallery :projectImages="project.images" />

		<!-- Project information -->
		<ProjectInfo :projectInfo="project" />

		<!-- Project related projects -->
		<ProjectRelatedProjects :relatedProjects="relatedProjects" />
	</div>
</template>

<style scoped></style>
