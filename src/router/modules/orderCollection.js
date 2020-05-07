import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'orderCollection-';

export default {
    path: '/orderCollection',
    name: '取单管理',
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
                title: '取单列表',
                closable: true
            },
            component: () => import('@/pages/orderCollection/list')
        },
        //取单管理详情页
        {
            path: '/orderCollection/details',
            name: 'orderCollection-details',
            meta: {
                ...meta,
                title: '取单详情',
                closable: true,
            },
            component: () => import('@/pages/orderCollection/details')
        }
    ]
};