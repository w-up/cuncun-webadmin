<template>
  <div>
    <div style="margin:15px 0">
      <Select  style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="caseNum">
          <Input  placeholder="请输入" v-model="row.num" @on-change="caseNumCange(row.id,row.num)"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="caseType">
          <Select transfer>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="caseName">
          <Select transfer>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="caseKg">
          <Input  placeholder="请输入" ></Input>
        </template>
        <template slot-scope="{ row, index }" slot="securityType">
          <Select transfer>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="securityRemark">
          <Input  placeholder="请输入" ></Input>
        </template>
        <template slot-scope="{ row, index }" slot="operation">
         <Poptip
            confirm
            transfer
            title="您确认删除这条内容吗？"
          >
          <Button type="text" size="small" icon="md-trash" style="margin-right: 5px;color:#ff9900;">删除</Button>
          </Poptip>
        </template>
      </Table>
      <div style="margin-top:20px">
        <Button type="info" style="margin:0 8px 5px 0" @click="addClick">添加一行</Button>
        <Button type="success" style="margin:0 8px 5px 0">安检完成</Button>
        <Button type="primary" style="margin:0 8px 5px 0" ><Icon type="ios-download-outline"></Icon>导出取件单</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'waitingForDelivery',
  data () {
    return {
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
          width:200,
          slot: 'caseNum'
        },
        {
          title: '纸箱类型',
          align:'center',
          width:160,
          slot: 'caseType'
        },
        {
          title: '纸箱名称',
          align:'center',
          width:160,
          slot: 'caseName'
        },
        {
          title: '纸箱重量',
          width:150,
          slot: 'caseKg'
        },
        {
          title: '安检状态',
          align:'center',
          width:150,
          slot: 'securityType'
        },
        {
          title: '安检员备注',
          align:'center',
          minWidth:250,
          slot: 'securityRemark'
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
            id:'111'
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
    caseNumCange(id,num){
      // console.log(event,id,num);
      
    },
    addClick(){
      this.data.push({})
    },
  }
}
</script>

<style lang="less">

</style>
