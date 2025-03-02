const router = [
  {
    name: 'education',
    path: '/education',
    redirect: '/education/score',
    meta: {
      sort: 1200,
      icon: 'education',
      title: '教育管理',
    },
    component: () => import('@/layout/BlankLayout.vue'),
    children: [
      {
        name: 'score',
        path: 'score',
        meta: {
          title: '成绩管理',
        },
        component: () => import('@view/education/score.vue'),
      },
      {
        name: 'score-summary',
        path: 'score-summary',
        meta: {
          title: '成绩分析',
        },
        component: () => import('@view/education/score-summary.vue'),
      },
    ],
  },
]

export default router
