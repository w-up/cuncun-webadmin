
<template>
  <div>
    <Card>
      <p slot="title">用户数据统计</p>
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
          <FormItem label="注册来源" >
            <Select   style="width:200px;">
              <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small" icon="md-create" style="margin-right: 5px;color:#19be6b;" @click="addressClick(row.id)">常用地址</Button>
            <Button type="text" size="small" icon="md-reorder" style="margin-right: 5px;color:#ff9900;" @click="detailedClick(row.id)">订单明细</Button>
          </template>
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
          width: 160,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'contacts',
          width: 160,
          align: 'center'
        },
        {
          title: '性别',
          key: 'phone',
          width: 100,
          align: 'center'
        },
        {
          title: '年龄',
          key: 'address',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'date',
          width: 200,
          align: 'center'
        },
        {
          title: '注册来源',
          key: 'datee',
          width: 200,
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'dated',
          width: 200,
          align: 'center'
        },{
          title: '首次下单时间',
          key: 'datea',
          width: 200,
          align: 'center'
        },
        {
          title: '最后登录时间',
          key: 'datet',
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 250,
          fixed: 'left',
          align: 'center'
        },
      ],
      dataList:[
        {
          serialNumber:'1',
          orderNumber:'Ding Han',
          contacts:'hahah ',
          phone:'男',
          address:'19',
          date:'115455445676',
          datee:'APP注册',
          dated:'2019-3-5',
          datea:'2019-3-5',
          datet:'2019-3-5',
        }
      ],
       stateList:[
        {
          value:'条目一',
          label:'条目一',
        },
        {
          value:'条目二',
          label:'条目二',
        },
      ]
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
    addressClick(id){
      this.$router.push({
        path: '/dataStatistics/address',
        query: {
          id: id,
        }
      })
    },
    detailedClick(id){
      this.$router.push({
        path: '/dataStatistics/detailed',
        query: {
          id: id,
        }
      })
    },
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
