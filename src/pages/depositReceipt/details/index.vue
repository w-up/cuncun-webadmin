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
                <span>{{orderList.telephone}}</span>
            </FormItem>
            <FormItem label="骑手：">
                <span>{{orderList.diliveryManName}}</span>
                <Button type="success" style="margin-left:10px" v-show='type=="fetch"?true:false' @click="modifyRiderModal=true">修改骑手</Button>
            </FormItem>
            <FormItem label="联系人：">
                <span>{{orderList.contacts}}</span>
            </FormItem>
            <FormItem label="联系电话：">
                <span>{{orderList.phone}}</span>
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
          <Button slot="extra" v-show='type=="delivery"?true:false' @click="adjustmentClick">调整费用</Button>
          <div v-show='type=="waitpay"?false:type=="init"?false:type=="assign"?false:type=="fetch"?false:type=="delivery"?false:true'>
            <Form  :label-width="110">
              <FormItem label="运输费用：">
                  <span style="margin-left:100px">￥{{costList.transport}} {{costList.deliveryFeeNew<0?'-':'+'}} ￥{{costList.deliveryFeeNew}}</span>
              </FormItem>
              <FormItem label="打包费用：">
                  <span style="margin-left:100px">￥{{costList.pack}} {{costList.packFeeNew<0?'-':'+'}} ￥{{costList.packFeeNew}}</span>
              </FormItem>
              <FormItem label="纸箱费用：">
                  <span style="margin-left:100px">￥{{costList.case}} {{costList.boxFeeNew<0?'-':'+'}} ￥{{costList.boxFeeNew}}</span>
              </FormItem>
              <FormItem label="订单总费用：" style="margin-bottom:20px" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:100px">￥{{costList.total}} {{costList.settleFee<0?'-':'+'}} ￥{{costList.settleFee}}</span>
              </FormItem>
              <FormItem label="实际付费用：" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:120px">￥{{costList.settleFee1}}</span>
              </FormItem>
            </Form>
          </div>
          <div v-show='type=="waitpay"?true:type=="init"?true:type=="assign"?true:type=="fetch"?true:type=="delivery"?true:false' >
            <Form  :label-width="110">
              <FormItem label="运输费用：">
                  <span style="margin-left:100px">￥{{costList.transport}} {{costList.deliveryFeeNew<0?'-':'+'}} ￥{{costList.deliveryFeeNew}}</span>
              </FormItem>
              <FormItem label="打包费用：">
                  <span style="margin-left:100px">￥{{costList.pack}} {{costList.packFeeNew<0?'-':'+'}} ￥{{costList.packFeeNew}}</span>
              </FormItem>
              <FormItem label="纸箱费用：">
                  <span style="margin-left:100px">￥{{costList.case}} {{costList.boxFeeNew<0?'-':'+'}} ￥{{costList.boxFeeNew}}</span>
              </FormItem>
              <FormItem label="调整费用：">
                  <span style="margin-left:100px">￥{{costList.adjustFee}}</span>
              </FormItem>
              <FormItem label="订单总费用：" style="margin-bottom:20px" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:100px">￥{{costList.total}} {{costList.settleFee<0?'-':'+'}} ￥{{costList.settleFee}}</span>
              </FormItem>
              <FormItem label="已支付费用：" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:100px">￥{{costList.actualPayment}}</span>
              </FormItem>
              <FormItem label="剩余待支付：" class="size20">
                  <span style="font-size: 15px;font-weight: 600;margin-left:100px">￥{{costList.appendFee}}</span>
              </FormItem>
              <FormItem :label="costList.adjustPayStatus=='waitSettle'?'待结算':'待支付'" v-show='costList.adjustPayStatus!="payed"&&type=="delivery"'>
                <Poptip
                    confirm
                    transfer
                    title="是否确认发起结算?"
                    @on-ok="settleOk"
                    >
                    <Button type="success" style="margin-left:100px" v-show='type=="delivery"?true:false'>发起结算</Button>
                </Poptip>
              </FormItem>
            </Form>
          </div>
        </Card>
        <Card style="width:500px;margin-top:10px">
          <p slot="title">备注信息</p>
          <Form  :label-width="90" label-position='top'>
            <FormItem label="用户备注：">
              <Input   type="textarea"  :rows="5" v-model="userRemark" disabled/>
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
        <Button :disabled='type=="init"?true:type=="assign"?true:type=="fetch"?true:type=="delivery"?true:type=="monitor"?true:type=="photo"?true:type=="ready"?true:type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='waitpay'?'primary':'dashed'">待付款<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="assign"?true:type=="fetch"?true:type=="delivery"?true:type=="monitor"?true:type=="photo"?true:type=="ready"?true:type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          :type="type=='init'?'primary':'dashed'" style="margin:0 8px 5px 0">待受理<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="fetch"?true:type=="delivery"?true:type=="monitor"?true:type=="photo"?true:type=="ready"?true:type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='assign'?'primary':'dashed'">待分配骑手<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="delivery"?true:type=="monitor"?true:type=="photo"?true:type=="ready"?true:type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='fetch'?'primary':'dashed'">待取货<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="monitor"?true:type=="photo"?true:type=="ready"?true:type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='delivery'?'primary':'dashed'">回库中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="photo"?true:type=="ready"?true:type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='monitor'?'primary':'dashed'">安检中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="ready"?true:type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='photo'?'primary':'dashed'">拍照中<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="finish"?true:type=="cancel "?true:type=="refuse"?true:false' 
          style="margin:0 8px 5px 0" :type="type=='ready'?'primary':'dashed'">待上架<Icon type="ios-arrow-forward" /></Button>
        <Button :disabled='type=="cancel"?true:type=="refuse"?true:false' style="margin:0 8px 5px 0" :type="type=='finish'?'primary':'dashed'">已完成<Icon type="ios-arrow-forward" /></Button>
        <Button style="margin:0 8px 5px 0" :type="type=='cancel'||type=='refuse'?'primary':'dashed'">已取消<Icon type="ios-arrow-forward" /></Button>
      </div>
      <div style="margin:20px 0"> 
        <Card >
          <p slot="title">数据信息</p>
          <pendingPayment v-show="type=='waitpay'" ref="pendingPayment" @detailsRefresh="getDetailsRefresh"></pendingPayment> 
          <pendingDisposal v-show="type=='init'" ref="pendingDisposal" @detailsRefresh="getDetailsRefresh"></pendingDisposal>
          <assignRiders  v-show="type=='assign'" ref="assignRiders" @detailsRefresh="getDetailsRefresh"></assignRiders>
          <waitingForDelivery v-show="type=='fetch'" ref="waitingForDelivery" @detailsRefresh="getDetailsRefresh"></waitingForDelivery>
          <returningLibrary v-show="type=='delivery'" ref="returningLibrary" @detailsRefresh="getDetailsRefresh"></returningLibrary>
          <securityCheck v-show="type=='monitor'" ref="securityCheck" @detailsRefresh="getDetailsRefresh"></securityCheck>
          <stayPhotograph v-show="type=='photo'" ref="stayPhotograph" @detailsRefresh="getDetailsRefresh"></stayPhotograph>
          <toStayOn v-show="type=='ready'" ref="toStayOn" @detailsRefresh="getDetailsRefresh"></toStayOn>
          <complete v-show="type=='finish'" ref="complete" @detailsRefresh="getDetailsRefresh"></complete>
        </Card>
      </div>
      <!-- <div style="margin:10px 0">
        <div class="triangle_border_right">
          <span style="line-height:51px">11111</span>
        </div>
      </div> -->
      <Modal v-model="modifyRiderModal"  title="修改骑手">
        <Form  :label-width="110">
          <FormItem label="骑手姓名">
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <div style="">
            <Button type="text" style="margin-right:10px;" @click="modifyRiderCancel">取消</Button>
            <Button type="primary" style="margin-right:10px" @click="modifyRiderClick">保存</Button>
          </div>
        </div>
      </Modal>
      <Modal v-model="adjustmentModel"  title="费用调整" @on-visible-change="visibleChange">
        <Form  :label-width="110">
          <FormItem label="运输费用：">
              <span style="margin-left:100px">￥{{costList.transport}} + ￥{{costList.deliveryFeeNew}}</span>
          </FormItem>
          <FormItem label="打包费用：">
              <span style="margin-left:100px">￥{{costList.pack}} + ￥{{costList.packFeeNew}}</span>
          </FormItem>
          <FormItem label="纸箱费用：">
              <span style="margin-left:100px">￥{{costList.case}} + ￥{{costList.boxFeeNew}}</span>
          </FormItem>
          <FormItem label="调整费用：">
              <span style="margin-left:100px">￥{{costList.adjustFee}}</span>
          </FormItem>
          <FormItem label="订单总费用：" style="margin-bottom:20px" class="size20">
              <span style="font-size: 15px;font-weight: 600;margin-left:100px">￥{{costList.total}} + ￥{{costList.settleFee}}</span>
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
import { getRemarkPage,
getRemarkAdd,
getRemarkDel,
getOrderDetail,
getFeeAdjust,
getFeeSettle } from "@api/account";
import pendingPayment from '../components/pendingPayment' //待付款
import pendingDisposal from '../components/pendingDisposal' // init
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
  watch: {
    type() {
      if (this.type=='waitpay') {
          this.$refs.pendingPayment.getData(this.$route.query.id)
      }else if(this.type=='init'){
        this.$refs.pendingDisposal.getData(this.$route.query.id)
      }else if(this.type=='assign'){
        this.$refs.assignRiders.getData(this.$route.query.id)
      }else if(this.type=='fetch'){
        this.$refs.waitingForDelivery.getData(this.$route.query.id)
      }else if(this.type=='delivery'){
        this.$refs.returningLibrary.getData(this.$route.query.id)
      }else if(this.type=='monitor'){
        this.$refs.securityCheck.getData(this.$route.query.id)
      }else if(this.type=='photo'){
        this.$refs.stayPhotograph.getData(this.$route.query.id)
      }else if(this.type=='ready'){
        this.$refs.toStayOn.getData(this.$route.query.id)
      }else if(this.type=='finish'){
        this.$refs.complete.getData(this.$route.query.id)
      }
    },
  },
  data () {
    return {
      orderId:this.$route.query.id,
      index:0,
      modifyRiderModal:false,//修改骑手弹窗
      userRemark:'',//用户备注
      adjustmentModel:false,
      remarkList:[],
      type:'',
      orderList:{
        orderNumber:'',
        name:'',
        phone:'',
        diliveryManName:'',
        contacts:'',
        telephone:'',
        address:'',
        time:'',
      },
      costList:{
        transport:'',
        pack:'',
        case:'',
        adjustFee:'',
        total:'',
        actualPayment:'',
        adjustPayStatus:'',
      },
      adjustmentCost:{
        id:this.$route.query.id,
        type:'',
        adjustFee:'',
        reason:'',
      },
      stateList:[
        {
          value:'waitpay',
          label:'待付款',
        },
        {
          value:'init',
          label:'待处理',
        },
        {
          value:'assign',
          label:'待分配骑手',
        },
        {
          value:'fetch',
          label:'待取货',
        },
        {
          value:'delivery',
          label:'回库中',
        },
        {
          value:'monitor',
          label:'安检中',
        },
        {
          value:'photo',
          label:'拍照中',
        },
        {
          value:'ready',
          label:'待上架',
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
    this.OrderDetail()//存单详情
    this.getRemarkList()//评论列表
    this.getUserRemark()
    
  },
  methods:{
    //存单详情
    OrderDetail(){
      getOrderDetail(this.$route.query.id).then(res=>{
        var arr = res.data
        this.type=arr.status.code
        this.orderList.orderNumber=arr.orderNo
        // this.orderList.name=arr.linkman
        this.orderList.phone=arr.mobile
        if (arr.diliveryManName) {
          this.orderList.diliveryManName=arr.diliveryManName
        }
        if (arr.deliveryFeeNew) {
           if(arr.deliveryFeeNew==0){

          }else{
            arr.deliveryFeeNew= arr.deliveryFeeNew - arr.deliveryFee
          }
        }else{
          arr.deliveryFeeNew=0
        }
        if (arr.packFeeNew) {
           if(arr.packFeeNew==0){

          }else{
            arr.packFeeNew= arr.packFeeNew - arr.packFee
          }
        }else{
          arr.packFeeNew=0
        }
        if (arr.boxFeeNew) {
           if(arr.boxFeeNew==0){

          }else{
            arr.boxFeeNew= arr.boxFeeNew - arr.boxFee
          }
        }else{
          arr.boxFeeNew=0
        }
        arr.settleFee1= arr.settleFee
        if (arr.settleFee) {
          if(arr.settleFee==0){

          }else{
            arr.settleFee= arr.settleFee - arr.totalFee
          }
        }else{
          arr.settleFee=0
        }
        this.costList.deliveryFeeNew= arr.deliveryFeeNew
        this.costList.packFeeNew= arr.packFeeNew
        this.costList.boxFeeNew= arr.boxFeeNew
        this.costList.settleFee = arr.settleFee 
        this.costList.appendFee = arr.appendFee 
        this.orderList.name=arr.user.name
        this.orderList.telephone=arr.user.mobile
        this.orderList.contacts=arr.linkman
        this.orderList.address=arr.address
        this.orderList.time=arr.bookFetchDate + ' '+arr.bookFetchTime[0]+' - '+arr.bookFetchTime[1]
        this.costList.transport= arr.deliveryFee
        this.costList.pack= arr.packFee
        this.costList.case= arr.boxFee
        this.costList.total= arr.totalFee
        this.costList.adjustFee= arr.adjustFee
        this.costList.actualPayment= arr.prepaid
        this.costList.adjustPayStatus= arr.adjustPayStatus.code
        // console.log(arr);
        
      })
    },
    getUserRemark(){
      let data = {
        orderId:this.$route.query.id,
        from:'user'
      }
      getRemarkPage(data).then(res=>{
        var arr =res.data.data
        this.userRemark = arr[0].content

      })
    },
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
      getFeeAdjust(data).then(res=>{
        this.OrderDetail()
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
    backPage () {
      this.$router.go(-1)
    },
    visibleChange(key){
      if (key==false) {
        this.cancel()
      }
      
    },
    //修改骑手
    modifyRiderClick(){
      
    },
    //修改骑手弹窗关闭
    modifyRiderCancel(){
      this.modifyRiderModal=false
    },
    //刷新详情
    getDetailsRefresh(){
      this.OrderDetail()
    },
    //发起结算
    settleOk(){
      let data={
        id:this.orderId
      }
      getFeeSettle(data).then(res=>{
        this.OrderDetail()
        this.$Message.success('成功');
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
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
