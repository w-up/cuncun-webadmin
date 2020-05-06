<template>
  <div>
    <Card>
      <p slot="title">存单列表</p>
      <Form inline :label-width="80" >
          <FormItem label="订单号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.orderNo"></Input>
          </FormItem>
          <FormItem label="联系人" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.linkman"></Input>
          </FormItem>
          <FormItem label="用户ID" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.userAccountId"></Input>
          </FormItem>
          <FormItem label="用户姓名" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.orderNo"></Input>
          </FormItem>
          <FormItem label="联系电话" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.linktel"></Input>
          </FormItem>
          <FormItem label="骑手姓名" >
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem>
          <FormItem label="取件日期" >
            <DatePicker  type="date"  placeholder="开始日期" style="width: 200px" transfer :value="searchList.bookFetchDateStart"  @on-change="searchList.bookFetchDateStart=$event"></DatePicker>
            <span style="margin:0 10px">~</span>
            <DatePicker  type="date"  placeholder="结束日期" style="width: 200px" transfer :value="searchList.bookFetchDateEnd"  @on-change="searchList.bookFetchDateEnd=$event"></DatePicker>
            <!-- :value="searchList.beginDt"  @on-change="searchList.beginDt=$event" -->
          </FormItem>
          <FormItem label="取件时间" >
            <TimePicker  format="HH" placeholder="开始时间" style="width: 100px" transfer :value="searchList.bookFetchHourStart"  @on-change="searchList.bookFetchHourStart=$event"></TimePicker>
            <span style="margin:0 10px">~</span>
            <TimePicker  format="HH"   placeholder="结束时间" style="width: 100px" transfer :value="searchList.bookFetchHourEnd"  @on-change="searchList.bookFetchHourEnd=$event"></TimePicker>
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="" @click="getList()">搜索</Button>
          </FormItem>
      </Form>
      <Tabs  style="margin-top:20px" @on-click="tabsClick">
        <TabPane label="全部" name=" "></TabPane>
        <TabPane label="待处理" name="init"></TabPane>
        <TabPane label="待分配骑手" name="assign"></TabPane>
        <TabPane label="待取货" name="fetch"></TabPane>
        <TabPane label="回库中" name="delivery"></TabPane>
        <!-- <TabPane label="入库作业中" name="inputwork"></TabPane> -->
        <TabPane label="安检中" name="monitor"></TabPane>
        <TabPane label="待拍照" name="photo"></TabPane>
        <TabPane label="待上架" name="ready"></TabPane>
        <TabPane label="待支付" name="waitpay"></TabPane>
        <TabPane label="已完成" name="finish"></TabPane>
        <TabPane label="已取消" name="cancel"></TabPane>
      </Tabs>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList" @on-selection-change="tableChangeClick">
          <template slot-scope="{ row, index }" slot="type">
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(188, 190, 191);cursor: default" v-if="row.status.code == 'cancel'">已取消</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#FF8768;cursor: default" v-if="row.status.code == 'init'">待处理</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(74, 210, 142);cursor: default" v-if="row.status.code == 'waitpay'">待支付</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#68B0EF;cursor: default" v-if="row.status.code == 'inputwork'">入库中</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#ff9900;cursor: default" v-if="row.status.code == 'assign'">待分配骑手</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#B34DFF;cursor: default" v-if="row.status.code == 'fetch'">待取货</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#21C7FF;cursor: default" v-if="row.status.code == 'delivery'">回库中</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#DAEB2A;cursor: default" v-if="row.status.code == 'monitor'">安检中</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#7FF85C;cursor: default" v-if="row.status.code == 'photo'">拍照中</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#585EEE;cursor: default" v-if="row.status.code == 'ready'">待上架</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#19be6b;cursor: default" v-if="row.status.code == 'finish'">已完成</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#FC041A;cursor: default" v-if="row.status.code == 'refuse'">拒单</Button>
          </template>
          <template slot-scope="{ row, index }" slot="paymentType">
            <!-- <Icon type="md-checkmark-circle" size='24' color="#19be6b"/> -->
            <!-- <Icon type="md-close-circle"  size='24' color="#ed4014"/>
            <Icon type="md-close-circle"  size='24' color="#ed4014"/> -->
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"  style="margin-right: 5px;color:#19be6b;" @click="detailsClick(row.id)">详情</Button>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <Button type="success" @click="RefuseToAccept(true)">接单</Button>
          <Button type="error" @click="RefuseToAccept(false)">拒单</Button>
          <Button type="info">导出取件单</Button>
          <Button type="info">导出上架单</Button>
          <Button type="warning" @click="assignRidersClick">分配骑手</Button>
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
    <Modal
        v-model="assignRidersModal"
        title="分配骑手"
        :mask-closable="false">
        <Form ref="formValidate" :model="assignRidersList" :rules="ruleValidate" :label-width="80">
          <FormItem label="骑手姓名" prop="name">
              <Input v-model="assignRidersList.name" placeholder="请为选中的订单批量分配骑手" style="width:300px"></Input>
          </FormItem>
        </Form>
        <div slot="footer" style="text-align: right;">
          <Button type="text" @click="assignRidersCancel">取消</Button>
          <Button type="primary" @click="assignRidersOk">确定</Button>
        </div>
    </Modal>
    <Modal
        v-model="typeModal"
        :mask-closable="false">
        <div style="height:100px;line-height:100px">
          <h2 v-show="type" style="text-align: center">是否确认将已选中的订单全部接单</h2>
          <h2 v-show="!type" style="text-align: center">是否确认将已选中的订单全部拒单</h2>
        </div>
        
        <div slot="footer" style="text-align: right;">
          <Button type="text" @click="typeCancel">取消</Button>
          <Button type="primary" @click="typeOk">确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { getdepositPrderList,
getAccept,
getRefuse,
getAssign } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      type:true,
      typeModal:false,
      columnsList:[
        {
          type: 'selection',
          width: 60,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '订单状态',
          slot: 'type',
          width: 120,
          align: 'center'
        },
        {
          title: '支付状态',
          slot: 'paymentType',
          width: 120,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderNo',
          width: 180,
          align: 'center'
        },
        {
          title: '联系人',
          key: 'linkman',
          width: 160,
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'mobile',
          width: 125,
          align: 'center'
        },
        {
          title: '取件地址',
          key: 'address',
          minWidth: 240,
          align: 'center'
        },
        {
          title: '取件日期',
          key: 'bookFetchDate',
          width: 120,
          align: 'center'
        },
        {
          title: '取件时间',
          key: 'time',
          width: 100,
          align: 'center'
        },
        {
          title: '预估数量',
          key: 'prepareBoxNum',
          width: 100,
          align: 'center'
        },
        {
          title: '物流费用',
          key: 'prepaid',
          width: 100,
          align: 'center'
        },
        {
          title: '骑手姓名',
          key: 'riderName',
          width: 120,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userID',
          width: 125,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 100,
          fixed: 'left',
          align: 'center'
        },
      ],
      dataList:[
      ],
      assignRidersModal:false,
      assignRidersList:{
        name:''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
      },
      selectionList:[],//选中数据
      searchList:{
        status:'',
        orderNo:'',
        linkman:'',
        linktel:'',
        userAccountId:'',
        bookFetchDateStart:'',
        bookFetchDateEnd:'',
        bookFetchHourStart:'',
        bookFetchHourEnd:'',
      }
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      let data ={
        pageNumber:this.pageNumber,
        pageSize:this.pageSize,
        status:this.searchList.status,
        orderNo:this.searchList.orderNo,
        linkman:this.searchList.linkman,
        linktel:this.searchList.linktel,
        userAccountId:this.searchList.userAccountId,
        bookFetchDateStart:this.searchList.bookFetchDateStart,
        bookFetchDateEnd:this.searchList.bookFetchDateEnd,
        bookFetchHourStart:this.searchList.bookFetchHourStart,
        bookFetchHourEnd:this.searchList.bookFetchHourEnd,
      }
      getdepositPrderList(data).then(res=>{
        var num = 0
        let arr = res.data.data
        arr.forEach(v => {
          num ++ 
          v.num = num
          v.time = v.bookFetchTime[0]+' ~ '+v.bookFetchTime[1]
        });
        this.total = res.data.total
        this.dataList = arr
        
      })
    },
    assignRidersOk(){
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let id=[]
          this.selectionList.forEach(v => {
            id.push(v.id)
          });
          let data ={
            diliveryManName:this.assignRidersList.name,
            ids:id.join(',')
          }
          getAssign(data).then(res=>{
            this.$Message.success('成功');
            this.getList()
            this.assignRidersList.name=''
            this.assignRidersModal=false
          }).catch(err => {
            this.$Message.error(err.response.data.message)
          })
          
        } else {
            this.$Message.error('请输入骑手姓名');
        }
      })
    },
    assignRidersCancel(){
      this.assignRidersList.name=''
      this.assignRidersModal=false
    },
    //分配骑手
    assignRidersClick(){
      if (this.selectionList.length>0) {
        this.assignRidersModal=true
      }else{
        this.$Message.warning('请选择订单');
      }
      
    },
    //选择状态
    tabsClick(name){
      this.searchList.status = name
      this.pageNumber = 0
      this.getList()
    },
    changePage (page) {
      this.pageNumber = page - 1
      this.getList()
    },
    pageSizeChange(pageSize){
      this.pageSize=pageSize
      this.getList()
    },
    detailsClick(id){
      this.$router.push({
        path: '/depositReceipt/details',
        query: {
          id: id
        }
      })
    },
    tableChangeClick(selection){
      this.selectionList = selection
    },
    //接单拒单
    RefuseToAccept(key){
      if (this.selectionList.length>0) {
        this.type =key
        this.typeModal=true
      }else{
        this.$Message.warning('请选择订单');
      }
      
    },
    //接单拒单弹窗取消
    typeCancel(){
      this.typeModal=false
    },
    //接单拒单弹窗确定
    typeOk(){
      let id=[]
      this.selectionList.forEach(v => {
        id.push(v.id)
      });
      let data ={
        ids:id.join(',')
      }
      if (this.type==true) {
        getAccept(data).then(res=>{
          this.$Message.success('成功');
          this.getList()
          this.typeModal=false
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      }else{
        getRefuse(data).then(res=>{
          this.$Message.success('成功');
          this.getList()
          this.typeModal=false
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      }
      
    },
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
    
  }
</style>
