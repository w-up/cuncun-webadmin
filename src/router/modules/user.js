import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'user-';

export default {
    path: '/user',
    name: '用户管理',
    redirect: {
        name: `${pre}list`
    },
    meta,
    component: BasicLayout,
    children: [
      {
          path: 'list',
          name: `${pre}list`,
          meta: {
              ...meta,
              title: '用户列表',
              closable: true
          },
          component: () => import('@/pages/user/list')
      },
    ]
};