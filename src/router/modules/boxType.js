import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'boxType-';

export default {
    path: '/boxType',
    name: '箱子类型管理',
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
              title: '箱子类型列表',
              closable: true
          },
          component: () => import('@/pages/boxType/list')
      },
    ]
};