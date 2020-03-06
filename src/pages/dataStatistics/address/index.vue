
<template>
  <div>
    <Card>
      <p slot="title">常用地址</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
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
          title: '收货人',
          key: 'orderNumber',
          width: 140,
          align: 'center'
        },
        {
          title: '收货电话',
          key: 'contacts',
          width: 180,
          align: 'center'
        },
        {
          title: '省',
          key: 'phone',
          width: 180,
          align: 'center'
        },
        {
          title: '市',
          key: 'address',
          width: 200,
          align: 'center'
        },
        {
          title: '区',
          key: 'date',
          width: 200,
          align: 'center'
        },
        {
          title: '详细地址',
          key: 'datee',
          minWidth: 200,
          align: 'center'
        },
      ],
      dataList:[
        {}
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
