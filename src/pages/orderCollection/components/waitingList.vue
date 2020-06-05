<template>
  <div>
    <!-- <Button type="primary" style="margin:0 8px 5px 0" @click="pdfClick"><Icon type="ios-download-outline"></Icon>导出取件单</Button> -->
    
    <!-- <Button type="error" style="margin:0 8px 5px 0">拒单</Button> -->
    <div style="margin:12px 0">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="img1">
            <Button type="primary" size="small" v-show="row.pic!=null" @click="imgClick(row.pic)">查看</Button>
        </template>
      </Table>
    </div>
    <div>
      <Button type="warning" style="margin:0 8px 5px 0" @click="assignRidersClick">输入单号</Button>
    </div>
    <div style="margin-top:10px"> 
      <Poptip
        confirm
        title="是否确认完成?"
        @on-ok="ok">
        <Button type="success" style="margin:0 8px 5px 0">此步骤已完成</Button>
      </Poptip>
      <Button type="primary" style="margin:0 8px 5px 0" @click="pdfClick(2)"><Icon type="ios-download-outline"></Icon>导出拣货单</Button>
      <Button type="primary" style="margin:0 8px 5px 0" @click="pdfClick(1)"><Icon type="ios-download-outline"></Icon>导出配送单</Button>
    </div>
    <Modal
        v-model="imgModal"
        title="照片"
        >
        <div style="text-align: center"> 
          <img :src="img" alt="" style="height:200px;">
        </div>
    </Modal>
    <Modal
        v-model="assignRidersModal"
        title="单号"
        :mask-closable="false">
        <Form ref="formValidate" :model="assignRidersList" :rules="ruleValidate" :label-width="100">
          <FormItem label="单号" prop="name">
              <Input v-model="assignRidersList.name" placeholder="请输入单号" style="width:250px"></Input>
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
import util from '@/libs/util';
import { getWithdrawGoodsList,getWithdrawWwaitsign,getWithdrawWaybillNo,getWithdrawItemsList } from "@api/account";
export default {
  name: 'pendingPayment',
  data () {
    return {
      orderId:'',
      imgModal:false,
      img:'',
      assignRidersModal:false,
      assignRidersList:{
        name:''
      },
      ruleValidate: {
        name: [
            { required: true, message: '请输入', trigger: 'blur' }
        ],
      },
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
          minWidth:180,
          key: 'packName'
        },
        {
          title: '箱子编号',
          align:'center',
          minWidth:220,
          key: 'packCode'
        },
        {
          title: 'Item SKU',
          align:'center',
          minWidth:220,
          key: 'goodsCode'
        },
        {
          title: '物品名称',
          align:'center',
          minWidth:180,
          key: 'goodsName'
        },
        {
          title: '重量',
          align:'center',
          minWidth:100,
          key: 'weight'
        },
        {
          title: '照片',
          width:80,
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
    //分配拣货员弹窗true
    assignRidersClick(){
      this.assignRidersModal=true
    },
    //分配拣货员弹窗false
    assignRidersCancel(){
      this.assignRidersList.name=''
      this.assignRidersModal=false
    },
    //分配拣货员
    assignRidersOk(){
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let data ={
            waybillNo:this.assignRidersList.name,
            ids:this.orderId
          }
          getWithdrawWaybillNo(data).then(res=>{
            this.$Message.success('成功');
            this.assignRidersList.name=''
            this.$emit('detailsRefresh','1')
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
            this.$Message.error('请输入单号');
        }
      })
    },
    //此步骤已完成
    ok(){
      getWithdrawWwaitsign(this.orderId).then(res=>{
        this.$Message.success('成功');
        this.$emit('detailsRefresh','1')
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
    },
    pdfClick(key){
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
