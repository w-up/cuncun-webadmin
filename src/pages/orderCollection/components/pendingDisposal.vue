<template>
  <div>
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="img1">
            <Button type="primary" size="small" v-show="row.pic!=null" @click="imgClick(row.img)">查看</Button>
        </template>
      </Table>
    </div>
    <div>
     <Poptip
        confirm
        title="确认接单吗?"
        @on-ok="receiptOk"
        >
        <Button type="success" style="margin:0 8px 5px 0" >接单</Button>
      </Poptip>
      <Poptip
        confirm
        title="确认拒单吗?"
        @on-ok="receiptOk1"
        >
      <Button type="error" style="margin:0 8px 5px 0" >拒单</Button>
      </Poptip>
    </div>
    <Modal v-model="refusalOfOrdersModal"  title="拒单理由">
      <div style="text-align:center">
          <h4 style="margin-bottom:8px">请输入拒单理由.</h4 style="margin-bottom:8px">
          <Input  type="textarea" :rows="4" style="width:400px" placeholder="请输入拒单理由" />
      </div>
      <div slot="footer">
        <div style="">
          <Button type="text" style="margin-right:10px;">取消</Button>
          <Button type="primary" style="margin-right:10px">确定</Button>
        </div>
        
      </div>
    </Modal>
    <Modal
        v-model="imgModal"
        title="照片"
        >
        <div style="text-align: center"> 
          <img :src="img" alt="" style="height:200px;">
        </div>
    </Modal>
  </div>
</template>

<script>
import { getWithdrawAccept,getWithdrawRefuse,getWithdrawGoodsList,getWithdrawItemsList } from "@api/account";

export default {
  name: 'pendingDisposal',
  data () {
    return {
      orderId:'',
      refusalOfOrdersModal:false,
      imgModal:false,
      img:'',
      columns: [
        {
          title: '序号',
          align:'center',
          width:75,
          key: 'num'
        },
        {
          title: '所在库位',
          align:'center',
          width:150,
          key: 'storeCode'
        },
        {
          title: '备注信息',
          align:'center',
          minWidth:160,
          key: 'remark'
        },
        {
          title: '箱子编号',
          align:'center',
          minWidth:120,
          key: 'packCode'
        },
        {
          title: 'Item SKU',
          align:'center',
          minWidth:120,
          key: 'goodsCode'
        },
        {
          title: '物品名称',
          align:'center',
          minWidth:150,
          key: 'name'
        },
        {
          title: '重量',
          align:'center',
          minWidth:150,
          key: 'weight'
        },
        {
          title: '照片',
          width:150,
          align:'center',
          slot: 'img1'
        },
      ],
      data: []
    }
  },
  mounted () {
    //
  },
  methods:{
    getData(id){
      this.orderId=id
      getWithdrawItemsList(this.orderId).then(res=>{
        var num = 0
        var arr = res.data
        arr.forEach(v => {
          num++
          v.num=num
          if (v.item.code =='goods') {
            v.code = v.goodsCode
          }else{
            v.code = v.packCode
          }
          // v.name = v.goods.name
          // v.code = v.goods.code
          // v.packCode = v.goods.pack.code
          // v.storeCode = v.goods.storeCode
          // v.weight = v.goods.weight
          // v.auditRemark = v.goods.auditRemark
          // v.img = v.goods.coverPic
        });
        this.data = arr
      })
    },
    imgClick(img){
      this.img = img
      this.imgModal=true
    },
    receiptOk(){
      let data ={
        ids:this.orderId
      }
      getWithdrawAccept(data).then(res=>{
        this.$Message.success('成功');
        this.$emit('detailsRefresh','1')
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
     
    },
    receiptOk1(){
      let data ={
        ids:this.orderId
      }
      getWithdrawRefuse(data).then(res=>{
        this.$Message.success('成功');
        this.$emit('detailsRefresh','1')
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    refusalOfOrders(){
      this.refusalOfOrdersModal = true
    },
  }
}
</script>

<style lang="less">

</style>
