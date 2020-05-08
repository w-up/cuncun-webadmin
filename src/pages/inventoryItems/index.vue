<template>
  <div>
    <Card>
      <p slot="title">仓储物品列表</p>
      <Form inline :label-width="80" >
          <!-- <FormItem label="用户ID" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.orderNo"></Input>
          </FormItem> -->
          <FormItem label="存单编号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.orderNo"></Input>
          </FormItem>
          <FormItem label="库位号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.storeCode"></Input>
          </FormItem>
          <FormItem label="箱子编号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.packCode"></Input>
          </FormItem>
          <FormItem label="流转状态" >
            <Select  style="width:200px" v-model="searchList.storeStatus">
                <Option  value="store">存储中</Option>
                <Option  value="withdraw">取回</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="取单编号" >
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem> -->
          <FormItem label="箱子类型" >
            <Select  style="width:200px" v-model="searchList.storeStatus">
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
            <Button type="warning" v-show="row.storeStatus.code=='withdraw'">已取回</Button>
            <Button type="info" v-show="row.storeStatus.code=='store'">存储中</Button>
          </template>
          <template slot-scope="{ row, index }" slot="imgKey">
            <Button type="success"  @click="imgClick(row.coverPic)">查看</Button>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"  style="margin-right: 5px;color:#19be6b;">详情</Button>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <!-- <Button type="success" @click="modal1=true">添加物品</Button> -->
          <Button type="info">导出到Excel</Button>
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
    <Modal
        v-model="modal1"
        title="物品"
      >
      <Form  :label-width="80" >
          <FormItem label="用户ID" >
            <Select  style="width:250px">
                <Option  value="1">111</Option>
                <Option  value="2">222</Option>
            </Select>
          </FormItem>
          <FormItem label="存单编号" >
            <Select  style="width:250px">
                <Option  value="1">111</Option>
                <Option  value="2">222</Option>
            </Select>
          </FormItem>
          <FormItem label="物品编号" >
            <Input  placeholder="请输入" style="width:250px"></Input>
          </FormItem>
          <FormItem label="物品名称" >
            <Input  placeholder="请输入" style="width:250px"></Input>
          </FormItem>
          <FormItem label="库位号" >
            <Input  placeholder="请输入" style="width:250px"></Input>
          </FormItem>
          <FormItem label="箱子编号" >
            <Select  style="width:250px">
                <Option  value="1">111</Option>
                <Option  value="2">222</Option>
            </Select>
          </FormItem>
          <FormItem label="物品归类" >
            <Select  style="width:250px">
                <Option  value="1">111</Option>
                <Option  value="2">222</Option>
            </Select>
          </FormItem>
          <FormItem label="展示区域" >
            <Select  style="width:250px">
                <Option  value="1">111</Option>
                <Option  value="2">222</Option>
            </Select>
          </FormItem>
          <FormItem label="标签" >
            <Input  placeholder="请输入" style="width:250px"></Input>
          </FormItem>
          <FormItem label="图片" >
            <Button icon="ios-cloud-upload-outline">上传</Button>
          </FormItem>
      </Form>  
    </Modal>
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
import { getInventoryItemsList } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
      img:'',
      imgModal:false,
      modal1:false,
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
          title: '物品编号',
          key: 'code',
          width: 120,
          align: 'center'
        },
        {
          title: '物品名称',
          key: 'name',
          width: 125,
          align: 'center'
        },
        {
          title: '图片',
          slot: 'imgKey',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '所在库位',
          key: 'storeCode',
          width: 120,
          align: 'center'
        },
        {
          title: '物品归类',
          key: 'categoryName',
          width: 150,
          align: 'center'
        },
        {
          title: '展示区域',
          key: 'typeName',
          width: 100,
          align: 'center'
        },
        {
          title: '标签',
          key: 'tags',
          width: 100,
          align: 'center'
        },
        {
          title: '流转状态',
          slot: 'circulationType',
          width: 120,
          align: 'center'
        },
        {
          title: '取单编号',
          key: 'withdrawOrderId',
          width: 190,
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
        orderNo:'',
        boxType:'',
        storeCode:'',
        packCode:'',
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
        orderNo:this.searchList.orderNo,
        boxType:this.searchList.boxType,
        storeCode:this.searchList.storeCode,
        storeStatus:this.searchList.storeStatus,
      }
      getInventoryItemsList(data).then(res=>{
        var num = 0
        let arr = res.data.data
        arr.forEach(v => {
          num ++ 
          v.num = num
          if (v.user) {
            v.userId=v.user.id
          }
          v.packCode = v.pack.code
          v.orderNo = v.depositOrder.orderNo
          v.categoryName = v.category.name
          v.typeName=v.type.name
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
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
    
  }
</style>
