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
                <span>{{orderList.orderNo}}</span>
            </FormItem>
            <FormItem label="用户姓名：">
                <span>{{orderList.linkman}}</span>
            </FormItem>
            <FormItem label="手机号：">
                <span>{{orderList.mobile}}</span>
            </FormItem>
            <FormItem label="物流单号：">
                <span>{{orderList.waybillNo}}</span>
                <!-- <Button type="success" style="margin-left:10px">分配骑手</Button> -->
            </FormItem>
            <FormItem label="联系人：">
                <span>{{orderList.linkman}}</span>
            </FormItem>
            <FormItem label="联系电话：">
                <span>{{orderList.mobile}}</span>
            </FormItem>
            <FormItem label="返送地址：">
                <span>{{orderList.addressName}}</span>
            </FormItem>
            <FormItem label="拣货员：">
                <span>{{orderList.pickmanName}}</span>
            </FormItem>
            <FormItem label="申请时间：">
                <span>{{orderList.timeCreated}}</span>
            </FormItem>
            <!-- <FormItem label="取件时间：">
                <span>{{orderList.time}}</span>
            </FormItem> -->
          </Form>
        </Card>
        <Card style="width:350px;margin-right:5px;margin-top:10px">
          <p slot="title">费用明细</p>
          <Button slot="extra" v-show='type=="waitpay"?true:false' @click="adjustmentClick">调整费用</Button>
          <div>
            <Form  :label-width="110">
              <FormItem label="物流费用：">
                  <span style="margin-left:100px">￥{{orderList.deliveryFee}}</span>
              </FormItem>
              <FormItem label="调整费用：">
                  <span style="margin-left:100px">￥{{orderList.adjustFee}}</span>
              </FormItem>
              <!-- <FormItem label="纸箱费用：">
                  <span style="margin-left:100px">￥{{orderList.case}}</span>
              </FormItem> -->
              <FormItem label="订单总价：" style="margin-bottom:45px" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:100px">￥{{orderList.totalFee}}</span>
              </FormItem>
              <FormItem :label="orderList.payStatus=='payed'?'已付金额':'待付金额'" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:100px">￥{{orderList.totalFee}}</span>
              </FormItem>
            </Form>
          </div>
        </Card>
        <Card style="width:500px;margin-top:10px">
          <p slot="title">备注信息</p>
          <Form  :label-width="90" label-position='top'>
            <FormItem label="用户备注：">
              <Input  maxlength="200" show-word-limit type="textarea" :rows="5"  v-model="userRemark" disabled/>
            </FormItem>
            <FormItem label="管理员备注:">
              <Row style="margin-top:5px" v-for="(item, index) in remarkList" :key="index">
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
                        <Button type="error" size="small">删除</Button>
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
      <!-- <div style="margin:20px 0">
        <div style="margin:20px 0"> 测试切换状态</div>
        <Select  slot="extra"  style="width:200px;" v-model="type">
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div> -->
      <div style="margin:20px 0">
        <Button :disabled='type=="init"?true:type=="collect"?true:type=="accept"?true:type=="waitsend"?true:type=="waitsign"?true:type=="finish"?true:type=="cancel"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='waitpay'?'primary':'dashed'">待付款<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="collect"?true:type=="accept"?true:type=="waitsend"?true:type=="waitsign"?true:type=="finish"?true:type=="cancel"?true:false'  
          :type="type=='init'?'primary':'dashed'" style="margin:0 8px 5px 0">待受理<Icon type="ios-arrow-forward" /></Button>
          <Button :disabled='type=="collect"?true:type=="waitsend"?true:type=="waitsign"?true:type=="finish"?true:type=="cancel"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='accept'?'primary':'dashed'">待分配拣货员<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="waitsend"?true:type=="waitsign"?true:type=="finish"?true:type=="cancel"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='collect'?'primary':'dashed'">拣货作业中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="waitsign"?true:type=="finish"?true:type=="cancel"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='waitsend'?'primary':'dashed'">待发货<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="finish"?true:type=="cancel"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='waitsign'?'primary':'dashed'">待签收<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="cancel"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='finish'?'primary':'dashed'">已完成<Icon type="ios-arrow-forward" /></Button>
        <Button style="margin:0 8px 5px 0" :type="type=='cancel'?'primary':'dashed'">已取消<Icon type="ios-arrow-forward" /></Button>
      </div>
      <div style="margin:20px 0"> 
        <Card >
          <p slot="title">数据信息</p>
          <pendingPayment v-show="type=='waitpay'" ref="pendingPayment" @detailsRefresh="getDetailsRefresh"></pendingPayment> 
          <pendingDisposal v-show="type=='init'" ref="pendingDisposal" @detailsRefresh="getDetailsRefresh"></pendingDisposal>
          <assignPicking  v-show="type=='accept'" ref="assignPicking" @detailsRefresh="getDetailsRefresh"></assignPicking>
          <picking  v-show="type=='collect'" ref="picking" @detailsRefresh="getDetailsRefresh"></picking>
          <waitingList v-show="type=='waitsend'" ref="waitingList" @detailsRefresh="getDetailsRefresh"></waitingList>
          <stockUp v-show="type=='waitsign'" ref="stockUp" @detailsRefresh="getDetailsRefresh"></stockUp>
          <complete v-show="type=='finish'" ref="complete" @detailsRefresh="getDetailsRefresh"></complete>
          <Cancelled v-show="type=='cancel'" ref="Cancelled" @detailsRefresh="getDetailsRefresh"></Cancelled>
        </Card>
      </div>
      <!-- <div style="margin:10px 0">
        <div class="triangle_border_right">
          <span style="line-height:51px">11111</span>
        </div>
      </div> -->
      <Modal v-model="adjustmentModel"  title="调整费用" @on-visible-change="visibleChange">
        <Form  :label-width="110">
          <FormItem label="物流费用：">
              <span style="margin-left:120px">￥{{orderList.deliveryFee}}</span>
          </FormItem>
          <FormItem label="订单总价：" style="margin-bottom:20px" class="size20">
              <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{orderList.totalFee}}</span>
          </FormItem>
         <FormItem label="费用调整：" >
            <div style="display:flex">
              <Select style="width:120px" v-model="adjustmentCost.type">
                <Option value="+" >增加</Option>
                <Option value="-" >减少</Option>
              </Select>
              <Input style="width:90px;margin-left:5px" v-model="adjustmentCost.adjustFee">
                <span slot="append" >元</span>
              </Input>
            </div>
          </FormItem>
          <FormItem label="调整备注：">
            <Input  type="textarea" :rows="4" v-model="adjustmentCost.reason" />
          </FormItem>
        </Form>
        <div slot="footer">
          <div style="">
            <Button type="text" style="margin-right:10px;" @click="cancel">取消</Button>
            <Button type="primary" style="margin-right:10px" @click="costSaveClick">保存</Button>
          </div>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { getWithdrawDetail,
getWithdrawRemarkList,
getWithdrawRemarkDel,
getWithdrawRemarkSave,
getWithdrawFeeAdjust,
timeDate 
 } from "@/api/account";
