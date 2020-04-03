<template>
  <div>
    <div style="display:flex;"> 
      <Card style="width:38%;margin-right:5px;margin-top:10px">
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
            <Poptip
              confirm
              transfer
              title="您确认删除这条内容吗？"
            >
            <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;">删除</Button>
            </Poptip>
          </template>
        </Table>
        <div style="margin-top:20px">
          <Button type="success" style="margin:0 8px 5px 0">编辑</Button>
          <Button type="info" style="margin:0 8px 5px 0" @click="addClick">添加一行</Button>
        </div>
      </Card>
      <Card style="margin-right:5px;margin-top:10px;box-sizing:border-box;width:60%" >
        <p slot="title">物品列表</p>
        <Table border :columns="caseColumns" :data="data">
          <template slot-scope="{ row, index }" slot="num">
            <Input  placeholder="请输入" ></Input>
          </template>
          <template slot-scope="{ row, index }" slot="name">
            <Input  placeholder="请输入" ></Input>
          </template>
          <template slot-scope="{ row, index }" slot="exhibition">
            <Select transfer>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </template>
          <template slot-scope="{ row, index }" slot="classification">
            <Select transfer>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </template>
          <template slot-scope="{ row, index }" slot="label">
            <Input  placeholder="请输入" ></Input>
          </template>
          <template slot-scope="{ row, index }" slot="img">
            <Button type="success" v-show="row.type=='1'" @click="imgClick">查看</Button>
            <Button type="primary" v-show="row.type=='2'" @click="imgClick">上传</Button>
          </template>
          <template slot-scope="{ row, index }" slot="kg">
            <Input  placeholder="请输入" ></Input>
          </template>
          <template slot-scope="{ row, index }" slot="imgRemarks">
            <Input  placeholder="请输入" ></Input>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Poptip
              confirm
              transfer
              title="您确认删除这条内容吗？"
            >
            <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;">删除</Button>
            </Poptip>
          </template>
        </Table>
        <div style="margin-top:20px">
         
          <Button type="info" style="margin:0 8px 5px 0" @click="addClick">添加一行</Button>
          <Button type="success" style="margin:0 8px 5px 0">保存</Button>
          <Button type="warning" style="margin:0 8px 5px 0">发布信息</Button>
        </div>
      </Card>
      
    </div>
    <div style="margin-top:20px">
      <Button type="success" style="margin:0 8px 5px 0">此步骤已完成</Button>
      <Button type="primary" style="margin:0 8px 5px 0" ><Icon type="ios-download-outline"></Icon>导出取件单</Button>
    </div>
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
          title: '物品编号',
          align:'center',
          width:140,
          slot: 'num'
        },
        {
          title: '名称',
          align:'center',
          width:140,
          slot: 'name'
        },
        {
          title: '展示区域',
          align:'center',
          width:140,
          slot: 'exhibition'
        },
        {
          title: '分类',
          align:'center',
          width:140,
          slot: 'classification'
        },
        {
          title: '标签',
          align:'center',
          width:140,
          slot: 'label'
        },
        {
          title: '照片',
          align:'center',
          width:90,
          slot: 'img'
        },
        {
          title: '重量',
          align:'center',
          width:120,
          slot: 'kg'
        },
        {
          title: '拍照员备注',
          align:'center',
          minWidth:140,
          slot: 'imgRemarks'
        },
        {
          title: '发布时间',
          align:'center',
          width:140,
          key: 'time'
        },
        {
          title: '操作',
          align:'center',
          width:100,
          slot: 'operation'
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
          width:100,
          slot: 'remarks'
        },
        {
          title: '物品数量',
          align:'center',
          minWidth:100,
          key: 'name'
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
      ],
    }
  },
  mounted () {
    //
  },
  methods:{
    addClick(){
      this.data.push({})
    },
    imgClick(){
      this.refusalOfOrdersModal = true
    },
  }
}
</script>

<style lang="less" scoped>
</style>
