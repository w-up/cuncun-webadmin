<template>
  <div>
    <!-- <div style="margin:15px 0">
      <Select  style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div> -->
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="caseNum">
          <Input  placeholder="请输入" v-model="row.code" @on-change="data[index].code= row.code"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="caseType">
          <Select transfer @on-change="data[index].type= row.type;boxTypeChange(row)" v-model="row.type">
            <Option  value="A" >拍照</Option>
            <Option  value="B" >不拍照</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="caseName">
          <Select transfer v-model="row.boxId" @on-change="data[index].boxId= row.boxId">
            <Option v-for="item in row.boxList" :value="item.id" :key="item.value">{{ item.name }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="caseKg">
          <Input  placeholder="请输入" v-model="row.weight" @on-change="data[index].weight= row.weight"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="remark">
          <Input  placeholder="请输入" v-model="row.auditRemark" @on-change="data[index].auditRemark= row.auditRemark"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="securityType">
          <Select transfer v-model="row.auditStatus" @on-change="data[index].auditStatus= row.auditStatus">
            <Option  value="pass" >已通过</Option>
            <Option  value="fail" >未通过</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="operation">
         <Poptip
            confirm
            transfer
            title="您确认删除这条内容吗？"
            @on-ok="okDel(row.id)"
          >
          <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;">删除</Button>
          </Poptip>
        </template>
      </Table>
      <div style="margin-top:20px">
        <Button type="info" style="margin:0 8px 5px 0" @click="addClick">添加一行</Button>
        <Button type="success" style="margin:0 8px 5px 0" @click="saveClick">保存信息</Button>
      </div>
      <div style="margin-top:20px">
        <Poptip
          confirm
          title="是否确认此步骤已完成?"
          @on-ok="stepComplete"
        >
          <Button type="success" style="margin:0 8px 5px 0" >此步骤已完成</Button>
        </Poptip>
        <Button type="primary" style="margin:0 8px 5px 0" ><Icon type="ios-download-outline"></Icon>导出取件单</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBoxTypeList,
getPackPage,
getPackAdd,
getPackDel,
getCompletePhoto
 } from "@api/account";
export default {
  name: 'waitingForDelivery',
  data () {
    return {
      num:0,
      orderId:'',
      columns: [
        {
          title: '纸箱编号',
          align:'center',
          minWidth:100,
          slot: 'caseNum'
        },
        {
          title: '纸箱类型',
          align:'center',
          minWidth:160,
          slot: 'caseType'
        },
        {
          title: '纸箱名称',
          align:'center',
          minWidth:160,
          slot: 'caseName'
        },
        {
          title: '纸箱重量(KG)',
          minWidth:150,
          slot: 'caseKg'
        },
        {
          title: '安检状态',
          align:'center',
          minWidth:150,
          slot: 'securityType'
        },
        {
          title: '管理员备注',
          align:'center',
          minWidth:200,
          slot: 'remark'
        },
        {
          title: '操作',
          align:'center',
          width:100,
          slot: 'operation'
        },
      ],
      data: [
      ],
      boxList:[],//箱子列表
    }
  },
  mounted () {
    
  },
  methods:{
    getData(id){
      // this.boxList(id)
      this.orderId=id
      this.dataList(id)
    },
    // boxList(id){
      
      
    // },
    dataList(){
      let data = {
        orderId:this.orderId
      }
      getPackPage(data).then(res=>{
        var arr = res.data
        arr.forEach(v => {
          if (v.auditStatus) {
            v.auditStatus=v.auditStatus.code
          }
          if (v.box) {
            v.boxId=v.box.id
            v.type=v.box.type.code
          }
          
          v.boxList=[]
          this.boxTypeChange(v)
        });

        this.data = arr
      })
    },
    caseNumCange(id,num){
      // console.log(event,id,num);
      
    },
    addClick(){
      this.num++
      this.data.push({
        id:this.num+'',
        boxList:[]
      })
    },
    //箱子类型选择
    boxTypeChange(row){
      let data ={
        type:row.type
      }
      getBoxTypeList(data).then(res=>{
        let arr = res.data
        this.data.forEach(v => {
          if (v.id==row.id) {
            v.boxList=arr
          }
        });
        // this.boxList = arr 
      })
    },
    //数据保存
    saveClick(){
      for (const item of this.data) {
        let arr = {
          depositOrderId :this.orderId,
          code:item.code,
          boxId:item.boxId,
          weight:item.weight,
          auditStatus:item.auditStatus,
          auditRemark:item.auditRemark,
        }
        if (item.id.length>10) {
          arr.id=item.id
        }
        getPackAdd(arr).then(res=>{

          this.$Message.success('成功');
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      }
    },
    //
    okDel(id){
      getPackDel({id:id}).then(res=>{
        this.$Message.success('删除成功');
        this.dataList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    stepComplete(){
      let data ={
        ids:this.orderId
      }
      getCompletePhoto(data).then(res=>{
        this.$emit('detailsRefresh','1')
        this.$Message.success('成功');
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
  }
}
</script>

<style lang="less">

</style>
