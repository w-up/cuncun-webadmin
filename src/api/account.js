import request from '@/plugins/request';

export function AccountLogin (data) {
    return request({
        url: '/server/sso/auth/login',
        method: 'post',
        params:data
    });
}
export function timeDate (data) {
    var now = new Date(data)
    var year=now.getFullYear();  //取得4位数的年份
    var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    var date=now.getDate();      //返回日期月份中的天数（1到31）
    var hour=now.getHours();     //返回日期中的小时数（0到23）
    var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    var second=now.getSeconds(); //返回日期中的秒数（0到59）
    if (Number(month)<10) {
        month = '0'+month
    }
    if (Number(date)<10) {
        date = '0'+date
    }
    if (Number(hour)<10) {
        hour = '0'+hour
    }
    if (Number(minute)<10) {
        minute = '0'+minute
    }
    if (Number(second)<10) {
        second = '0'+second
    }
    return year+'-'+month+"-"+date+' '+hour+":"+minute+':'+second
}
export function timeDate1 (data) {
    var now = new Date(data)
    var year=now.getFullYear();  //取得4位数的年份
    var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    var date=now.getDate();      //返回日期月份中的天数（1到31）
    var hour=now.getHours();     //返回日期中的小时数（0到23）
    var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    var second=now.getSeconds(); //返回日期中的秒数（0到59）
    if (Number(month)<10) {
        month = '0'+month
    }
    if (Number(date)<10) {
        date = '0'+date
    }
    if (Number(hour)<10) {
        hour = '0'+hour
    }
    if (Number(minute)<10) {
        minute = '0'+minute
    }
    if (Number(second)<10) {
        second = '0'+second
    }
    return year+'-'+month+"-"+date
}
//存单列表
export function getdepositPrderList (data) {
    return request({
        url: '/server/data/admin/deposit/order/page',
        method: 'get',
        params:data
    });
}
//存单接单
export function getAccept (data) {
    return request({
        url: '/server/data/admin/deposit/order/accept',
        method: 'post',
        data 
    });
}

//存单预计物品列表
export function getGoodsList4Order (id) {
    return request({
        url: '/server/data/admin/deposit/goods/list4Order',
        method: 'get',
        params:{
            orderId:id
        }
    });
}
//存单预计箱子列表
export function getBoxList4Order (id) {
    return request({
        url: '/server/data/admin/deposit/box/list4Order',
        method: 'get',
        params:{
            orderId:id
        }
    });
}
//存单待取货此步骤已完成
export function getCompleteDelivery (data) {
    return request({
        url: '/server/data/admin/deposit/order/delivery',
        method: 'post',
        data 
    });
}
//存单回库中此步骤已完成
export function getCompleteMonitor (data) {
    return request({
        url: '/server/data/admin/deposit/order/monitor',
        method: 'post',
        data 
    });
}
//存单安检中此步骤已完成
export function getCompletePhoto(data) {
    return request({
        url: '/server/data/admin/deposit/order/photo',
        method: 'post',
        data 
    });
}
//存单拍照中此步骤已完成
export function getCompleteReady(data) {
    return request({
        url: '/server/data/admin/deposit/order/ready',
        method: 'post',
        data 
    });
}
//存单待上架此步骤已完成
export function getCompleteFinish(data) {
    return request({
        url: '/server/data/admin/deposit/order/finish',
        method: 'post',
        data 
    });
}
//存单拒单
export function getRefuse (data) {
    return request({
        url: '/server/data/admin/deposit/order/refuse',
        method: 'post',
        data 
    });
}
//存单发起结算
export function getFeeSettle (data) {
    return request({
        url: '/server/data/admin/deposit/order/fee/settle',
        method: 'post',
        data 
    });
}
//存单分配骑手
export function getAssign (data) {
    return request({
        url: '/server/data/admin/deposit/order/assign',
        method: 'post',
        data 
    });
}
//存单评论列表
export function getRemarkPage (data) {
    return request({
        url: '/server/data/admin/deposit/remark/page',
        method: 'get',
        params:data
    });
}
//存单评论保存
export function getRemarkAdd (data) {
    return request({
        url: '/server/data/admin/deposit/remark/add',
        method: 'post',
        data 
    });
}
//存单评论删除
export function getRemarkDel (data) {
    return request({
        url: '/server/data/admin/deposit/remark/del',
        method: 'post',
        data 
    });
}
//存单详情
export function getOrderDetail (id) {
    return request({
        url: '/server/data/admin/deposit/order/detail/'+id,
        method: 'get',
    });
}
//存单 调整费用
export function getFeeAdjust (data) {
    return request({
        url: '/server/data/admin/deposit/order/fee/adjust',
        method: 'post',
        data 
    });
}
//存单包裹信息列表
export function getPackPage (data) {
    return request({
        url: '/server/data/admin/pack/list',
        method: 'get',
        params:data
    });
}
//存单包裹信息保存
export function getPackAdd (data) {
    return request({
        url: '/server/data/admin/pack/save',
        method: 'post',
        data 
    });
}
//存单包裹信息删除
export function getPackDel (data) {
    return request({
        url: '/server/data/admin/pack/del',
        method: 'post',
        data 
    });
}
//存单包裹库位保存
export function getPackSet (data) {
    return request({
        url: '/server/data/admin/pack/store/code/set',
        method: 'post',
        data 
    });
}
//存单物品信息录入
export function getDepositGoodsSave (data) {
    return request({
        url: '/server/data/admin/goods/save',
        method: 'post',
        data 
    });
}
//存单物品信息列表
export function getDepositGoodsList (data) {
    return request({
        url: '/server/data/admin/goods/list',
        method: 'get',
        params:data
    });
}
//存单物品信息删除
export function getDepositGoodsDel (data) {
    return request({
        url: '/server/data/admin/goods/del',
        method: 'post',
        data
    });
}
//存单物品信息图片列表
export function getDepositGoodsPicList (data) {
    return request({
        url: '/server/data/admin/goods/pic/list',
        method: 'get',
        params:data
    });
}
//存单包裹内物品备注
export function getUpdateRemark (data) {
    return request({
        url: '/server/data/admin/pack/update/remark',
        method: 'post',
        data
    });
}
//存单物品信息发布
export function getDepositGoodsShow (data) {
    return request({
        url: '/server/data/admin/goods/show',
        method: 'post',
        data
    });
}
//存单物品库位
export function getDepositGoodsSet (data) {
    return request({
        url: '/server/data/admin/goods/store/code/set',
        method: 'post',
        data
    });
}
//存单物品库位
export function getDoodsReturn2pack (data) {
    return request({
        url: '/server/data/admin/goods/store/return2pack',
        method: 'post',
        data
    });
}

