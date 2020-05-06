<template>
  <div>
    <Card>
      <p slot="title">存单列表</p>
      <Form inline :label-width="80" >
          <FormItem label="用户ID" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.orderNo"></Input>
          </FormItem>
          <FormItem label="存单编号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.linkman"></Input>
          </FormItem>
          <FormItem label="库位号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.userAccountId"></Input>
          </FormItem>
          <FormItem label="箱子编号" >
            <Input  placeholder="请输入" style="width:200px" v-model="searchList.orderNo"></Input>
          </FormItem>
          <FormItem label="流转状态" >
            <Select  style="width:200px">
                <Option  value="1">在库</Option>
                <Option  value="2">已取回</Option>
            </Select>
          </FormItem>
          <FormItem label="取单编号" >
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem>
          <FormItem label="箱子类型" >
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem>
          <FormItem label="物品归类" >
            <Input  placeholder="请输入" style="width:200px" ></Input>
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="" @click="getList()">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList" >
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"  style="margin-right: 5px;color:#19be6b;">详情</Button>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <Button type="success" @click="modal1=true">添加物品</Button>
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
  </div>
</template>

<script>
import {  } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
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
          key: 'type',
          width: 120,
          align: 'center'
        },
        {
          title: '存单编号',
          key: 'paymentType',
          width: 120,
          align: 'center'
        },
        {
          title: '箱子编号',
          key: 'orderNo',
          width: 180,
          align: 'center'
        },
        {
          title: '物品编号',
          key: 'linkman',
          width: 120,
          align: 'center'
        },
        {
          title: '物品名称',
          key: 'mobile',
          width: 125,
          align: 'center'
        },
        {
          title: '图片',
          key: 'address',
          minWidth: 240,
          align: 'center'
        },
        {
          title: '所在库位',
          key: 'bookFetchDate',
          width: 120,
          align: 'center'
        },
        {
          title: '物品归类',
          key: 'time',
          width: 100,
          align: 'center'
        },
        {
          title: '展示区域',
          key: 'prepareBoxNum',
          width: 100,
          align: 'center'
        },
        {
          title: '标签',
          key: 'prepaid',
          width: 100,
          align: 'center'
        },
        {
          title: '流转状态',
          key: 'riderName',
          width: 120,
          align: 'center'
        },
        {
          title: '取单编号',
          key: 'userID',
          width: 125,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 100,
          fixed: 'left',
          align: 'center'
        },
      ],
      dataList:[
      ],
      searchList:{
        status:'',
        orderNo:'',
        linkman:'',
        linktel:'',
        userAccountId:'',
        bookFetchDateStart:'',
        bookFetchDateEnd:'',
        bookFetchHourStart:'',
        bookFetchHourEnd:'',
      }
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      // let data ={
      //   pageNumber:this.pageNumber,
      //   pageSize:this.pageSize,
      //   status:this.searchList.status,
      //   orderNo:this.searchList.orderNo,
      //   linkman:this.searchList.linkman,
      //   linktel:this.searchList.linktel,
      //   userAccountId:this.searchList.userAccountId,
      //   bookFetchDateStart:this.searchList.bookFetchDateStart,
      //   bookFetchDateEnd:this.searchList.bookFetchDateEnd,
      //   bookFetchHourStart:this.searchList.bookFetchHourStart,
      //   bookFetchHourEnd:this.searchList.bookFetchHourEnd,
      // }
      // getdepositPrderList(data).then(res=>{
      //   var num = 0
      //   let arr = res.data.data
      //   arr.forEach(v => {
      //     num ++ 
      //     v.num = num
      //     v.time = v.bookFetchTime[0]+' ~ '+v.bookFetchTime[1]
      //   });
      //   this.total = res.data.total
      //   this.dataList = arr
        
      // })
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
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
    
  }
</style>
