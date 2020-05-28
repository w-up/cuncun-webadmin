import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'warehouseOrder-';

export default {
    path: '/warehouseOrder',
    name: 'warehouseOrder',
    meta: {
        ...meta,
        title: '仓储订单管理',
        closable: true
    },
    component: () => import('@/pages/warehouseOrder/list')
};