<template>
<div>


  <div style="display:flex;flex-wrap: wrap;"> 
    <Card style="width:39%;margin-right:5px;margin-top:10px">
      <p slot="title">纸箱列表</p>
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="inspectType">
          <Icon type="md-checkmark-circle" v-show="row.type=='1'" size='24' color="#19be6b"/>
          <Icon type="md-close-circle" v-show="row.type=='2'" size='24' color="#ed4014"/>
        </template>
        <template slot-scope="{ row, index }" slot="remarks">
          <Button type="primary">查看</Button>
        </template>
        <template slot-scope="{ row, index }" slot="operation">
          <Input  placeholder="请输入" ></Input>
        </template>
      </Table>
      <div style="margin-top:20px">
        <Button type="success" style="margin:0 8px 5px 0">保存库位</Button>
      </div>
    </Card>
    <Card style="width:60%;margin-right:5px;margin-top:10px">
      <p slot="title">物品列表</p>
      <Table border :columns="columnsGoods" :data="data">
        <template slot-scope="{ row, index }" slot="storehouse">
          <Input  placeholder="请输入" ></Input>
        </template>
        <template slot-scope="{ row, index }" slot="img">
          <Button type="success" v-show="row.type=='1'" @click="imgClick">查看</Button>
          <Button type="primary" v-show="row.type=='2'" @click="imgClick">上传</Button>
        </template>
      </Table>
      <div style="margin-top:20px">
        <Button type="success" style="margin:0 8px 5px 0">保存库位</Button>
        <Button type="warning" style="margin:0 8px 5px 0">编辑信息</Button>
      </div>
    </Card>
    
    <Modal v-model="refusalOfOrdersModal"  title="照片上传">
      <p style="color:red">注：建议添加 100*100px的照片；</p>
      <Button type="success" >上传</Button>
      <div slot="footer">
        <div style="">
          <Button type="text" style="margin-right:10px;">取消</Button>
          <Button type="primary" style="margin-right:10px">保存</Button>
        </div>
      </div>
    </Modal>
  </div>
    <div style="margin:20px 0">
      <Button type="success" style="margin:0 8px 5px 0">此步骤已完成</Button>
      <Button type="primary" style="margin:0 8px 5px 0" ><Icon type="ios-download-outline"></Icon>导出取件单</Button>
        
    </div>
  </div>
</template>

<script>
export default {
  name: 'pendingPayment',
  data () {
    return {
      refusalOfOrdersModal:false,
      columnsGoods:[
        {
          title: '序号',
          align:'center',
          width:75,
          key: 'key'
        },
        {
          title: '物品编号',
          align:'center',
          width:110,
          key: 'goodsNum'
        },
        {
          title: '物品名称',
          align:'center',
          width:110,
          key: 'goodsName'
        },
        {
          title: '库位',
          align:'center',
          width:110,
          slot: 'storehouse'
        },
        {
          title: '照片',
          align:'center',
          width:90,
          slot: 'img'
        },
        {
          title: '展示区域',
          align:'center',
          width:110,
          key: 'goodsName'
        },
        {
          title: '分类',
          align:'center',
          width:70,
          key: 'goodsName'
        },
        {
          title: '标签',
          align:'center',
          width:70,
          key: 'goodsName'
        },
        {
          title: '备注',
          align:'center',
          minWidth:100,
          key: 'remarks'
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
          title: '纸箱编号',
          align:'center',
          width:100,
          key: 'name'
        },
        {
          title: '安检状态',
          width:70,
          align:'center',
          slot: 'inspectType'
        },
        {
          title: '备注',
          align:'center',
          minWidth:100,
          slot: 'remarks'
        },
        {
          title: '物品数量',
          align:'center',
          width:70,
          key: 'name'
        },
        {
          title: '库位',
          align:'center',
          width:100,
          slot: 'operation'
        },
      ],
      data: [
        {
          name:'1',
          type:'1'
        },
        {
          name:'1',
          type:'2'
        }
      ],
    }
  },
  mounted () {
    //
  },
  methods:{
    imgClick(){
      this.refusalOfOrdersModal = true
    },
  }
}
</script>

<style lang="less">

</style>
