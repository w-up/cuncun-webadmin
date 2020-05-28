
export default {
    path: '/depositReceipt',
    name: 'depositReceipt',
    meta: {
        title: '存单管理',
        auth: true,
        closable: true
    },
    component: () => import('@/pages/depositReceipt/list'),
    // children: [
    //     //存单管理详情页
    //     {
    //         path: '/depositReceipt/details',
    //         name: 'depositReceipt-details',
    //         meta: {
    //             title: '存单详情',
    //             closable: true,
    //         },
    //         component: () => import('@/pages/depositReceipt/details')
    //     }
    // ]
};