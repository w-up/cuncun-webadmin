import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'depositReceipt-';

export default {
    path: '/depositReceipt',
    name: '存单管理',
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
                title: '存单列表',
                closable: false
            },
            component: () => import('@/pages/depositReceipt/list')
        },
        //存单管理详情页
        {
            path: '/depositReceipt/details',
            name: 'depositReceipt-details',
            meta: {
                title: '存单详情',
                closable: true,
            },
            component: () => import('@/pages/depositReceipt/details')
        }
    ]
};