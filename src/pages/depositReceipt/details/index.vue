<template>
  <div>
    <Card>
      <p slot="title">存单详情</p>
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
                <Button type="success" style="margin-left:10px" v-show='type=="待取货"?true:type=="回库中"?true:type=="安检中"?true:false'>修改骑手</Button>
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
          <Button slot="extra" v-show='type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' @click="adjustmentClick">调整费用</Button>
          <div v-show='type=="待付款"?true:type=="待处理"?true:type=="待分配骑手"?true:type=="待取货"?true:type=="回库中"?true:type=="安检中"?true:false'>
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
          <div v-show='type=="拍照中"?true:type=="待上架"?true:type=="已完成"?true:type=="已取消"?true:false' >
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
              <FormItem label="调整费用：">
                  <span style="margin-left:120px">￥{{costList.case}}</span>
              </FormItem>
              <FormItem label="订单总价：" style="margin-bottom:20px" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{costList.total}}</span>
              </FormItem>
              <FormItem label="已付定金：" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{costList.actualPayment}}</span>
              </FormItem>
              <FormItem label="实付定金：" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{costList.actualPayment}}</span>
              </FormItem>
              <FormItem label="未结算" v-show='type=="拍照中"?true:type=="待上架"?true:false'>
                <Poptip
                    confirm
                    transfer
                    title="是否确认发起结算?">
                    <Button type="success" style="margin-left:120px">发起结算</Button>
                </Poptip>
              </FormItem>
            </Form>
          </div>
        </Card>
        <Card style="width:500px;margin-top:10px">
          <p slot="title">备注信息</p>
          <Form  :label-width="90" label-position='top'>
            <FormItem label="用户备注：">
              <Input   type="textarea"  :rows="5" />
            </FormItem>
            <FormItem label="管理员备注:">
              <Row style="margin-top:5px" v-for="(item, index) in remarkList"
                :key="index">
                  <Col span="18">
                    <Input   type="textarea" :autosize="{minRows: 4,maxRows: 4}" v-model="item.content"/>
                  </Col>
                  <Col span="4" offset="1">
                    <Button type="success" style="margin-bottom:10px;"  v-show="item.id.length<10" @click="handleSave(item)">保存</Button>
                    <Poptip
                        transfer
                        confirm
                        title="您确认删除此条备注吗?"
                        @on-ok="handleRemove(item)">
                        <Button type="error" >删除</Button>
                    </Poptip>
                    
                  </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                  <Col span="12">
                      <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
                  </Col>
              </Row>
            </FormItem>
          </Form>
        </Card>
      </div>
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
      <Modal v-model="adjustmentModel"  title="费用调整">
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
          <FormItem label="调整费用：">
              <span style="margin-left:120px">￥{{costList.case}}</span>
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
import { getRemarkPage,
getRemarkAdd,
getRemarkDel } from "@api/account";
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
      orderId:this.$route.query.id,
      index:0,
      adjustmentModel:false,
      remarkList:[],
      type:'已完成',
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
    this.getRemarkList()
  },
  methods:{
    //评论列表
    getRemarkList(){
      let data = {
        orderId:this.$route.query.id,
        from:'admin'
      }
      getRemarkPage(data).then(res=>{
        var arr = res.data.data
        this.remarkList = arr
        
      })
    },
    adjustmentClick(){
      this.adjustmentModel = true
    },
    //增加评论
    handleAdd () {
      this.index++
      this.remarkList.push({
          content:'',
          id:this.index+''
      });
    },
    //评论保存
    handleSave(item){
      let data = {
        orderId:this.orderId,
        content:item.content,
        internal:'false'
      }
      getRemarkAdd(data).then(res=>{
        this.$Message.success('成功');
        this.getRemarkList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    handleRemove (item) {
      if (item.id.length>10) {
        let data = {
          id:item.id
        }
        getRemarkDel(data).then(res=>{
          this.$Message.success('成功');
          this.getRemarkList()
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      }else{
        for (var i = 0; i < this.remarkList.length; i++) { 
          if (item.id==this.remarkList[i].id) {
            this.remarkList.splice(i, 1); 
          }
        }
        
      }
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
