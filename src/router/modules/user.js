import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'user-';

export default {
    path: '/user',
    name: 'user',
    meta: {
        ...meta,
        title: '用户管理',
        closable: true
    },
    component: () => import('@/pages/user/list')
};