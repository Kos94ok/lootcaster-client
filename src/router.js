import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'WelcomeView',
			component: () => import('./views/WelcomeView.vue')
		},
		{
			path: '/register',
			name: 'RegisterView',
			component: () => import('./views/RegisterView.vue')
		},
		{
			path: '/login',
			name: 'LoginView',
			component: () => import('./views/LoginView.vue')
		},
		/*{
			path: '/profile',
			name: 'ProfileView',
			component: () => import('./views/ProfileView.vue')
		},*/
		{
			path: '/browser',
			name: 'BrowserView',
			component: () => import('./views/BrowserView.vue')
		}
		/*{
			path: '/play',
			name: 'PlayView',
			component: () => import('./views/PlayView.vue')
		}*/
	]
})
