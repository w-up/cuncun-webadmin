const pre = '/boxType/';

export default {
    path: '/boxType',
    title: '箱子类型管理',
    header: 'home',
    icon: 'md-speedometer',
    children: [
        {
            path: `${pre}list`,
            title: '箱子类型列表'
        }
    ]
}

