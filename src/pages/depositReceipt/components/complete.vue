<template>
  <div>
  <div style="display:flex;flex-wrap: wrap;"> 
    <Card style="width:750px;margin-right:5px;margin-top:10px">
      <p slot="title">纸箱列表</p>
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="caseName">
          <div v-show="row.type=='1'">{{row.name}}</div>
          <div v-show="row.type=='2'">
            <Input  placeholder="请输入" ></Input>
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="inspectType">
          <div v-show="row.type=='1'">
            <Icon type="md-checkmark-circle" v-show="row.type=='1'" size='26px'/>
            <Icon type="md-close-circle" v-show="row.type=='2'" size='26px'/>
          </div>
          <Select transfer v-show="row.type=='2'">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="remarks">
          <Button type="primary">查看</Button>
        </template>
        <template slot-scope="{ row, index }" slot="storehouse">
          <Input  placeholder="请输入" v-show="row.type=='2'"></Input>
          <div v-show="row.type=='1'">{{row.name}}</div>
        </template>
         <template slot-scope="{ row, index }" slot="operation">
          <Button type="text" size="small" icon="md-create" style="margin-right: 5px;color:#19be6b;" v-show="row.type=='1'" >编辑</Button>
          <Button type="text" size="small" icon="ios-add-circle" style="color:#ed3f14;"   v-show="row.type=='2'">保存</Button>
        </template>
      </Table>
      <div style="margin-top:20px">
        <Button type="success" style="margin:0 8px 5px 0">保存库位</Button>
      </div>
    </Card>
    <Card style="width:900px;margin-right:5px;margin-top:10px">
      <p slot="title">物品列表</p>
      <Table border :columns="columnsGoods" :data="data">
         <template slot-scope="{ row, index }" slot="goodsNum" >
          <Input  placeholder="请输入" :disabled="edit=='编辑'"></Input>
        </template>
         <template slot-scope="{ row, index }" slot="goodsName" >
          <Input  placeholder="请输入" :disabled="edit=='编辑'"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="storehouse">
          <Input  placeholder="请输入" ></Input>
        </template>
        <template slot-scope="{ row, index }" slot="img">
          <Button type="success" v-show="row.type=='1'" @click="imgClick">查看</Button>
          <Button type="primary" v-show="row.type=='2'" @click="imgClick">上传</Button>
        </template>
        <template slot-scope="{ row, index }" slot="exhibition" >
          <Input  placeholder="请输入" :disabled="edit=='编辑'"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="classification" >
          <Input  placeholder="请输入" :disabled="edit=='编辑'"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="labelName" >
          <Input  placeholder="请输入" :disabled="edit=='编辑'"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="remarks" >
          <Input  placeholder="请输入" :disabled="edit=='编辑'"></Input>
        </template>
      </Table>
      <div style="margin-top:20px">
        <Button type="success" style="margin:0 8px 5px 0" @click="editClick()">{{edit}}</Button>
        <Button type="warning" style="margin:0 8px 5px 0">发布</Button>
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
    <Button type="primary" style="margin:0 8px 5px 0" ><Icon type="ios-download-outline"></Icon>导出取件单</Button>
    <Button type="success" style="margin:0 8px 5px 0">该步骤已完成</Button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'pendingPayment',
  data () {
    return {
      edit:'编辑',
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
          slot: 'goodsNum'
        },
        {
          title: '物品名称',
          align:'center',
          width:110,
          slot: 'goodsName'
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
          slot: 'exhibition'
        },
        {
          title: '分类',
          align:'center',
          width:120,
          slot: 'classification'
        },
        {
          title: '标签',
          align:'center',
          width:120,
          slot: 'labelName'
        },
        {
          title: '备注',
          align:'center',
          minWidth:120,
          slot: 'remarks'
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
          slot: 'caseName'
        },
        {
          title: '安检状态',
          minWidth:130,
          align:'center',
          slot: 'inspectType'
        },
        {
          title: '备注',
          width:90,
          align:'center',
          slot: 'remarks'
        },
        {
          title: '物品数量',
          align:'center',
          width:100,
          key: 'name'
        },
        {
          title: '库位',
          align:'center',
          width:100,
          slot: 'storehouse'
        },
        {
          title: '操作',
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
      cityList: [
        {
            value: '已通过',
            label: '已通过'
        },
        {
            value: '未通过',
            label: '未通过'
        },
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
    editClick(){
      if (this.edit=='编辑') {
        this.edit='保存'
      }else{
        this.edit='编辑'
      }
    }
  }
}
</script>

<style lang="less">

</style>
