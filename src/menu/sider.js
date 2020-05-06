// 菜单，侧边栏
import depositReceipt from './modules/depositReceipt';//存单管理
import orderCollection from './modules/orderCollection';//取单管理
import warehouseOrder from './modules/warehouseOrder'; //仓储订单管理
import user from './modules/user'; //用户管理
import dataStatistics from './modules/dataStatistics'; //用户管理
import boxType from './modules/boxType'; //用户管理
// 系统
import log from './modules/log';

export default [
    // dashboard,
    depositReceipt,
    orderCollection,
    warehouseOrder,
    {
        path: '/inventoryItems',
        title: '库存物品管理',
        header: 'home',
        icon: 'md-cube',
    },
    user,
    dataStatistics,
    {
        path: '/classificationOfGoods',
        title: '物品分类管理',
        header: 'home',
        icon: 'ios-keypad',
    },
    boxType,
    {
        path: '/setUp',
        title: '设置',
        header: 'home',
        icon: 'md-settings',
    },
    log
];
