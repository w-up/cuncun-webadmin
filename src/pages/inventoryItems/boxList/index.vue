<template>
  <div>
    <Card>
      <p slot="title">仓储箱子列表</p>
      <Form inline :label-width="80" >
          <!-- <FormItem label="用户ID" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.orderNo"></Input>
          </FormItem> -->
          <FormItem label="订单号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.depositOrderNo"></Input>
          </FormItem>
          <FormItem label="库位号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.storeCode"></Input>
          </FormItem>
          <FormItem label="箱子编号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.code"></Input>
          </FormItem>
          <FormItem label="流转状态" >
            <Select clearable  style="width:200px" v-model="searchList.storeStatus"> 
                <Option  value="store">存储中</Option>
                <Option  value="withdraw">已取回</Option>
                <Option  value="fetch">取回中</Option>
            </Select>
          </FormItem>
          <FormItem label="审核状态" >
            <Select clearable  style="width:200px" v-model="searchList.auditStatus">
                <Option  value="wait">待审核</Option>
                <Option  value="pass">已通过</Option>
                <Option  value="fail">未通过</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="取单编号" >
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem> -->
          <FormItem label="箱子类型" >
            <Select clearable  style="width:200px" v-model="searchList.type">
                <Option  value="A">拍照</Option>
                <Option  value="B">不拍照</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="物品归类" >
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem> -->
          <FormItem >
            <Button type="warning" icon="ios-search" style="" @click="getList()">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList" >
          <template slot-scope="{ row, index }" slot="circulationType">
            <Button type="success" size="small" v-show="row.storeStatus.code=='withdraw'">已取回</Button>
            <Button type="info" size="small" v-show="row.storeStatus.code=='store'">存储中</Button>
            <Button type="warning" size="small" v-show="row.storeStatus.code=='fetch'">取回中</Button>
          </template>
          <template slot-scope="{ row, index }" slot="type">
            <Button type="success" size="small" v-show="row.auditStatus=='pass'">已通过</Button>
            <Button type="error" size="small" v-show="row.auditStatus=='fail'">未通过</Button>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"  style="margin-right: 5px;color:#19be6b;">详情</Button>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <!-- <Button type="success" @click="modal1=true">添加物品</Button> -->
          <Button type="primary" style="margin:0 8px 5px 0" @click="exportData()">导出列表</Button>
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
    <Modal v-model="imgModal"  title="图片" >
      <div style="text-align: center">
        <viewer > 
          <img :src="img" alt="" style="width:200px">
        </viewer>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getInventoryBoxList } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
      img:'',
      imgModal:false,
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      columnsList:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userId',
          width: 150,
          align: 'center'
        },
        {
          title: '存单编号',
          key: 'orderNo',
          width: 190,
          align: 'center'
        },
        {
          title: '箱子编号',
          key: 'packCode',
          width: 180,
          align: 'center'
        },
        {
          title: '箱子名称',
          key: 'boxName',
          width: 250,
          align: 'center'
        },
        {
          title: '箱子类型',
          key: 'boxType',
          width: 130,
          align: 'center'
        },
        {
          title: '所在库位',
          key: 'storeCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '管理员备注',
          key: 'auditRemark',
          minWidth: 180,
          align: 'center'
        },
        {
          title: '箱内物品备注',
          key: 'remark',
          minWidth: 180,
          align: 'center'
        },
        {
          title: '流转状态',
          slot: 'circulationType',
          width: 120,
          align: 'center'
        },
        {
          title: '安检状态',
          slot: 'type',
          width: 120,
          align: 'center'
        },
        {
          title: '取单编号',
          key: 'withdrawOrderId',
          minWidth: 190,
          align: 'center'
        },
      ],
      columnsList1:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userId',
          width: 220,
          align: 'center'
        },
        {
          title: '存单编号',
          key: 'orderNo',
          width: 190,
          align: 'center'
        },
        {
          title: '箱子编号',
          key: 'packCode',
          width: 180,
          align: 'center'
        },
        {
          title: '箱子名称',
          key: 'boxName',
          width: 130,
          align: 'center'
        },
        {
          title: '箱子类型',
          key: 'boxType',
          width: 130,
          align: 'center'
        },
        {
          title: '所在库位',
          key: 'storeCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '管理员备注',
          key: 'auditRemark',
          minWidth: 180,
          align: 'center'
        },
        {
          title: '箱内物品备注',
          key: 'remark',
          minWidth: 180,
          align: 'center'
        },
        {
          title: '流转状态',
          key: 'storeStatusCode',
          width: 120,
          align: 'center'
        },
        {
          title: '安检状态',
          key: 'auditStatusName',
          width: 120,
          align: 'center'
        },
        {
          title: '取单编号',
          key: 'withdrawOrderId',
          minWidth: 190,
          align: 'center'
        },
        // {
        //   title: '操作',
        //   slot: 'operation',
        //   width: 100,
        //   fixed: 'left',
        //   align: 'center'
        // },
      ],
      dataList:[
      ],
      searchList:{
        storeStatus:'',
        depositOrderNo:'',
        boxType:'',
        type:'',
        storeCode:'',
        code:'',
        auditStatus:'',
      }
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      let data ={
        pageNumber:this.pageNumber,
        pageSize:this.pageSize,
        storeStatus:this.searchList.storeStatus,
        depositOrderNo:this.searchList.depositOrderNo,
        code:this.searchList.code,
        boxType:this.searchList.boxType,
        storeCode:this.searchList.storeCode,
        type:this.searchList.type,
        auditStatus:this.searchList.auditStatus,
      }
      getInventoryBoxList(data).then(res=>{
        var num = 0
        let arr = res.data.data
        arr.forEach(v => {
          num ++ 
          v.num = num
          if (v.user) {
            v.userId=v.user.code
          }
          if (v.auditStatus!=null) {
            v.auditStatus = v.auditStatus.code
            v.auditStatusName = v.auditStatus.name
          }else{
            v.auditStatus = ''
            v.auditStatusName = ''
          }
          if (v.box) {
            v.boxName = v.box.name
            v.boxType = v.box.type.name
          }
          v.packCode = v.code
          v.orderNo = v.depositOrder.orderNo
          v.storeStatusCode = v.storeStatus.name
          if (v.withdrawOrder) {
            v.withdrawOrderId=v.withdrawOrder.orderNo
          }
          
        });
        this.total = res.data.total
        this.dataList = arr
        
       })
    },
    //选择状态
    tabsClick(name){
      this.searchList.status = name
      this.pageNumber = 0
      this.getList()
    },
    changePage (page) {
      this.pageNumber = page - 1
      this.getList()
    },
    pageSizeChange(pageSize){
      this.pageSize=pageSize
      this.getList()
    },
    imgClick(img){
      this.img = img
      this.imgModal=true
    },
    exportData (type) {
      this.$refs.selection.exportCsv({
          filename: '库存箱子列表',
          columns: this.columnsList1,
          data:this.dataList
      });
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
    
  }
</style>
