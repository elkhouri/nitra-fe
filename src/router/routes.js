export default [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/AttendeeInfo.vue'),
      },
      {
        path: 'sessions',
        component: () => import('../pages/SelectSessions.vue'),
      },
    ],
  },
]
