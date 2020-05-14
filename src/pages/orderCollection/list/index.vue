<template>
  <div>
    <Card>
      <p slot="title">取单列表</p>
      <Form inline :label-width="80" >
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
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem>
          <FormItem label="联系电话" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.linktel"></Input>
          </FormItem>
          <!-- <FormItem label="返送日期" >
            <DatePicker  type="date"  placeholder="开始日期" style="width: 200px" transfer :value="searchList.bookFetchDateStart"  @on-change="searchList.bookFetchDateStart=$event"></DatePicker>
            <span style="margin:0 10px">~</span>
            <DatePicker  type="date"  placeholder="结束日期" style="width: 200px" transfer :value="searchList.bookFetchDateEnd"  @on-change="searchList.bookFetchDateEnd=$event"></DatePicker>
          </FormItem>
          <FormItem label="返送时间" >
            <TimePicker  format="HH" placeholder="开始时间" style="width: 100px" transfer :value="searchList.bookFetchHourStart"  @on-change="searchList.bookFetchHourStart=$event"></TimePicker>
            <span style="margin:0 10px">~</span>
            <TimePicker  format="HH"   placeholder="结束时间" style="width: 100px" transfer :value="searchList.bookFetchHourEnd"  @on-change="searchList.bookFetchHourEnd=$event"></TimePicker>
          </FormItem> -->
          <FormItem >
            <Button type="warning" icon="ios-search" style="" @click="searchClick()">搜索</Button>
            <Button style="margin-left:10px" @click="emptySearchList">清空</Button>
          </FormItem>
      </Form>
      </Form>
      <Tabs  style="margin-top:20px" @on-click="tabsClick">
        <TabPane label="全部" name=""></TabPane>
        <TabPane label="待付款" name="waitpay"></TabPane>
        <TabPane label="待受理" name="init"></TabPane>
        <TabPane label="待分配拣货员" name="accept"></TabPane>
        <TabPane label="拣货作业中" name="collect"></TabPane>
        <TabPane label="待发货" name="waitsend"></TabPane>
        <TabPane label="待签收" name="waitsign"></TabPane>
        <TabPane label="已完成" name="finish"></TabPane>
        <TabPane label="已拒绝" name="refuse"></TabPane>
        <TabPane label="已取消" name="cancel"></TabPane>
      </Tabs>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList" @on-selection-change="tableChangeClick">
          <template slot-scope="{ row, index }" slot="type">
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(188, 190, 191);cursor: default" v-if="row.status.code == 'cancel'">已取消</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#FF8768;cursor: default" v-if="row.status.code == 'init'">待受理</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(74, 210, 142);cursor: default" v-if="row.status.code == 'waitpay'">待支付</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#68B0EF;cursor: default" v-if="row.status.code == 'collect'">拣货作业中</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#ff9900;cursor: default" v-if="row.status.code == 'accept'">待分配拣货员</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#B34DFF;cursor: default" v-if="row.status.code == 'waitsign'">待签收</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#19be6b;cursor: default" v-if="row.status.code == 'finish'">已完成</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#FC041A;cursor: default" v-if="row.status.code == 'refuse'">已拒绝</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#7FF85C;cursor: default" v-if="row.status.code == 'waitsend'">待发货</Button>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"   style="margin-right: 5px;color:#19be6b;" @click="detailsClick(row.id)">详情</Button>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <!-- <Button type="success">接单</Button> -->
          <Button type="success" @click="RefuseToAccept(true)">接单</Button>
          <Button type="error" @click="RefuseToAccept(false)">拒单</Button>
          <Button type="warning" @click="assignRidersClick">分配拣货员</Button>
          <Button type="primary" style="margin:0 8px 5px 0" >导出配送单</Button>
          <Button type="primary" style="margin:0 8px 5px 0" >导出拣货单</Button>
          <Button type="primary" style="margin:0 8px 5px 0" @click="exportData()">导出列表</Button>
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
    <Modal
        v-model="assignRidersModal"
        title="分配拣货员"
        :mask-closable="false">
        <Form ref="formValidate" :model="assignRidersList" :rules="ruleValidate" :label-width="100">
          <FormItem label="拣货员姓名" prop="name">
              <Input v-model="assignRidersList.name" placeholder="请为选中的订单批量分配骑手" style="width:250px"></Input>
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
import { getWithdrawList,getWithdrawCollect,getWithdrawAccept,getWithdrawRefuse } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
      typeModal:false,//接单拒单
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      searchList:{
        status:'',
        orderNo:'',
        linkman:'',
        linktel:'',
        userAccountId:'',
      },
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
          width: 140,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderNo',
          width: 190,
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
          title: '返送地址',
          key: 'addressName',
          minWidth: 240,
          align: 'center'
        },
        {
          title: '订单重量',
          key: 'totalWeight',
          width: 100,
          align: 'center'
        },
        {
          title: '返送数量',
          key: 'packNum',
          width: 100,
          align: 'center'
        },
        {
          title: '箱子数量',
          key: 'packNum',
          width: 100,
          align: 'center'
        },
        {
          title: '箱子总重量',
          key: 'packWeight',
          width: 120,
          align: 'center'
        },
        {
          title: '物品数量',
          key: 'goodsNum',
          width: 100,
          align: 'center'
        },
        {
          title: '物品总重量',
          key: 'goodsWeight',
          width: 120,
          align: 'center'
        },
        {
          title: '物流费用',
          key: 'deliveryFee',
          width: 100,
          align: 'center'
        },
        {
          title: '物流单号',
          key: 'waybillNo',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userId',
          minWidth: 220,
          align: 'center'
        },
        {
          title: '拣货员',
          key: 'pickmanName',
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
      columnsList1:[//导出
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'statusCode',
          width: 140,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderNo',
          width: 190,
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
          title: '返送地址',
          key: 'addressName',
          minWidth: 240,
          align: 'center'
        },
        {
          title: '订单重量',
          key: 'totalWeight',
          width: 100,
          align: 'center'
        },
        {
          title: '返送数量',
          key: 'packNum',
          width: 100,
          align: 'center'
        },
        {
          title: '箱子数量',
          key: 'packNum',
          width: 100,
          align: 'center'
        },
        {
          title: '箱子总重量',
          key: 'packWeight',
          width: 120,
          align: 'center'
        },
        {
          title: '物品数量',
          key: 'goodsNum',
          width: 100,
          align: 'center'
        },
        {
          title: '物品总重量',
          key: 'goodsWeight',
          width: 120,
          align: 'center'
        },
        {
          title: '物流费用',
          key: 'deliveryFee',
          width: 100,
          align: 'center'
        },
        {
          title: '物流单号',
          key: 'waybillNo',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userId',
          minWidth: 220,
          align: 'center'
        },
        {
          title: '拣货员',
          key: 'pickmanName',
          width: 125,
          align: 'center'
        },
      ],
      dataList:[

      ],
      selectionList:[],//多选列表
      type:false,//接单拒单状态
      assignRidersModal:false,
      assignRidersList:{
        name:''
      },
      ruleValidate: {
        name: [
            { required: true, message: '请输入', trigger: 'blur' }
        ],
      }
    }
  },
  mounted () {
    this.searchList=this.$store.state.orderCollectionSearchList
    this.getList()
  },
  methods:{
    searchClick(){
      this.$store.commit('getOrderCollectionSearchList',this.searchList)
      this.getList()
    },
    getList(){
      let data ={
        pageNumber:this.pageNumber,
        pageSize:this.pageSize,
        status:this.searchList.status,
        orderNo:this.searchList.orderNo,
        linkman:this.searchList.linkman,
        linktel:this.searchList.linktel,
        userAccountId:this.searchList.userAccountId,
      }
      getWithdrawList(data).then(res=>{
        var num = 0
        let arr = res.data.data
        arr.forEach(v => {
          num ++ 
          v.num = num
          v.type=v.status.code
          v.statusCode = v.status.name
          if (v.area) {
            v.addressName = v.area.province+' '+v.area.city+' '+v.area.name+' '+v.address
          }else{
            v.addressName = v.address
          }
          
          v.userId=v.user.code
        });
        this.total = res.data.total
        this.dataList=arr
      })
    },
    //分配拣货员
    assignRidersOk(){
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let id=[]
          this.selectionList.forEach(v => {
            id.push(v.id)
          });
          let data ={
            pickmanName:this.assignRidersList.name,
            ids:id.join(',')
          }
          getWithdrawCollect(data).then(res=>{
            this.$Message.success('成功');
            this.getList()
            this.assignRidersList.name=''
            this.assignRidersModal=false
          }).catch(err => {
            this.$Message.error(err.response.data.message)
          })
        } else {
            this.$Message.error('请输入拣货员姓名');
        }
      })
    },
    //分配拣货员弹窗true
    assignRidersClick(){
      if (this.selectionList.length>0) {
        this.assignRidersModal=true
      }else{
        this.$Message.warning('请选择订单');
      }
      
    },
    //分配拣货员弹窗false
    assignRidersCancel(){
      this.assignRidersModal=false
    },
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
    //接单拒单
    RefuseToAccept(key){
      if (this.selectionList.length>0) {
        this.type =key
        this.typeModal=true
      }else{
        this.$Message.warning('请选择订单');
      }
      
    },
    //接单拒单弹窗关闭
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
        getWithdrawAccept(data).then(res=>{
          this.$Message.success('成功');
          this.getList()
          this.typeModal=false
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      }else{
        getWithdrawRefuse(data).then(res=>{
          this.$Message.success('成功');
          this.getList()
          this.typeModal=false
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      }
      
    },
    //多选
    tableChangeClick(selection){
      this.selectionList = selection
    },
    detailsClick(id){
      this.$router.push({
        path: '/orderCollection/details',
        query: {
          id: id
        }
      })
    },
    //清空搜索列表
    emptySearchList(){
      this.searchList.status=''
      this.searchList.orderNo=''
      this.searchList.linkman=''
      this.searchList.linktel=''
      this.searchList.userAccountId=''
      this.$store.commit('getOrderCollectionSearchList',this.searchList)
    },
    exportData (type) {
      this.$refs.selection.exportCsv({
          filename: '取单列表',
          columns: this.columnsList1,
          data:this.dataList
      });
    }
  },
  destroyed(){
    this.$store.commit('getOrderCollectionSearchList',this.searchList)
  },
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
