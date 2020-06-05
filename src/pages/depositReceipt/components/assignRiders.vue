<template>
  <div>
    <div style="display:flex;flex-wrap: wrap;"> 
      <Card style="width:450px;margin-right:5px;margin-top:10px">
        <p slot="title">预计存储物品</p>
        <Table border :columns="columns" :data="dataGoods">
        </Table>
      </Card>
      <Card style="width:600px;margin-right:5px;margin-top:10px">
        <p slot="title">预计使用纸箱</p>
        <Table border :columns="caseColumns" :data="dataBox">
        </Table>
      </Card>
    </div>
    <div style="margin-top:20px">
      <Button type="info" style="margin:0 8px 5px 0" @click="assignRidersClick">分配骑手</Button>
      <Button type="primary" style="margin:0 8px 5px 0" @click="pdfClick"><Icon type="ios-download-outline"></Icon>导出取件单</Button>
    </div>
    <Modal
        v-model="assignRidersModal"
        title="分配骑手"
        :mask-closable="false">
        <Form ref="formValidate" :model="assignRidersList" :rules="ruleValidate" :label-width="80">
          <FormItem label="骑手姓名" prop="name">
              <Input v-model="assignRidersList.name" placeholder="请为选中的订单批量分配骑手" style="width:300px"></Input>
          </FormItem>
        </Form>
        <div slot="footer" style="text-align: right;">
          <Button type="text" @click="assignRidersCancel">取消</Button>
          <Button type="primary" @click="assignRidersOk">确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { getBoxList4Order,getGoodsList4Order,getAssign } from "@api/account";
import util from '@/libs/util';
export default {
  name: 'pendingDisposal',
  data () {
    return {
      assignRidersModal:false,
      refusalOfOrdersModal:false,
      orderId:'',
      caseColumns:[
        {
          title: '序号',
          align:'center',
          width:75,
          key: 'num'
        },
        {
          title: '纸箱名称',
          align:'center',
          key: 'boxName'
        },
        {
          title: '类型',
          align:'center',
          width:90,
          key: 'boxType'
        },
        {
          title: '使用数量',
          align:'center',
          width:100,
          key: 'amount'
        },
        {
          title: '总价',
          align:'center',
          width:80,
          key: 'storePerDayFee'
        },
      ],
      columns: [
        {
          title: '序号',
          align:'center',
          width:75,
          key: 'num'
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
          key: 'amount'
        },
      ],
      dataBox: [
          
      ],
      assignRidersList:{
        name:''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
      },
      dataGoods:[]
    }
  },
  mounted () {
    //
  },
  methods:{
    getData(id){
      this.orderId=id
      getBoxList4Order(id).then(res=>{
        var arr = res.data
        let num =0
        arr.forEach(v => {
          num++
          v.num=num
          v.boxName=v.box.name
          v.boxType=v.box.type.name
          v.storePerDayFee= (Number(v.amount)  *Number(v.box.storePerMonthFee)).toFixed(2) 
        });
        this.dataBox=arr
        
      })
      getGoodsList4Order(id).then(res=>{
        var arr = res.data
        let num =0
        arr.forEach(v => {
           num++
          v.num=num
        });
        this.dataGoods =arr
      })
    },
    refusalOfOrders(){
      this.refusalOfOrdersModal = true
    },
    assignRidersClick(){
      this.assignRidersModal=true
    },
    assignRidersCancel(){
      this.assignRidersList.name=''
      this.assignRidersModal=false
    },
    assignRidersOk(){
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let data ={
            diliveryManName:this.assignRidersList.name,
            ids:this.orderId,
            changeStatus:true
          }
          getAssign(data).then(res=>{
            this.$Message.success('成功');
            this.$emit('detailsRefresh','1')
            this.assignRidersList.name=''
            this.assignRidersModal=false
          }).catch(err => {
            if (err.response.data.code =='error_param') {
            var json =err.response.data.data
            var title = ''
            for (var key in json){
              title +=`${json[key]},`
            }
            this.$Message.error(title)
          }else{
            this.$Message.error(err.response.data.message)
          }
          })
          
        } else {
            this.$Message.error('请输入骑手姓名');
        }
      })
    },
    pdfClick(){
      window.open("http://cuncun.admin.iisu.cn/export/depositReceipt.html?id="+this.orderId+'&token='+util.cookies.get('token1'));  
    },
  }
}
</script>

<style lang="less">

</style>
