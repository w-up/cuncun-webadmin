<template>
  <div>
    <Card>
      <p slot="title">仓储订单列表</p>
      <Form inline :label-width="80" >
          <FormItem label="订单号" >
            <Input  placeholder="请输入" style="width:200px" v-model="list.orderNo"></Input>
          </FormItem>
          <FormItem label="用户ID" >
            <Input  placeholder="请输入" style="width:200px" v-model="list.userCode"></Input>
          </FormItem>
          <FormItem label="费用周期" >
            <DatePicker type="daterange" placement="bottom-end" placeholder="请输入" style="width: 200px" :value="list.time"  @on-change="list.time=$event"></DatePicker>
          </FormItem>
          <FormItem label="用户姓名" >
            <Input  placeholder="请输入" style="width:200px" v-model="list.userName"></Input>
          </FormItem>
          <FormItem label="订单状态" >
            <Select  clearable  style="width:200px;" v-model="list.status">
              <Option value="waitcheck" >待审查</Option>
              <Option value="waitpay" >待支付</Option>
              <Option value="payed" >已支付</Option>
            </Select>
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="" @click="getList">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList" @on-selection-change="tableChangeClick">
          <template slot-scope="{ row, index }" slot="type">
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#FF8768;cursor: default" v-if="row.status.code == 'waitcheck'">待审查</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(74, 210, 142);cursor: default" v-if="row.status.code == 'payed'">已支付</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#68B0EF;cursor: default" v-if="row.status.code == 'waitpay'">待支付</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#ff9900;cursor: default" v-if="row.status.code == 'overdue7'">逾期</Button>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"   style="margin-right: 5px;color:#19be6b;" @click="detailsClick(row.id,row.status.code)">审查详情</Button>
             <Poptip
              confirm
              transfer
              @on-ok="tableOk(row.id)"
              title="是否发送订单" >
            <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;"  v-show="row.status.code == 'waitcheck'">发送订单</Button>
          </Poptip>
          </template>
        </Table>
      </div>
      <div class="page" style="margin:20px 0;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <Poptip
            confirm
            title="是否确认批量发送?"
            @on-ok="ok">
            <Button type="success" style="margin:0 8px 5px 0">批量发送</Button>
          </Poptip>
          <Button type="primary" style="margin:0 8px 5px 0" @click="exportData()">导出列表</Button>
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
import {  getStorageOrderList,timeDate1,getStorageOrderSend2user } from "@/api/account";
export default {
  // name: 'home',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      list:{
        orderNo:'',
        status:'',
        userCode:'',
        userName:'',
        time:[]
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
          width: 120,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderNo',
          width: 270,
          align: 'center'
        },
        {
          title: 'SD箱数量',
          key: 'boxSDnum',
          width: 120,
          align: 'center'
        },
        // {
        //   title: 'SD箱物品数量百分比',
        //   key: 'contacts',
        //   width: 170,
        //   align: 'center'
        // },
        {
          title: 'EC箱数量',
          key: 'boxECnum',
          width: 125,
          align: 'center'
        },
        {
          title: '仓储费用/元',
          key: 'fee',
          width: 140,
          align: 'center'
        },
        {
          title: '费用周期',
          key: 'time',
          minWidth: 250,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userCode',
          width: 220,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'userName',
          width: 140,
          align: 'center'
        },
        
        {
          title: '操作',
          slot: 'operation',
          fixed: 'left',
          width: 180,
          align: 'center'
        },
      ],
      columnsList1:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'statusCode',
          width: 120,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderNo',
          width: 270,
          align: 'center'
        },
        {
          title: 'SD箱数量',
          key: 'boxSDnum',
          width: 120,
          align: 'center'
        },
        // {
        //   title: 'SD箱物品数量百分比',
        //   key: 'contacts',
        //   width: 170,
        //   align: 'center'
        // },
        {
          title: 'EC箱数量',
          key: 'boxECnum',
          width: 125,
          align: 'center'
        },
        {
          title: '仓储费用/元',
          key: 'fee',
          width: 140,
          align: 'center'
        },
        {
          title: '费用周期',
          key: 'time',
          minWidth: 250,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userCode',
          width: 220,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'userName',
          width: 140,
          align: 'center'
        }
      ],
      dataList:[
      ],
      selectionList:[],
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      let data ={
        status:this.list.status,
        userName:this.list.userName,
        userCode:this.list.userCode,
        orderNo:this.list.orderNo,
        beginDate:this.list.time[0],
        endDate:this.list.time[1],
        pageNumber:this.pageNumber,
        pageSize:this.pageSize,
      }
      getStorageOrderList(data).then(res=>{
        var num = 0
        let arr = res.data.data
        arr.forEach(v => {
          num ++ 
          v.num = num
          v.time = timeDate1(v.beginDate)+' - '+timeDate1(v.endDate)
          v.userCode = v.user.id
          v.userName = v.user.name
          v.statusCode=v.status.name
        });
        this.total = res.data.total
        this.dataList = arr
        
      })
    },
    changePage (page) {
      this.pageNumber = page - 1
      this.getList()
    },
    pageSizeChange(pageSize){
      this.pageSize=pageSize
      this.getList()
    },
    ok(){
      let id=[]
      this.selectionList.forEach(v => {
        id.push(v.id)
      });
      let ids=id.join(',')
      getStorageOrderSend2user(ids).then(res=>{
        this.$Message.success('成功');
        this.getList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    tableOk(id){
      getStorageOrderSend2user(id).then(res=>{
        this.$Message.success('成功');
        this.getList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    //多选
    tableChangeClick(selection){
      this.selectionList = selection
    },
    detailsClick(id,type){
      this.$router.push({
        path: '/warehouseOrder/details',
        query: {
          id: id,
          type:type
        }
      })
    },
    exportData (type) {
      this.$refs.selection.exportCsv({
          filename: '仓储订单列表',
          columns: this.columnsList1,
          data:this.dataList
      });
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
