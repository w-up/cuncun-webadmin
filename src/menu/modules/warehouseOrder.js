const pre = '/warehouseOrder/';

export default {
    path: '/warehouseOrder',
    title: '仓储订单管理',
    header: 'home',
    icon: 'md-cube',
    children: [
        {
            path: `${pre}list`,
            icon: 'md-cube',
            title: '仓储订单列表'
        }
    ]
}

