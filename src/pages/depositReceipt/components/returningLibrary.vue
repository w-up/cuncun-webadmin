<template>
  <div>
    <div style="display:flex;flex-wrap: wrap;"> 
      <Card style="width:450px;margin-right:5px;margin-top:10px">
        <p slot="title">预计存储物品</p>
        <Table border :columns="columns" :data="data">
        </Table>
      </Card>
      <Card style="width:600px;margin-right:5px;margin-top:10px">
        <p slot="title">预计使用纸箱</p>
        <Table border :columns="caseColumns" :data="data">
        </Table>
      </Card>
    </div>
    <div style="margin-top:20px">
      <Button type="primary" style="margin:0 8px 5px 0" ><Icon type="ios-download-outline"></Icon>导出取件单</Button>
      <Button type="success" style="margin:0 8px 5px 0" >确认到库</Button>
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
      refusalOfOrdersModal:false,
      caseColumns:[
        {
          title: '序号',
          align:'center',
          width:75,
          key: 'key'
        },
        {
          title: '纸箱名称',
          align:'center',
          key: 'name'
        },
        {
          title: '类型',
          align:'center',
          width:90,
          key: 'num'
        },
        {
          title: '使用数量',
          align:'center',
          width:100,
          key: 'num'
        },
        {
          title: '总价',
          align:'center',
          width:80,
          key: 'num'
        },
      ],
      columns: [
        {
          title: '序号',
          align:'center',
          width:75,
          key: 'key'
        },
        {
          title: '物品名称',
          align:'center',
          key: 'name'
        },
        {
          title: '数量',
          align:'center',
          width:80,
          key: 'num'
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
  }
}
</script>

<style lang="less">

</style>
