import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/app.css';
import BackToTop from 'vue-backtotop';

import { GraphQLClient } from 'graphql-request';

const graphcmsClient = new GraphQLClient(
	'https://api-eu-central-1.graphcms.com/v2/cl01cblcoa0yu01zagtac9lpt/master'
);

const feather = require('feather-icons');
feather.replace();

createApp(App)
	.mixin({
		beforeCreate() {
			this.$graphcms = graphcmsClient;
		}
	})
	.use(router)
	.use(BackToTop)
	.mount('#app');

const appTheme = localStorage.getItem('theme');

// Check what is the active theme and change theme when user clicks on the theme button in header.
if (
	appTheme === 'dark' &&
	document.querySelector('body').classList.contains('app-theme')
) {
	document.querySelector('body').classList.add('bg-primary-dark');
} else {
	document.querySelector('body').classList.add('bg-secondary-light');
}
