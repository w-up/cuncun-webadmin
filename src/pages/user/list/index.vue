
<template>
  <div>
    <Card>
      <p slot="title">用户列表</p>
      <Form inline :label-width="80" >
          <FormItem label="手机号" >
            <Input  placeholder="请输入" style="width:200px" v-model="list.mobile"></Input>
          </FormItem>
          <FormItem label="姓名" >
            <Input  placeholder="请输入" style="width:200px" v-model="list.name"></Input>
          </FormItem>
           <FormItem label="身份证号" >
            <Input  placeholder="请输入" style="width:200px" v-model="list.idNo"></Input>
          </FormItem>
          <FormItem label="注册时间" >
            <DatePicker  type="date"  placeholder="开始日期" style="width: 200px" transfer :value="list.regDateBegin"  @on-change="list.regDateBegin=$event"></DatePicker>
            <span style="margin:0 10px">~</span>
            <DatePicker  type="date"  placeholder="结束日期" style="width: 200px" transfer :value="list.regDateEnd"  @on-change="list.regDateEnd=$event"></DatePicker>
            <!-- :value="searchList.beginDt"  @on-change="searchList.beginDt=$event" -->
          </FormItem>
          <FormItem >
            <Button type="warning" icon="ios-search" style="" @click="getList">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
          <!-- <Button type="success">接单</Button> -->
          <!-- <Button type="success">导出拣货单</Button>
          <Button type="info">导出配送单</Button>
          <Button type="warning" @click="assignRidersClick">分配骑手</Button> -->
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
import { getUserList,timeDate } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
      list:{
        regDateBegin:'',
        regDateEnd:'',
        mobile:'',
        name:'',
        idNo:'',
      },
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
          key: 'code',
          width: 240,
          align: 'center'
        },
        {
          title: '昵称',
          key: 'nickName',
          width: 180,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobile',
          width: 180,
          align: 'center'
        },
        {
          title: '真实姓名',
          key: 'name',
          width: 180,
          align: 'center'
        },
        {
          title: '身份证号',
          key: 'idNo',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'regTime',
          width: 200,
          align: 'center'
        },
      ],
      dataList:[
        
      ],
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      let data ={
        name:this.list.name,
        pageNo:this.pageNumber,
        pageSize:this.pageSize,
        regDateBegin:this.list.regDateBegin,
        regDateEnd:this.list.regDateEnd,
        mobile:this.list.mobile,
        idNo:this.list.idNo,
      }
      getUserList(data).then(res=>{
        let num = 0
        let arr = res.data.data
        arr.forEach(v => {
          num++
          v.num = num
          v.regTime = timeDate(v.regTime)
        });
        this.total = res.data.total
        this.dataList = arr
      })
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
