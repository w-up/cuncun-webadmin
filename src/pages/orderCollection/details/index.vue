<template>
  <div>
    <Card>
      <p slot="title">取单详情</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
      <div style="display:flex;flex-wrap: wrap;"> 
        <Card style="width:350px;margin-right:5px;margin-top:10px">
          <p slot="title">订单信息</p>
          <Form  :label-width="90">
            <FormItem label="订单号：">
                <span>{{orderList.orderNumber}}</span>
            </FormItem>
            <FormItem label="用户姓名：">
                <span>{{orderList.name}}</span>
            </FormItem>
            <FormItem label="手机号：">
                <span>{{orderList.phone}}</span>
            </FormItem>
            <FormItem label="骑手：">
                <span>{{orderList.rider}}</span>
                <Button type="success" style="margin-left:10px">分配骑手</Button>
            </FormItem>
            <FormItem label="联系人：">
                <span>{{orderList.contacts}}</span>
            </FormItem>
            <FormItem label="联系电话：">
                <span>{{orderList.telephone}}</span>
            </FormItem>
            <FormItem label="取件地址：">
                <span>{{orderList.address}}</span>
            </FormItem>
            <FormItem label="取件时间：">
                <span>{{orderList.time}}</span>
            </FormItem>
          </Form>
        </Card>
        <Card style="width:350px;margin-right:5px;margin-top:10px">
          <p slot="title">费用明细</p>
          <Button slot="extra" v-show='type=="待付款"?true:false' @click="adjustmentClick">调整费用</Button>
          <div>
            <Form  :label-width="110">
              <FormItem label="运输费用：">
                  <span style="margin-left:120px">￥{{costList.transport}}</span>
              </FormItem>
              <FormItem label="打包费用：">
                  <span style="margin-left:120px">￥{{costList.pack}}</span>
              </FormItem>
              <FormItem label="纸箱费用：">
                  <span style="margin-left:120px">￥{{costList.case}}</span>
              </FormItem>
              <FormItem label="订单总价：" style="margin-bottom:45px" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{costList.total}}</span>
              </FormItem>
              <FormItem label="实付定金：" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{costList.actualPayment}}</span>
              </FormItem>
            </Form>
          </div>
        </Card>
        <Card style="width:500px;margin-top:10px">
          <p slot="title">备注信息</p>
          <Form  :label-width="90" label-position='top'>
            <FormItem label="订单号：">
              <Input  maxlength="200" show-word-limit type="textarea" :rows="5" />
            </FormItem>
            <FormItem label="用户姓名：">
              <Input  maxlength="200" show-word-limit type="textarea" :rows="5" />
              <Button type="success" style="margin-top:10px">保存</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
      <div style="margin:20px 0">
        <Button :disabled='type=="待处理"?true:type=="拣货作业中"?true:type=="待录单"?true:type=="备货完成"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='待付款'?'primary':'dashed'">待付款<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="拣货作业中"?true:type=="待录单"?true:type=="备货完成"?true:type=="已完成"?true:type=="已取消"?true:false'  
          :type="type=='待处理'?'primary':'dashed'" style="margin:0 8px 5px 0">待处理<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="待录单"?true:type=="备货完成"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='拣货作业中'?'primary':'dashed'">拣货作业中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="备货完成"?true:type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='待录单'?'primary':'dashed'">待发货<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="已完成"?true:type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='备货完成'?'primary':'dashed'">待签收<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="已取消"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='已完成'?'primary':'dashed'">已完成<Icon type="ios-arrow-forward" /></Button>
        <Button style="margin:0 8px 5px 0" :type="type=='已取消'?'primary':'dashed'">已取消<Icon type="ios-arrow-forward" /></Button>
      </div>
      <div style="margin:20px 0"> 
        <Card >
          <p slot="title">数据信息</p>
          <pendingPayment v-show="type=='待付款'"></pendingPayment> 
          <pendingDisposal v-show="type=='待处理'"></pendingDisposal>
          <picking  v-show="type=='拣货作业中'"></picking>
          <waitingList v-show="type=='待录单'"></waitingList>
          <stockUp v-show="type=='备货完成'"></stockUp>
          <complete v-show="type=='已完成'"></complete>
          <Cancelled v-show="type=='已取消'"></Cancelled>
        </Card>
      </div>
      <!-- <div style="margin:10px 0">
        <div class="triangle_border_right">
          <span style="line-height:51px">11111</span>
        </div>
      </div> -->
      <Modal v-model="adjustmentModel"  title="照片上传">
        <Form  :label-width="110">
          <FormItem label="物流费用：">
              <span style="margin-left:120px">￥{{costList.transport}}</span>
          </FormItem>
          <FormItem label="订单总价：" style="margin-bottom:20px" class="size20">
              <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{costList.total}}</span>
          </FormItem>
          <FormItem label="费用调整：" >
            <div style="display:flex">
              <Select style="width:120px">
                <Option value="增加" >增加</Option>
                <Option value="减少" >减少</Option>
              </Select>
              <Input style="width:90px;margin-left:5px">
                <span slot="append" >元</span>
              </Input>
            </div>
          </FormItem>
          <FormItem label="调整备注：">
            <Input  type="textarea" :rows="4"  />
          </FormItem>
        </Form>
        <div slot="footer">
          <div style="">
            <Button type="text" style="margin-right:10px;">取消</Button>
            <Button type="primary" style="margin-right:10px">保存</Button>
          </div>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import pendingPayment from '../components/pendingPayment' //待付款
import pendingDisposal from '../components/pendingDisposal' // 待处理
import picking from '../components/picking'//拣货作业中
import waitingList from '../components/waitingList'//待录单
import stockUp from '../components/stockUp'//备货完成
import complete from '../components/complete'//已完成
import Cancelled from '../components/Cancelled'//已取消
export default {
  // name: 'home',
  components: {
    pendingPayment,
    pendingDisposal,
    picking,
    waitingList,
    stockUp,
    Cancelled,
    complete
  },
  data () {
    return {
      adjustmentModel:false,
      type:'待付款',
      orderList:{
        orderNumber:'Q14223223',
        name:'老司机',
        phone:'1334433443',
        rider:'小司机',
        contacts:'老司机',
        telephone:'14423232323',
        address:'上海市浦东新区九江路666号8楼C',
        time:'2020年2月20日   9:00~11:00',
      },
      costList:{
        transport:'20',
        pack:'20',
        case:'20',
        total:'50',
        actualPayment:'50',
      },
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
          value:'拣货作业中',
          label:'拣货作业中',
        },
        {
          value:'待录单',
          label:'待录单',
        },
        {
          value:'备货完成',
          label:'备货完成',
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
    adjustmentClick(){
      this.adjustmentModel = true
    },
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.ivu-form-item{
    margin-bottom: 10px;
  }
  .size20  .ivu-form-item-label{
    font-size: 15px;
  }
  .operationBtn button{
    margin-right: 20px;
  }
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
