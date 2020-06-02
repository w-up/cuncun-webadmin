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
      <Poptip
        confirm
        title="确认接单吗?"
        @on-ok="receiptOk"
        >
        <Button type="info" style="margin:0 8px 5px 0" >接单</Button>
      </Poptip>
      <Button type="error" style="margin:0 8px 5px 0" @click="refusalOfOrdersModal=true">拒单</Button>
      <Button type="primary" style="margin:0 8px 5px 0" @click="pdfClick"><Icon type="ios-download-outline"></Icon>导出取件单</Button>
    </div>
    <Modal v-model="refusalOfOrdersModal"  title="拒单理由">
      <Form   :label-width="80" >
          <FormItem label="拒单理由">
              <Input  placeholder="请输入" v-model="reason" style="width:300px"></Input>
          </FormItem>
        </Form>
      <div slot="footer">
        <div style="">
          <Button type="text" style="margin-right:10px;" @click="typeCancel">取消</Button>
          <Button type="primary" style="margin-right:10px" @click="receiptOk1">确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getBoxList4Order,getGoodsList4Order,getAccept,getRefuse } from "@api/account";
import util from '@/libs/util';
export default {
  name: 'pendingDisposal',
  data () {
    return {
      reason:'',
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
    receiptOk(){
      let data ={
        ids:this.orderId
      }
      getAccept(data).then(res=>{
        this.$Message.success('成功');
        this.$emit('detailsRefresh','1')
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
     
    },
    receiptOk1(){
      let data ={
        ids:this.orderId,
        reason:this.reason
      }
      getRefuse(data).then(res=>{
        this.$Message.success('成功');
        this.typeCancel()
        this.$emit('detailsRefresh','1')
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    typeCancel(){
      this.refusalOfOrdersModal=false
      this.reason=''
    },
    pdfClick(){
      window.open("http://cuncun.admin.iisu.cn/export/depositReceipt.html?id="+this.orderId+'&token='+util.cookies.get('token1'));  
    },
  }
}
</script>

<style lang="less">

</style>
