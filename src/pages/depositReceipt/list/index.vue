<template>
  <div>
    <Card>
      <Form inline :label-width="80" >
          <FormItem label="订单号" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="联系人" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="用户ID" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="用户姓名" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="联系电话" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="骑手姓名" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="取件日期" >
            <DatePicker  type="date"  placeholder="开始日期" style="width: 200px" transfer></DatePicker>
            <span style="margin:0 10px">~</span>
            <DatePicker  type="date"  placeholder="结束日期" style="width: 200px" transfer></DatePicker>
            <!-- :value="searchList.beginDt"  @on-change="searchList.beginDt=$event" -->
          </FormItem>
          <FormItem label="取件时间" >
            <TimePicker type="time"  placeholder="开始时间" style="width: 200px" transfer></TimePicker>
            <span style="margin:0 10px">~</span>
            <TimePicker type="time"  placeholder="结束时间" style="width: 200px" transfer></TimePicker>
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="">搜索</Button>
          </FormItem>
      </Form>
      <Tabs  style="margin-top:20px" @on-click="tabsClick">
        <TabPane label="全部" name="name1"></TabPane>
        <TabPane label="待处理" name="name2"></TabPane>
        <TabPane label="待分配骑手" name="name3"></TabPane>
        <TabPane label="待取货" name="name4"></TabPane>
        <TabPane label="回库中" name="name5"></TabPane>
        <TabPane label="入库作业中" name="name6"></TabPane>
        <TabPane label="安检中" name="name7"></TabPane>
        <TabPane label="待拍照" name="name8"></TabPane>
        <TabPane label="待上架" name="name9"></TabPane>
        <TabPane label="待支付" name="name10"></TabPane>
        <TabPane label="已完成" name="name11"></TabPane>
        <TabPane label="已取消" name="name12"></TabPane>
      </Tabs>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
          <template slot-scope="{ row, index }" slot="type">
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(188, 190, 191);cursor: default" v-if="row.state == '11'">已取消</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#FF8768;cursor: default" v-if="row.state == '22'">待处理</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(74, 210, 142);cursor: default" v-if="row.state == '33'">待支付</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#68B0EF;cursor: default" v-if="row.state == '44'">入库作业中</Button>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small" icon="md-create" style="margin-right: 5px;color:#19be6b;" @click="detailsClick(row.id)">详情</Button>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <Button type="success">接单</Button>
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
              <Input v-model="assignRidersList.name" placeholder="请为选中的订单批量分配骑手"></Input>
          </FormItem>
        </Form>
        <div slot="footer" style="text-align: right;">
          <Button type="text" @click="assignRidersCancel">取消</Button>
          <Button type="primary" @click="assignRidersOk">确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  // name: 'home',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      columnsList:[
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          key: 'serialNumber',
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
          key: 'orderNumber',
          width: 120,
          align: 'center'
        },
        {
          title: '联系人',
          key: 'contacts',
          width: 120,
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'phone',
          width: 120,
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
          key: 'date',
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
          key: 'num',
          width: 100,
          align: 'center'
        },
        {
          title: '物流费用',
          key: 'logisticsCost',
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
          width: 120,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 100,
          fixed: 'right',
          align: 'center'
        },
      ],
      dataList:[
        {
          id:'1',
         serialNumber:'1',
         state:'11', 
         orderNumber:'15544556677', 
         contacts:'Ding Han', 
         phone:'13344223232', 
         address:'上海市黄浦区九江路666号13B', 
         date:'2019-12-13', 
         time:'14:13:30', 
         num:'132', 
         logisticsCost:'14', 
         riderName:'-', 
         userID:'13244324323', 
        },
        {
          id:'1',
         serialNumber:'1',
         state:'22', 
         orderNumber:'15544556677', 
         contacts:'Ding Han', 
         phone:'13344223232', 
         address:'上海市黄浦区九江路666号13B', 
         date:'2019-12-13', 
         time:'14:13:30', 
         num:'132', 
         logisticsCost:'14', 
         riderName:'-', 
         userID:'13244324323', 
        },
        {
          id:'1',
         serialNumber:'1',
         state:'33', 
         orderNumber:'15544556677', 
         contacts:'Ding Han', 
         phone:'13344223232', 
         address:'上海市黄浦区九江路666号13B', 
         date:'2019-12-13', 
         time:'14:13:30', 
         num:'132', 
         logisticsCost:'14', 
         riderName:'-', 
         userID:'13244324323', 
        },
        {
          id:'1',
         serialNumber:'1',
         state:'44', 
         orderNumber:'15544556677', 
         contacts:'Ding Han', 
         phone:'13344223232', 
         address:'上海市黄浦区九江路666号13B', 
         date:'2019-12-13', 
         time:'14:13:30', 
         num:'132', 
         logisticsCost:'14', 
         riderName:'-', 
         userID:'13244324323', 
        },
        {
          id:'1',
         serialNumber:'1',
         state:'44', 
         orderNumber:'15544556677', 
         contacts:'Ding Han', 
         phone:'13344223232', 
         address:'上海市黄浦区九江路666号13B', 
         date:'2019-12-13', 
         time:'14:13:30', 
         num:'132', 
         logisticsCost:'14', 
         riderName:'-', 
         userID:'13244324323', 
        },
        {
          id:'1',
         serialNumber:'1',
         state:'44', 
         orderNumber:'15544556677', 
         contacts:'Ding Han', 
         phone:'13344223232', 
         address:'上海市黄浦区九江路666号13B', 
         date:'2019-12-13', 
         time:'14:13:30', 
         num:'132', 
         logisticsCost:'14', 
         riderName:'-', 
         userID:'13244324323', 
        },
      ],
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
    //
  },
  methods:{
    getList(){

    },
    assignRidersClick(){
      this.assignRidersModal=true
    },
    assignRidersOk(){
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
            this.$Message.success('Success!');
            this.assignRidersModal=false
        } else {
            this.$Message.error('请输入骑手姓名');
        }
      })
    },
    assignRidersCancel(){
      this.assignRidersModal=false
    },
    tabsClick(name){
      console.log(name);
      
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
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
