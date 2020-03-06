
<template>
  <div>
    <Card>
      <p slot="title">订单明细</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
      <Form inline :label-width="80" >
        <FormItem label="订单类型" >
          <Select   style="width:200px;">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
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
          title: '订单类型',
          key: 'orderNumber',
          width: 140,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'contacts',
          width: 180,
          align: 'center'
        },
        {
          title: '下单时间',
          key: 'phone',
          width: 180,
          align: 'center'
        },
        {
          title: '物流费用',
          key: 'address',
          width: 200,
          align: 'center'
        },
        {
          title: '支付情况',
          key: 'date',
          width: 200,
          align: 'center'
        },
        {
          title: '在库物品余量SKU',
          key: 'datee',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '储存费用(元)',
          key: 'datee',
          minWidth: 200,
          align: 'center'
        },
      ],
      dataList:[
        {}
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
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
