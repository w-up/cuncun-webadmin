
<template>
  <div>
    <Card>
      <p slot="title">用户数据统计</p>
      <Form inline :label-width="80" >
           <FormItem label="手机号" >
            <Input  placeholder="请输入" style="width:200px" v-model="list.mobile"></Input>
          </FormItem>
          <FormItem label="注册时间" >
            <DatePicker  type="date"  placeholder="开始日期" style="width: 200px" transfer :value="list.regDateBegin"  @on-change="list.regDateBegin=$event"></DatePicker>
            <span style="margin:0 10px">~</span>
            <DatePicker  type="date"  placeholder="结束日期" style="width: 200px" transfer :value="list.regDateEnd"  @on-change="list.regDateEnd=$event"></DatePicker>
            <!-- :value="searchList.beginDt"  @on-change="searchList.beginDt=$event" -->
          </FormItem>
          <!-- <FormItem label="注册来源" >
            <Select   style="width:200px;">
              <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem> -->
          <FormItem >
            <Button type="warning" icon="ios-search" style="" @click="getList">搜索</Button>
          </FormItem>
      </Form>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"   style="margin-right: 5px;color:#19be6b;" @click="addressClick(row.id)">常用地址</Button>
            <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;" @click="detailedClick(row.id)">订单明细</Button>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
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
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      list:{
        regDateBegin:'',
        regDateEnd:'',
        mobile:'',
      },
      columnsList:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'id',
          width: 240,
          align: 'center'
        },
        {
          title: '昵称',
          key: 'nickName',
          width: 160,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          width: 160,
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          width: 100,
          align: 'center'
        },
        {
          title: '年龄',
          key: 'age',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobile',
          width: 200,
          align: 'center'
        },
        // {
        //   title: '注册来源',
        //   key: 'datee',
        //   width: 200,
        //   align: 'center'
        // },
        {
          title: '注册时间',
          key: 'regTime',
          width: 200,
          align: 'center'
        },{
          title: '首次下单时间',
          key: 'firstOrderTime',
          width: 200,
          align: 'center'
        },
        {
          title: '最后登录时间',
          key: 'lastLoginTime',
          width: 200,
          align: 'center'
        },
        {
          title: '在库物品余量',
          key: 'age11',
          minWidth: 140,
          align: 'center'
        },
        {
          title: '存储费用',
          key: 'age111',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 250,
          fixed: 'left',
          align: 'center'
        },
      ],
      dataList:[

      ],
       stateList:[
        {
          value:'条目一',
          label:'条目一',
        },
        {
          value:'条目二',
          label:'条目二',
        },
      ]
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      let data ={
        pageNo:this.pageNumber,
        pageSize:this.pageSize,
        regDateBegin:this.list.regDateBegin,
        regDateEnd:this.list.regDateEnd,
        mobile:this.list.mobile,
      }
      getUserList(data).then(res=>{
        let num = 0
        let arr = res.data.data
        arr.forEach(v => {
          num++
          v.num = num
          v.regTime = timeDate(v.regTime)
          if (v.firstOrderTime) {
            v.firstOrderTime = timeDate(v.firstOrderTime)
          }
          if (v.lastLoginTime) {
            v.lastLoginTime = timeDate(v.lastLoginTime)
          }
          // if (v.firstOrderTime =='NaN-NaN-NaN NaN:NaN:NaN') {
          //   v.firstOrderTime=''
          // }
        });
        console.log(arr);
        
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
    addressClick(id){
      this.$router.push({
        path: '/dataStatistics/address',
        query: {
          id: id,
        }
      })
    },
    detailedClick(id){
      this.$router.push({
        path: '/dataStatistics/detailed',
        query: {
          id: id,
        }
      })
    },
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
