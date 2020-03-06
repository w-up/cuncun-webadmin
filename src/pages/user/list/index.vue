
<template>
  <div>
    <Card>
      <p slot="title">用户列表</p>
      <Form inline :label-width="80" >
          <FormItem label="手机号" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="注册时间" >
            <DatePicker  type="date"  placeholder="开始日期" style="width: 200px" transfer></DatePicker>
            <span style="margin:0 10px">~</span>
            <DatePicker  type="date"  placeholder="结束日期" style="width: 200px" transfer></DatePicker>
            <!-- :value="searchList.beginDt"  @on-change="searchList.beginDt=$event" -->
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <!-- <Button type="success">接单</Button> -->
          <!-- <Button type="success">导出拣货单</Button>
          <Button type="info">导出配送单</Button>
          <Button type="warning" @click="assignRidersClick">分配骑手</Button> -->
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
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
          title: '序号',
          key: 'serialNumber',
          width: 70,
          align: 'center'
        },
        {
          title: '昵称',
          key: 'orderNumber',
          width: 180,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'contacts',
          width: 180,
          align: 'center'
        },
        {
          title: '真实姓名',
          key: 'phone',
          width: 180,
          align: 'center'
        },
        {
          title: '身份证号',
          key: 'address',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'date',
          width: 200,
          align: 'center'
        },
      ],
      dataList:[
        {
          id:'1',
         serialNumber:'1',
         state:'22', 
         orderNumber:'哈哈哈', 
         contacts:'1355587445', 
         phone:'哇哇哇', 
         address:'358888888888888', 
         date:'2月1日~2月29日', 
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
         orderNumber:'哈哈哈', 
         contacts:'1355587445', 
         phone:'哇哇哇', 
         address:'358888888888888', 
         date:'2月1日~2月29日', 
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
         orderNumber:'哈哈哈', 
         contacts:'1355587445', 
         phone:'哇哇哇', 
         address:'358888888888888', 
         date:'2月1日~2月29日', 
         time:'14:13:30', 
         num:'132', 
         logisticsCost:'14', 
         riderName:'-', 
         userID:'13244324323', 
        },
      ],
    }
  },
  mounted () {
    //
  },
  methods:{
    getList(){

    },
    changePage (page) {
      this.pageNumber = page - 1
      this.getList()
    },
    pageSizeChange(pageSize){
      this.pageSize=pageSize
      this.getList()
    },
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
