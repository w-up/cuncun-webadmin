const pre = '/dataStatistics/';

export default {
    path: '/dataStatistics',
    title: '数据统计',
    header: 'home',
    icon: 'md-options',
    children: [
        {
            path: `${pre}list`,
            icon: 'md-options',
            title: '用户数据统计'
        },
        {
            path: `${pre}incomeStatistics`,
            icon: 'md-options',
            title: '平台收入统计'
        }
    ]
}

