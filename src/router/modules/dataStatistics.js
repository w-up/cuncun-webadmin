import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'dataStatistics-';

export default {
    path: '/dataStatistics',
    name: '数据统计',
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
                title: '用户数据统计',
                closable: true
            },
            component: () => import('@/pages/dataStatistics/list')
        },
        //存单管理详情页
        {
            path: '/dataStatistics/address',
            name: 'dataStatistics-address',
            meta: {
                title: '常用地址',
                closable: true,
            },
            component: () => import('@/pages/dataStatistics/address')
        },
        {
          path: '/dataStatistics/detailed',
          name: 'dataStatistics-detailed',
          meta: {
              title: '订单明细',
              closable: true,
          },
          component: () => import('@/pages/dataStatistics/detailed')
      }
    ]
};