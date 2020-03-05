<template>
  <div>
    <Button type="primary" style="margin:0 8px 5px 0" ><Icon type="ios-download-outline"></Icon>导出取件单</Button>
    <Button type="success" style="margin:0 8px 5px 0">接单</Button>
    <Button type="error" style="margin:0 8px 5px 0" @click="refusalOfOrders()">拒单</Button>
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <!-- <template slot-scope="{ row, index }" slot="center">
            <Button type="primary" size="small" style="margin-right: 5px">拍照</Button>
        </template> -->
      </Table>
      <div style="margin-top:20px">
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </div>
    <Modal v-model="refusalOfOrdersModal"  title="拒单理由">
      <div style="text-align:center">
          <h4 style="margin-bottom:8px">请输入拒单理由.</h4 style="margin-bottom:8px">
          <Input  type="textarea" :rows="4" style="width:400px" placeholder="请输入拒单理由" />
      </div>
      <div slot="footer">
        <div style="">
          <Button type="text" style="margin-right:10px;">取消</Button>
          <Button type="primary" style="margin-right:10px">确定</Button>
        </div>
        
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'pendingDisposal',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      refusalOfOrdersModal:false,
      columns: [
        {
          title: '序号',
          align:'center',
          width:75,
          key: 'key'
        },
        {
          title: '箱子类型',
          align:'center',
          width:160,
          key: 'type'
        },
        {
          title: '箱子编号',
          align:'center',
          width:120,
          key: 'num'
        },
        {
          title: 'Item SKU',
          align:'center',
          width:120,
          key: 'SKU'
        },
        {
          title: '拍照',
          width:100,
          key: 'img'
        },
        {
          title: '物品名称',
          align:'center',
          width:150,
          key: 'name'
        },
        {
          title: '展示区域',
          align:'center',
          width:150,
          key: 'exhibition'
        },
        {
          title: '产品属性',
          align:'center',
          width:150,
          key: 'attribute'
        },
        {
          title: '使用场景',
          align:'center',
          width:150,
          key: 'useCase'
        },
        {
          title: '库位',
          align:'center',
          width:150,
          key: 'storehouse'
        },
        {
          title: '备注',
          minWidth:150,
          align:'center',
          key: 'remarks'
        },
      ],
      data: [
          {
            name:'1'
          }
      ]
    }
  },
  mounted () {
    //
  },
  methods:{
    refusalOfOrders(){
      this.refusalOfOrdersModal = true
    },
    changePage (page) {
      this.pageNumber = page - 1
      // this.getList()
    },
    pageSizeChange(pageSize){
      this.pageSize=pageSize
      // this.getList()
    },
  }
}
</script>

<style lang="less">

</style>
