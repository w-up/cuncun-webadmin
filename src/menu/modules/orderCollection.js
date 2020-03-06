const pre = '/orderCollection/';

export default {
    path: '/orderCollection',
    title: '取单管理',
    header: 'home',
    icon: 'md-speedometer',
    children: [
        {
            path: `${pre}list`,
            title: '取单列表'
        }
    ]
}

