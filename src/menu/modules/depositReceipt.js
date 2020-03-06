const pre = '/depositReceipt/';

export default {
    path: '/depositReceipt',
    title: '存单管理',
    header: 'home',
    icon: 'ios-paper',
    children: [
        {
            path: `${pre}list`,
            title: '存单列表'
        }
    ]
}

