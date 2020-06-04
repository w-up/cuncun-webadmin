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
          <Input :disabled='adjustPayStatus' placeholder="请输入" v-model="row.code" @on-change="data[index].code= row.code;boxCodeChange(row)"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="caseType">
          <Select :disabled='adjustPayStatus' transfer @on-change="data[index].type= row.type;boxTypeChange(row)" v-model="row.type" class="select">
            <Option  value="A" >拍照</Option>
            <Option  value="B" >不拍照</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="caseName">
          <Select :disabled='adjustPayStatus' transfer v-model="row.boxId" @on-change="data[index].boxId= row.boxId" class="select">
            <Option v-for="item in row.boxList" :value="item.id" :key="item.value">{{ item.name }}</Option>
          </Select>
        </template>
        <template slot-scope="{ row, index }" slot="operation">
         <Poptip
            confirm
            transfer
            title="您确认删除这条内容吗？"
            @on-ok="okDel(row.id)"
          >
          <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;" :disabled='adjustPayStatus'>删除</Button>
          </Poptip>
        </template>
      </Table>
      <div style="margin-top:20px">
        <Button type="info" style="margin:0 8px 5px 0" :disabled='adjustPayStatus' @click="addClick">添加一行</Button>
        <Button type="success" style="margin:0 8px 5px 0" :disabled='adjustPayStatus' @click="saveClick">保存信息</Button>
      </div>
      <div style="margin-top:20px">
        <Poptip
          confirm
          title="是否确认此步骤已完成?"
          @on-ok="stepComplete"
        >
          <Button type="success" style="margin:0 8px 5px 0" >此步骤已完成</Button>
        </Poptip>
        <Button type="primary" style="margin:0 8px 5px 0" @click="pdfClick"><Icon type="ios-download-outline"></Icon>导出取件单</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBoxTypeList,
getOrderDetail,
getPackPage,
getPackAdd,
getPackDel,
getCompleteMonitor
 } from "@api/account";
 import util from '@/libs/util';
export default {
  name: 'waitingForDelivery',
  data () {
    return {
      num:0,
      adjustPayStatus:false,
      orderId:'',
      type:true,
      columns: [
        {
          title: '纸箱编号',
          align:'center',
          minWidth:200,
          slot: 'caseNum',
          key:'corol'
        },
        {
          title: '纸箱类型',
          align:'center',
          minWidth:160,
          slot: 'caseType',
          key:'corol1'
        },
        {
          title: '纸箱名称',
          align:'center',
          minWidth:160,
          slot: 'caseName',
          key:'corol2'
        },
        // {
        //   title: '纸箱重量(KG)',
        //   minWidth:150,
        //   slot: 'caseKg'
        // },
        // {
        //   title: '安检状态',
        //   align:'center',
        //   minWidth:150,
        //   slot: 'securityType'
        // },
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
    getDetail(id){
      getOrderDetail(id).then(res=>{
        if (res.data.adjustPayStatus.code=='waitSettle') {
          this.adjustPayStatus =false 
        }else{
          this.adjustPayStatus =true 
        }
        
      })
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
          v.cellClassName={
            corol: '',
            corol1: '',
            corol2: '',
          }
          if (v.auditStatus) {
            v.auditStatus=v.auditStatus.code
          }
          if (v.box) {
            v.type=v.box.type.code
          }
          v.boxList=[]
          this.boxTypeChange(v)
        });

        this.data = arr.reverse()
      })
    },
    caseNumCange(id,num){
      // console.log(event,id,num);
      
    },
    addClick(){
      this.num++
      this.data.push({
        id:this.num+'',
        type:'',
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
            if (v.box) {
              v.boxId=v.box.id
            }
          }
          
        });
        // this.boxList = arr 
      })
    },
    //数据保存
    saveClick(){
      this.type = true
      // for (const item of this.data) {
      //   let arr = {
      //     depositOrderId :this.orderId,
      //     code:item.code,
      //     boxId:item.boxId,
      //     weight:item.weight,
      //     // auditStatus:item.auditStatus,
      //   }
      //   if (item.id.length>10) {
      //     arr.id=item.id
      //   }
      //   getPackAdd(arr).then(res=>{

      //     this.$Message.success('成功');
      //   }).catch(err => {
      //     this.$Message.error(err.response.data.message)
      //   })
      // }
      var data = this.data
      for (let i = 0; i < data.length; i++) {
        let arr = {
          depositOrderId :this.orderId,
          code:data[i].code,
          boxId:data[i].boxId,
          // weight:data[i].weight,
          // auditStatus:data[i].auditStatus,
        }
        if (data[i].id.length>10) {
          arr.id=data[i].id
        }
        getPackAdd(arr).then(res=>{
          data[i].id = res.data.id
          this.data[i].cellClassName={
            corol: '',
            corol1: '',
            corol2: '',
          }
          if (this.type ==true) {
            if (i+1==data.length) {
              // this.dataList()
              this.$emit('detailsRefresh','1')
              this.$Message.success('成功');
            }
          }
        }).catch(err => {
          this.data[i].cellClassName={
            corol: 'demo-table-info-cell-age',
            corol1: 'demo-table-info-cell-age',
            corol2: 'demo-table-info-cell-age',
          }
          this.type = false
          this.$Message.error(err.response.data.message)
        })
      }
    },
    //
    okDel(id){
      if (id.length>10) {
        getPackDel({id:id}).then(res=>{
          this.$Message.success('删除成功');
          for (let i = 0; i < this.data.length; i++) {
            if (id==this.data[i].id) {
              this.data.splice(i, 1)
            }
            
          }
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      }else{
        for (let i = 0; i < this.data.length; i++) {
          if (id==this.data[i].id) {
            this.data.splice(i, 1)
          }
          
        }
      }
    },
    //此步骤已完成
    stepComplete(){
      let data ={
        ids:this.orderId
      }
      getCompleteMonitor(data).then(res=>{
        this.$emit('detailsRefresh','1')
        this.$Message.success('成功');
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    boxCodeChange(row){
      if (row.code.length>=10) {
        for (const v of this.data) {
          if (v.id == row.id) {
            if (row.code.substr(9,9)=='s'||row.code.substr(9,9)=='S') {
              v.type='A'
              this.boxTypeChange(v)
            }else if(row.code.substr(9,9)=='E'||row.code.substr(9,9)=='e'){
              v.type='B'
              this.boxTypeChange(v)
            }
            break
          }
        }
      }
    },
    pdfClick(){
      window.open("http://cuncun.admin.iisu.cn/export/depositReceipt.html?id="+this.orderId+'&token='+util.cookies.get('token1'));  
    },
  }
}
</script>
<style lang="less">
.ivu-table .demo-table-info-cell-age {
  // background-color: #faa2a2;
  input{
    border: 1px solid red;
  }
  .select{
    border: 1px solid red;
  }
}
</style>
<style lang="less">

</style>
