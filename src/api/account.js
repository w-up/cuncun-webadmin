import request from '@/plugins/request';

export function AccountLogin (data) {
    return request({
        url: '/server/sso/auth/login',
        method: 'post',
        params:data
    });
}
//设置  时间系数设置列表
export function getTimeSetUpList (data) {
    return request({
        url: '/server/data/admin/profile/timeratio/get',
        method: 'get',
        params:data
    });
}
//设置  时间系数设置保存
export function getTimeSetUpSave (data) {
    return request({
        url: '/server/data/admin/profile/timeratio/save',
        method: 'post',
        data
    });
}
//设置  存单路程价格设置列表
export function getPriceSetUpList (data) {
    return request({
        url: '/server/data/admin/profile/distanceprice/get',
        method: 'get',
        params:data
    });
}
//设置  存单路程价格设置保存
export function getPriceSetUpSave (data) {
    return request({
        url: '/server/data/admin/profile/distanceprice/save',
        method: 'post',
        data
    });
}
//设置  取单物流费设置列表
export function getLogisticsFeeSetUpList (data) {
    return request({
        url: '/server/data/admin/profile/weightprice/get',
        method: 'get',
        params:data
    });
}
//设置  取单物流费设置保存
export function getLogisticsFeeSetUpSave (data) {
    return request({
        url: '/server/data/admin/profile/weightprice/save',
        method: 'post',
        data
    });
}
//设置  物品数量设置列表
export function getGoodsNumSetUpList (data) {
    return request({
        url: '/server/data/admin/profile/amountratio/get',
        method: 'get',
        params:data
    });
}
//设置  物品数量设置保存
export function getGoodsNumSetUpSave (data) {
    return request({
        url: '/server/data/admin/profile/amountratio/save',
        method: 'post',
        data
    });
}
//设置  存储费用设置列表
export function getStorageCostSetUpList (data) {
    return request({
        url: '/server/data/admin/profile/storageduration/get',
        method: 'get',
        params:data
    });
}
//设置  存储费用设置保存
export function getStorageCostSetUpSave (data) {
    return request({
        url: '/server/data/admin/profile/storageduration/save',
        method: 'post',
        data
    });
}
//箱子类型列表
export function getBoxTypeList (data) {
    return request({
        url: '/server/data/admin/box/list',
        method: 'get',
        params:data
    });
}
//箱子类型详情
export function getBoxTypeDetail (id) {
    return request({
        url: '/server/data/admin/box/detail/'+id,
        method: 'get',
        
    });
}
//箱子类型保存
export function getBoxTypeSave (data) {
    return request({
        url: '/server/data/admin/box/save',
        method: 'post',
        data 
    });
}
//箱子类型删除
export function getBoxTypeDel (id) {
    return request({
        url: '/server/data/admin/box/remove/'+id,
        method: 'post',
    });
}
//物品分类列表
export function getGoodsList (data) {
    return request({
        url: '/server/data/admin/category/list',
        method: 'get',
        params:data 
    });
}
//物品分类保存
export function getGoodsSave (data) {
    return request({
        url: '/server/data/admin/category/save',
        method: 'post',
        data 
    });
}