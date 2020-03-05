<template>
  <div>
    <Button type="primary" style="margin:0 8px 5px 0" >保存信息</Button>
    <Button type="success" style="margin:0 8px 5px 0">保存并发布</Button>
    <!-- <Button type="error" style="margin:0 8px 5px 0">拒单</Button> -->
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="type">
          <Select transfer>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="num">
          <Input  placeholder="请输入" ></Input>
        </template>
        <template slot-scope="{ row, index }" slot="SKU">
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
        <template slot-scope="{ row, index }" slot="attribute">
          <Select transfer>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="remarks">
          <Input  placeholder="请输入" ></Input>
        </template>
        <template slot-scope="{ row, index }" slot="operation">
          <Poptip
            confirm
            transfer
            title="您确定删除这条内容吗"
          >
              <Button type="text" size="small" icon="md-close" style="color:#ed3f14;" >删除</Button>
          </Poptip>
        </template>
        <template slot-scope="{ row, index }" slot="img">
            <Button type="primary" size="small" style="margin-right: 5px">拍照</Button>
        </template>
      </Table>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
        <div>
          <Button type="info" @click="addClick">添加</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stayPhotograph',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      cityList: [
        {
            value: '条目一',
            label: '条目一'
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
          title: '箱子类型',
          align:'center',
          width:160,
          slot: 'type'
        },
        {
          title: '箱子编号',
          align:'center',
          width:120,
          slot: 'num'
        },
        {
          title: 'Item SKU',
          align:'center',
          width:120,
          slot: 'SKU'
        },
        {
          title: '拍照',
          width:100,
          slot: 'img'
        },
        {
          title: '物品名称',
          align:'center',
          width:150,
          slot: 'name'
        },
        {
          title: '展示区域',
          align:'center',
          width:150,
          slot: 'exhibition'
        },
        {
          title: '产品属性',
          align:'center',
          width:150,
          slot: 'attribute'
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
          slot: 'remarks'
        },
        {
          title: '操作',
          minWidth:150,
          align:'center',
          fixed: 'right',
          slot: 'operation'
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
    addClick(){
      this.data.push({})
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
