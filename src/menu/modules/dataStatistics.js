const pre = '/dataStatistics/';

export default {
    path: '/dataStatistics',
    title: '数据统计',
    header: 'home',
    icon: 'md-options',
    children: [
        {
            path: `${pre}list`,
            title: '用户数据统计'
        }
    ]
}

