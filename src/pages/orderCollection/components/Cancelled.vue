<template>
  <div>
    <!-- <Button type="primary" style="margin:0 8px 5px 0" @click="pdfClick"><Icon type="ios-download-outline"></Icon>导出取件单</Button> -->
    <!-- <Button type="success" style="margin:0 8px 5px 0">拣货完成</Button> -->
    <!-- <Button type="error" style="margin:0 8px 5px 0">拒单</Button> -->
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="img1">
            <Button type="primary" size="small" v-show="row.pic!=null" @click="imgClick(row.pic)">查看</Button>
        </template>
      </Table>
    </div>
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
import { getWithdrawGoodsList,getWithdrawItemsList } from "@api/account";
export default {
  name: 'pendingPayment',
  data () {
    return {
      orderId:'',
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
          title: '箱子名称',
          align:'center',
          minWidth:160,
          key: 'packName'
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
          key: 'goodsName'
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
            v.goodsName = v.name
            v.packName = ''
          }else{
            v.code = v.packCode
            v.goodsName = ''
            v.packName = v.name
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
  }
}
</script>

<style lang="less">

</style>
