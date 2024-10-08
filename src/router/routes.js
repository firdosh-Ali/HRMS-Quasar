const routes = [

  {
    path: '/',
    component: () => import('pages/HomePage.vue')
  },

  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue')
  },

  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'daily-update', component: () => import('pages/DailyUpdate.vue')},
      { path: 'HRPolicy', component: () => import('pages/HRPolicy.vue')},
      { path: 'EmailPage', component: () => import('pages/EmailPage.vue')},
      { path: 'HolidaysPage', component: () => import('pages/HolidaysPage.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
