import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'warehouseOrder-';

export default {
    path: '/warehouseOrder',
    name: '仓储订单管理',
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
                title: '仓储订单列表',
                closable: true
            },
            component: () => import('@/pages/warehouseOrder/list')
        },
        //取单管理详情页
        {
            path: '/warehouseOrder/details',
            name: 'warehouseOrder-details',
            meta: {
                title: '仓储订单详情',
                closable: true,
            },
            component: () => import('@/pages/warehouseOrder/details')
        }
    ]
};