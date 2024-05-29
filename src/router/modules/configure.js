const router = [
  {
    name: 'configure',
    path: '/configure',
    redirect: '/configure/env',
    meta: {
      sort: 1200,
      icon: 'setting',
      title: '配置管理',
    },
    component: () => import('@/layout/BlankLayout.vue'),
    children: [
      {
        name: 'envList',
        path: 'env',
        meta: {
          title: '环境配置',
        },
        component: () => import('@view/configure/env.vue'),
      },
    ],
  },
]

export default router
