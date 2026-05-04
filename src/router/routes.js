export default [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/AttendeeInfo.vue'),
        name: 'attendee-info',
      },
      {
        path: 'sessions',
        component: () => import('../pages/SelectSessions.vue'),
        name: 'sessions',
      },
      {
        path: 'addons',
        component: () => import('../pages/AddOns.vue'),
        name: 'addons',
      },
    {
        path: 'review',
        component: () => import('../pages/ReviewSubmit.vue'),
        name: 'review',
      },
    ],
  },
]
