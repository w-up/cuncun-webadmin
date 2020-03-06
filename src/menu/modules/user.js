const pre = '/user/';

export default {
    path: '/user',
    title: '用户管理',
    header: 'home',
    icon: 'md-person',
    children: [
        {
            path: `${pre}list`,
            icon: 'md-person',
            title: '用户列表'
        }
    ]
}

