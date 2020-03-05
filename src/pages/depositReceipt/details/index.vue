<template>
  <div>
    <Card>
      <p slot="title">存单详情</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
      <Card>
        <p slot="title">基本信息</p>
        <Select  slot="extra"  style="width:200px;" v-model="type">
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Form>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="订单号:" style="width:250px">
                <span>Q14223223</span>
              </FormItem>
              <FormItem label="联系人:" style="width:300px">
                <span>老司机</span>
              </FormItem>
              <FormItem label="预估物流费用:" style="width:200px">
                <span>15</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="用户姓名:" style="width:250px">
                <span>老司机</span>
              </FormItem>
              <FormItem label="联系电话:" style="width:300px">
                <span>1334433443</span>
              </FormItem>
              <FormItem label="实际物流费用:" style="width:300px">
                <span>1233</span>
                <Button type="info" style="margin-left:20px">修改物流费用</Button>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="手机号:" style="width:250px">
                <span>1334433443</span>
              </FormItem>
              <FormItem label="取件地址:" style="width:300px">
                <span>老司机</span>
              </FormItem>
              <FormItem label="已收物流费用:" style="width:200px">
                <span>15</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="预估数量:" style="width:250px">
                <span>22</span>
              </FormItem>
              <FormItem label="取件日期:" style="width:300px">
                <span>2019-12-12</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="骑手:" style="width:250px">
                <span>待分配</span>
                <Button type="info" style="margin-left:20px">分配骑手</Button>
              </FormItem>
              <FormItem label="取件时间:" style="width:300px">
                <span>15:00:30</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100"  style="">
              <FormItem label="备注" style="">
                <Input  type="textarea" :rows="4" style="width:400px" placeholder="请输入" />
                <Button type="success" style="margin-left:20px">保存</Button>
              </FormItem>
            </Form>
          </FormItem>
        </Form>
      </Card>
      <div style="margin:20px 0">
        <Button :disabled='type=="待处理"?true:type=="待分配骑手"?true:type=="待取货"?true:type=="回库中"?true:type=="安检中"?true:type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='待付款'?'primary':'dashed'">待付款<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="待分配骑手"?true:type=="待取货"?true:type=="回库中"?true:type=="安检中"?true:type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' 
          :type="type=='待处理'?'primary':'dashed'" style="margin:0 8px 5px 0">待处理<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="待取货"?true:type=="回库中"?true:type=="安检中"?true:type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='待分配骑手'?'primary':'dashed'">待分配骑手<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="回库中"?true:type=="安检中"?true:type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='待取货'?'primary':'dashed'">待取货<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="安检中"?true:type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='回库中'?'primary':'dashed'">回库中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='安检中'?'primary':'dashed'">安检中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='拍照中'?'primary':'dashed'">拍照中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='待上架'?'primary':'dashed'">待上架<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="已取消"?true:false' style="margin:0 8px 5px 0" :type="type=='已完成'?'primary':'dashed'">已完成<Icon type="ios-arrow-forward" /></Button>
        <Button style="margin:0 8px 5px 0" :type="type=='已取消'?'primary':'dashed'">已取消<Icon type="ios-arrow-forward" /></Button>
      </div>
      <div style="margin:20px 0"> 
        <Card >
          <p slot="title">数据信息</p>
          <pendingPayment v-show="type=='待付款'"></pendingPayment> 
          <pendingDisposal v-show="type=='待处理'"></pendingDisposal>
          <assignRiders  v-show="type=='待分配骑手'"></assignRiders>
          <waitingForDelivery v-show="type=='待取货'"></waitingForDelivery>
          <returningLibrary v-show="type=='回库中'"></returningLibrary>
          <securityCheck v-show="type=='安检中'"></securityCheck>
          <stayPhotograph v-show="type=='拍照中'"></stayPhotograph>
          <toStayOn v-show="type=='待上架'"></toStayOn>
          <complete v-show="type=='已完成'"></complete>
        </Card>
      </div>
      <!-- <div style="margin:10px 0">
        <div class="triangle_border_right">
          <span style="line-height:51px">11111</span>
        </div>
      </div> -->
    </Card>
  </div>
</template>

<script>
import pendingPayment from '../components/pendingPayment' //待付款
import pendingDisposal from '../components/pendingDisposal' // 待处理
import assignRiders from '../components/assignRiders'//待分配骑手
import waitingForDelivery from '../components/waitingForDelivery'//待取货
import returningLibrary from '../components/returningLibrary'//回库中
import securityCheck from '../components/securityCheck'//安检中
import stayPhotograph from '../components/stayPhotograph'//待拍照
import toStayOn from '../components/toStayOn'//待上架
import complete from '../components/complete'//已完成
export default {
  // name: 'home',
  components: {
    pendingPayment,
    pendingDisposal,
    assignRiders,
    waitingForDelivery,
    returningLibrary,
    securityCheck,
    stayPhotograph,
    toStayOn,
    complete
  },
  data () {
    return {
      type:'待处理',
      stateList:[
        {
          value:'待付款',
          label:'待付款',
        },
        {
          value:'待处理',
          label:'待处理',
        },
        {
          value:'待分配骑手',
          label:'待分配骑手',
        },
        {
          value:'待取货',
          label:'待取货',
        },
        {
          value:'回库中',
          label:'回库中',
        },
        {
          value:'安检中',
          label:'安检中',
        },
        {
          value:'拍照中',
          label:'拍照中',
        },
        {
          value:'待上架',
          label:'待上架',
        },
        {
          value:'已完成',
          label:'已完成',
        },
        {
          value:'已取消',
          label:'已取消',
        },
      ]
    }
  },
  mounted () {
    //
  },
  methods:{
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
  .triangle_border_right {
  width: 100px;
    height: 51px;
    text-align: center;
    font-size: 11px;
    border: 1px solid rgb(155, 155, 155);
    position: relative;
    border-radius: 3px;
}
.triangle_border_right:before {
  content: "";
  position: absolute;
  right: -18px;
  top: 7px;
  width: 35px;
  height: 35px;
  background: #fff;
  border-bottom: 1px solid rgb(155, 155, 155);
  border-left: 1px solid rgb(155, 155, 155);
  transform: rotate(225deg);
}
</style>
