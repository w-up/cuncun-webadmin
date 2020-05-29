
<template>
  <div>
    <Card>
      <p slot="title">平台收入统计</p>
      <Form inline :label-width="80" >
          <FormItem label="时间区间" >
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
        name:''
      },
      columnsList:[
        {
          title: '标题',
          key: 'num',
          width: 120,
          align: 'center'
        },
        {
          title: '1',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '2',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '3',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '4',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '5',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '6',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '7',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '8',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '9',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '10',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '11',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '12',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '13',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '14',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '15',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '16',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '17',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '18',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '19',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '20',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '21',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '22',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '23',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '24',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '25',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '26',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '27',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '28',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '29',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '30',
          key: '1',
          width: 70,
          align: 'center'
        },
        {
          title: '31',
          key: '1',
          width: 70,
          align: 'center'
        },
      ],
      dataList:[
        {
          num:'收到存单数'
        },
        {
          num:'实际完成存单'
        },
        {
          num:'平均存单金额'
        },
        {
          num:'存单收入'
        },
        {
          num:'收到取单数'
        },
        {
          num:'实际完成取单'
        },
        {
          num:'平均取单金额'
        },
        {
          num:'取单收入'
        },
        {
          num:'存储费用'
        },
        {
          num:'增值服务单数'
        },
        {
          num:'增值服务收入'
        },
        {
          num:'收入总计'
        },
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
    // this.getList()
  },
  methods:{
    getList(){
      let data ={
        regDateBegin:this.list.regDateBegin,
        regDateEnd:this.list.regDateEnd,
        mobile:this.list.mobile,
        name:this.list.name,
        count:true,
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
