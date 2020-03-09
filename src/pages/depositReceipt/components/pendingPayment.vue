<template>
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
</template>

<script>
export default {
  name: 'pendingPayment',
  data () {
    return {
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

  }
}
</script>

<style lang="less">

</style>
