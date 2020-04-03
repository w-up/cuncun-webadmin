<template>
  <div>
    <Card>
      <p slot="title">仓储订单列表</p>
      <Form inline :label-width="80" >
          <FormItem label="订单号" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="用户ID" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="费用周期" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem label="用户姓名" >
            <Input  placeholder="请输入" style="width:200px"></Input>
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
          <template slot-scope="{ row, index }" slot="type">
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#FF8768;cursor: default" v-if="row.state == '22'">待审查</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:rgb(74, 210, 142);cursor: default" v-if="row.state == '33'">已支付</Button>
            <Button type="text" size="small"  style="color:#ffffff;backgroundColor:#68B0EF;cursor: default" v-if="row.state == '44'">待支付</Button>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small" icon="md-create" style="margin-right: 5px;color:#19be6b;" @click="detailsClick(row.id,row.state)">审查详情</Button>
             <Poptip
              confirm
              transfer
              title="是否通过审查">
            <Button type="text" size="small" icon="md-reorder" style="margin-right: 5px;color:#ff9900;"  v-show="row.state=='22'">发送订单</Button>
          </Poptip>
          </template>
        </Table>
      </div>
      <div class="page" style="margin:20px 0;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <Button type="success">批量发送</Button>
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
          type: 'selection',
          width: 60,
          fixed: 'left',
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
          width: 125,
          align: 'center'
        },
        {
          title: 'SD箱数量',
          key: 'contacts',
          width: 120,
          align: 'center'
        },
        {
          title: 'SD箱物品数量百分比',
          key: 'contacts',
          width: 170,
          align: 'center'
        },
        {
          title: 'EC箱数量',
          key: 'phone',
          width: 125,
          align: 'center'
        },
        {
          title: '仓储费用/元',
          key: 'address',
          width: 140,
          align: 'center'
        },
        {
          title: '费用周期',
          key: 'date',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userID',
          width: 125,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'riderName',
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
      dataList:[
        {
          id:'1',
         serialNumber:'1',
         state:'22', 
         orderNumber:'15544556677', 
         contacts:'5', 
         phone:'5', 
         address:'400', 
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
         orderNumber:'15544556677', 
         contacts:'5', 
         phone:'5', 
         address:'400', 
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
         orderNumber:'15544556677', 
         contacts:'5', 
         phone:'5', 
         address:'400', 
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
         state:'44', 
         orderNumber:'15544556677', 
         contacts:'5', 
         phone:'5', 
         address:'400', 
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
         state:'44', 
         orderNumber:'15544556677', 
         contacts:'5', 
         phone:'5', 
         address:'400', 
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
         state:'44', 
         orderNumber:'15544556677', 
         contacts:'5', 
         phone:'5', 
         address:'400', 
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
    detailsClick(id,type){
      this.$router.push({
        path: '/warehouseOrder/details',
        query: {
          id: id,
          type:type
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
