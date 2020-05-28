import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'orderCollection-';

export default {
    path: '/orderCollection',
    name: '取单管理',
    meta: {
        title: '取单管理',
        auth: true,
        closable: true
    },
    component: () => import('@/pages/orderCollection/list'),
};