//取单
//取单列表
export function getWithdrawList (data) {
    return request({
        url: '/server/data/admin/withdraw/order/page',
        method: 'get',
        params:data
    });
}
//取单详情
export function getWithdrawDetail(id) {
    return request({
        url: '/server/data/admin/withdraw/order/detail/'+id,
        method: 'get',
    });
}
//分配拣货员
export function getWithdrawCollect (data) {
    return request({
        url: '/server/data/admin/withdraw/order/collect',
        method: 'post',
        data
    });
}
//取单接单
export function getWithdrawAccept (data) {
    return request({
        url: '/server/data/admin/withdraw/order/accept',
        method: 'post',
        data
    });
}
//取单拒单
export function getWithdrawRefuse (data) {
    return request({
        url: '/server/data/admin/withdraw/order/refuse',
        method: 'post',
        data
    });
}
//取单备注列表
export function getWithdrawRemarkList(data) {
    return request({
        url: '/server/data/admin/withdraw/remark/page',
        method: 'get',
        params:data
    });
}
//取单备注删除
export function getWithdrawRemarkDel(id) {
    return request({
        url: '/server/data/admin/withdraw/remark/del',
        method: 'post',
        params:{
            id:id
        }
    });
}
//取单备注增加
export function getWithdrawRemarkSave(data) {
    return request({
        url: '/server/data/admin/withdraw/remark/add',
        method: 'post',
        params:data
    });
}
//取单调整费用
export function getWithdrawFeeAdjust(data) {
    return request({
        url: '/server/data/admin/withdraw/order/fee/adjust',
        method: 'post',
        data
    });
}
//取单物品列表
export function getWithdrawGoodsList(id) {
    return request({
        url: '/server/data/admin/withdraw/goods/page',
        method: 'get',
        params:{
            orderId:id
        }
    });
}
//取单拣货完成
export function getWithdrawWaitsend(id) {
    return request({
        url: '/server/data/admin/withdraw/order/waitsend',
        method: 'post',
        data:{
            ids:id
        }
    });
}
//取单输入单号
export function getWithdrawWaybillNo(data) {
    return request({
        url: '/server/data/admin/withdraw/order/waybillNo',
        method: 'post',
        data
    });
}
//取单完成待发货
export function getWithdrawWwaitsign(id) {
    return request({
        url: '/server/data/admin/withdraw/order/waitsign',
        method: 'post',
        data:{
            ids:id
        }
    });
}
//仓储订单
//仓储订单列表
export function getStorageOrderList (data) {
    return request({
        url: '/server/data/admin/storage/order/page',
        method: 'get',
        params:data
    });
}
//仓储订单箱子列表
export function getStorageOrderPacksList (id) {
    return request({
        url: '/server/data/admin/storage/order/packs',
        method: 'get',
        params:{
            orderId:id
        }
    });
}
//仓储订单详情
export function getStorageOrderDetail (id) {
    return request({
        url: '/server/data/admin/storage/order/detail/'+id,
        method: 'get',
    });
}
//批量发送
export function getStorageOrderSend2user(id) {
    return request({
        url: '/server/data/admin/storage/order/send2user',
        method: 'post',
        data:{
            ids:id
        }
    });
}
//批量发送
export function getStorageOrderRemark(data) {
    return request({
        url: '/server/data/admin/storage/order/remark/save',
        method: 'post',
        data
    });
}
//仓储订单改价格
export function getStorageOrderFeeAdjust(data) {
    return request({
        url: '/server/data/admin/storage/order/pack/settle',
        method: 'post',
        data
    });
}



//库存物品
export function getInventoryItemsList (data) {
    return request({
        url: '/server/data/admin/goods/page',
        method: 'get',
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
//设置  预约日期限额列表
export function getDeliverylimitList (data) {
    return request({
        url: '/server/data/admin/profile/deliverylimit/get',
        method: 'get',
        params:data
    });
}
//设置  预约日期限额保存
export function getDeliverylimitSave (data) {
    return request({
        url: '/server/data/admin/profile/deliverylimit/save',
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
//物品分类树
export function getGoodsTree (data) {
    return request({
        url: '/server/data/admin/category/tree',
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
//用户列表
export function getUserList (data) {
    return request({
        url: '/server/data/admin/user/page',
        method: 'get',
        params:data 
    });
}
//用户列地址
export function getUserAddressList (id) {
    return request({
        url: '/server/data/admin/user/addr/list',
        method: 'get',
        params:{
            userId:id
        } 
    });
}