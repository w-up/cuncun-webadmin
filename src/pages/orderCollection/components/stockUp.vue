<template>
  <div>
    <!-- <Button type="primary" style="margin:0 8px 5px 0" @click="asdasssssd"><Icon type="ios-download-outline"></Icon>导出取件单</Button> -->
    <!-- <Button type="success" style="margin:0 8px 5px 0">返送完成</Button> -->
    <!-- <Button type="error" style="margin:0 8px 5px 0">拒单</Button> -->
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="img1">
            <Button type="primary" size="small"  @click="imgClick(row.img)">查看</Button>
        </template>
      </Table> 
    </div>
    <div style="margin-top:10px"> 
      <!-- <Button type="warning" style="margin:0 8px 5px 0" @click="assignRidersClick">分配拣货员</Button> -->
      <Button type="primary" style="margin:0 8px 5px 0" @click="asdasssssd(2)"><Icon type="ios-download-outline"></Icon>导出拣货单</Button>
      <Button type="primary" style="margin:0 8px 5px 0" @click="asdasssssd(1)"><Icon type="ios-download-outline"></Icon>导出配送单</Button>
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
import util from '@/libs/util';
import { getWithdrawGoodsList } from "@api/account";
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
          minWidth:150,
          key: 'storeCode'
        },
        {
          title: '备注信息',
          align:'center',
          minWidth:160,
          key: 'auditRemark'
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
          key: 'code'
        },
        {
          title: '物品名称',
          align:'center',
          minWidth:150,
          key: 'name'
        },
        {
          title: '物品重量',
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
      getWithdrawGoodsList(this.orderId).then(res=>{
        var num = 0
        var arr = res.data.data
        arr.forEach(v => {
          num++
          v.num=num
          v.name = v.goods.name
          v.code = v.goods.code
          v.packCode = v.goods.pack.code
          v.storeCode = v.goods.storeCode
          v.weight = v.goods.weight
          v.auditRemark = v.goods.auditRemark
          v.img = v.goods.coverPic
        });
        this.data = arr
      })
    },
    imgClick(img){
      this.img = img
      this.imgModal=true
    },
    asdasssssd(key){
      if (key==1) {
        window.open("http://cuncun.admin.iisu.cn/export/takeSingle.html?id="+this.orderId+'&token='+util.cookies.get('token1'));  
      }else{
        window.open("http://cuncun.admin.iisu.cn/export/picking.html?id="+this.orderId+'&token='+util.cookies.get('token1'));  
      }
      
    },
  }
}
</script>

<style lang="less">

</style>