import pendingPayment from '../components/pendingPayment' //待付款
import pendingDisposal from '../components/pendingDisposal' // 待受理
import assignPicking from '../components/assignPicking'//拣货作业中
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
    assignPicking,
    picking,
    waitingList,
    stockUp,
    Cancelled,
    complete
  },
  watch: {
    type() {
      if (this.type=='waitpay') {
          this.$refs.pendingPayment.getData(this.$route.query.id)
      }else if(this.type=='init'){
        this.$refs.pendingDisposal.getData(this.$route.query.id)
      }else if(this.type=='collect'){
        this.$refs.picking.getData(this.$route.query.id)
      }else if(this.type=='waitsend'){
        this.$refs.waitingList.getData(this.$route.query.id)
      }else if(this.type=='waitsign'){
        this.$refs.stockUp.getData(this.$route.query.id)
      }else if(this.type=='finish'){
        this.$refs.complete.getData(this.$route.query.id)
      }else if(this.type=='cancel'){
        this.$refs.Cancelled.getData(this.$route.query.id)
      }else if(this.type=='accept'){
        this.$refs.assignPicking.getData(this.$route.query.id)
      }
    },
  },
  data () {
    return {
      index:0,//评论id
      userRemark:'',//用户备注
      orderId:this.$route.query.id,
      adjustmentModel:false,
      type:'待付款',
      orderList:{},//基础信息
      adjustmentCost:{
        id:this.$route.query.id,
        type:'',
        adjustFee:'',
        reason:'',
      },//调整费用
      remarkList:[],//评论列表
      stateList:[
        {
          value:'waitpay',
          label:'待付款',
        },
        {
          value:'init',
          label:'待受理',
        },
        {
          value:'collect',
          label:'拣货作业中',
        },
        {
          value:'waitsend',
          label:'待发货',
        },
        {
          value:'waitsign',
          label:'待签收',
        },
        {
          value:'finish',
          label:'已完成',
        },
        {
          value:'cancel',
          label:'已取消',
        },
      ]
    }
  },
  mounted () {
    //
    this.getList()
    this.getRemarkList()
    this.getUserRemark()
  },
  methods:{
    //基础数据
    getList(){
      getWithdrawDetail(this.$route.query.id).then(res=>{
        var arr = res.data
        arr.addressName = arr.area.province+' '+arr.area.city+' '+arr.area.name+' '+arr.plotName+' '+arr.address
        arr.timeCreated = timeDate(arr.timeCreated)
        arr.payStatus = arr.payStatus.code
        this.type = arr.status.code
        this.orderList = arr
      })
    },
    //评论数据
    getRemarkList(){
      let data ={
        orderId:this.orderId,
        from:'admin'
      }
      getWithdrawRemarkList(data).then(res=>{
        var arr = res.data.data
        this.remarkList = arr
      })
    },
    getUserRemark(){
      let data ={
        orderId:this.orderId,
        from:'user'
      }
      getWithdrawRemarkList(data).then(res=>{
        var arr =res.data.data
        this.userRemark = arr[0].content
      })
    },
    //增加评论
    handleAdd () {
      this.index++
      this.remarkList.push({
        content:'',
        id:this.index + ''
      });
    },
    //删除评论
    handleRemove (item) {
      if (item.id.length>10) {
        getWithdrawRemarkDel(item.id).then(res=>{
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
    //评论保存
    handleSave(item){
      let data = {
        orderId:this.orderId,
        content:item.content,
        internal:'false'
      }
      getWithdrawRemarkSave(data).then(res=>{
        this.$Message.success('成功');
        this.getRemarkList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    adjustmentClick(){
      this.adjustmentModel = true
    },
    //保存调整费用
    costSaveClick(){
      let data = {
        id:this.adjustmentCost.id,
        reason:this.adjustmentCost.reason,
      }
      if (this.adjustmentCost.type=='-') {
        data.adjustFee='-'+this.adjustmentCost.adjustFee
      }else{
        data.adjustFee=this.adjustmentCost.adjustFee
      }
      getWithdrawFeeAdjust(data).then(res=>{
        this.getList()
        this.cancel()
        this.$Message.success('成功');
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    //关闭弹窗
    cancel(){
      this.adjustmentCost.type=''
      this.adjustmentCost.adjustFee=''
      this.adjustmentCost.reason=''
      this.adjustmentModel = false
    },
    //刷新详情
    getDetailsRefresh(){
      this.getList()
    },
    backPage () {
      this.$router.go(-1)
    },
    visibleChange(key){
      if (key==false) {
        this.cancel()
      }
      
    },
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
