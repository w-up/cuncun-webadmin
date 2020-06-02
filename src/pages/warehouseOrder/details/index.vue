<template>
  <div>
    <Card>
      <p slot="title">仓储订单详情</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
      <Card>
        <p slot="title">基本信息</p>
        <Form>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="订单号:" style="width:400px">
                <span>{{list.orderNo}}</span>
              </FormItem>
              <FormItem label="用户姓名:" style="width:300px">
                <span>{{list.name}}</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="费用周期:" style="width:400px">
                <span>{{list.time}}</span>
              </FormItem>
              <FormItem label="手机号:" style="width:300px">
                <span>{{list.mobile}}</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem v-show="type">
            <Form  :label-width="100" inline style="">
              <FormItem label="订单费用:" style="width:400px">
                <span>{{list.settleFee?list.settleFee:list.fee}}</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100"  style="">
              <FormItem label="备注" style="">
                <Input  type="textarea" :rows="4" style="width:400px" placeholder="请输入" v-model="list.remark"/>
              </FormItem>
              <FormItem label=" " style="">
                <Button type="success" style="margin-top:10px" v-show="this.type" @click="clickRemark">保存评论</Button>
              </FormItem>
            </Form>
          </FormItem>
        </Form>
        <Table border :columns="columnsCost" :data="dataCost" :span-method="handleSpan" :row-class-name="rowClassName"></Table>
      </Card>
      <div style="margin:20px 0"> 
        <Card >
          <p slot="title">数据信息</p>
          <Table border :columns="columns" :data="data" >
            
            <template slot-scope="{ row, index }" slot="aaa">
              <div v-show="tableType==false">{{row.settleFee}}</div>
              <Input v-show="tableType==true"  style="" placeholder="请输入" v-model="row.settleFee" @on-change="data[index].settleFee= row.settleFee"/>
            </Poptip>
            </template>
          </Table>
          <Button type="info" style="margin-top:20px" @click="tableTypeClick" v-show="this.type">{{tableType==true?'保存':'修改费用'}}</Button>
        </Card>
      </div>
      <Poptip
        confirm
        title="是否确认发送订单?"
        @on-ok="saveData">
        <Button type="success" style="margin-top:10px" v-show="this.type">发送订单</Button>
      </Poptip>
    </Card>
  </div>
</template>

<script>
import { getStorageOrderDetail,timeDate1,getStorageOrderFeeAdjust,getStorageOrderPacksList,getStorageOrderSend2user,getStorageOrderRemark } from "@/api/account";
export default {
  // name: 'home',
  data () {
    return {
      id:this.$route.query.id,
      type:false,
      tableType:false,

      list:{},
      columns:[
        {
          title: '序号',
          key: 'num',
          align: 'center',
          width:80
        },
        {
          title: '箱子类型',
          key: 'packType',
          align: 'center',
          width:100
        },
        {
          title: '箱子编号',
          key: 'packCode',
          align: 'center',
          width:120
        },
        {
          title: '箱子名称',
          key: 'boxName',
          minWidth:170,
          align: 'center'
        },
        {
          title: '初始物品数量',
          key: 'initGoodsCount',
          minWidth:120,
          align: 'center'
        },
        {
          title: '当前物品数量',
          key: 'nowGoodsCount',
          minWidth:120,
          align: 'center'
        },
        {
          title: '占比',
          key: 'proportion',
          align: 'center',
          width:80
        },
        {
          title: '原始仓储费用',
          key: 'fee',
          minWidth:120,
          align: 'center'
        },
        {
          title: '实收仓储费用',
          slot: 'aaa',
          minWidth:120,
          align: 'center'

        }
      ],
      data:[

      ],
      columnsCost:[
        {
          title: 'SD箱数量',
          key: 'aa',
          align: 'center'
        },
        {
          title: 'SD箱总费用',
          key: 'bb',
          align: 'center'
        },
        {
          title: '订单总费用',
          key: 'ee',
          align: 'center'
        },
      ],
      dataCost:[
        {
          aa:'',
          bb:'',
          ee:''
        },
        {
          aa:'EC箱总数量',
          bb:'EC箱总费用',
          ee:''
        },
        {
          aa:'',
          bb:'',
          ee:''
        },
      ],
    }
  },
  mounted () {
    if (this.$route.query.type=='waitcheck') {
      this.type=true
    }
    this.getList()
    this.getPacksList()
  },
  methods:{
    getList(){
      getStorageOrderDetail(this.$route.query.id).then(res=>{
        let arr = res.data
        arr.time = timeDate1(arr.beginDate)+' - '+timeDate1(arr.endDate)
        if (arr.status.code=='waitcheck') {
          this.type=true
        }else{
          this.type=false
        }
        this.dataCost[0].aa = arr.boxSDnum
        this.dataCost[0].bb = arr.boxSDpriceNew
        this.dataCost[2].aa = arr.boxECnum
        this.dataCost[2].bb = arr.boxECpriceNew
        // arr.fee = Number(arr.boxECprice)+Number(arr.boxSDprice)
        this.dataCost[0].ee = arr.settleFee
        if (arr.user) {
          arr.name = arr.user.name
          arr.mobile = arr.user.mobile
        }else{
          arr.name = ''
          arr.mobile = ''
        }
        
        this.list = arr
      })
    },
    saveData(){
      getStorageOrderSend2user(this.id).then(res=>{
        this.$Message.success('成功');
        this.getList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    getPacksList(){
      //
      // getStorageOrderPacksList('5eb65eee25f6505b6e516020').then(res=>{
      getStorageOrderPacksList(this.$route.query.id).then(res=>{
        var arr = res.data.data
        let num = 0
        arr.forEach(v => {
          num ++ 
          v.num = num
           
          if (v.packType.code =='B') {
            v.packType ='经济SML'
          } else {
            v.packType ='标准'
          }
          if (v.nowGoodsCount==null) {
            v.nowGoodsCount=0
          }
          v.boxName =v.pack.box.name
          if (v.nowGoodsCount==0 && v.initGoodsCount==0) {
            v.proportion='0%'
          }else{
            v.proportion = (( Number(v.nowGoodsCount)/Number(v.initGoodsCount) ).toFixed(1))*100+'%'
          }
        });
        this.data=arr
        
      })
    },
    //保存评论
    clickRemark(){
      let data = {
        id:this.list.id,
        remark:this.list.remark
      }
      getStorageOrderRemark(data).then(res=>{
        this.$Message.success('成功');
        this.getList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    tableTypeClick(){
      if (this.data.length>0) {
        if (this.tableType==true) {
          var list = this.data
          for (let i = 0; i < list.length; i++) {
            let data = {
              orderPackId:list[i].id,
              fee:list[i].settleFee,
            }
            getStorageOrderFeeAdjust(data).then(res=>{
              if (i==list.length-1) {
                this.$Message.success('成功');
                this.getList()
                this.getPacksList()
                this.tableType = !this.tableType
              }
            }).catch(err => {
              this.$Message.error(err.response.data.message)
            })
          }
        }else{
          this.tableType = !this.tableType
        }
      }else{
        this.$Message.error('暂无数据无法修改！')
      }
      
      
    },
    handleSpan ({ row, column, rowIndex, columnIndex }) {
        // if (rowIndex === 0 && columnIndex === 0) {
        //     return [1, 2];
        // } else if (rowIndex === 0 && columnIndex === 1) {
        //     return  [0, 0];
        // }
        if (rowIndex === 0 && columnIndex === 2) {
            return {
                rowspan: 3,
                colspan: 1
            };
        } else if (rowIndex === 1 && columnIndex === 2) {
            return {
                rowspan: 0,
                colspan: 0
            };
        }else if (rowIndex === 2 && columnIndex === 2) {
            return {
                rowspan: 0,
                colspan: 0
            };
        }
    },
    backPage () {
      this.$router.go(-1)
    },
    rowClassName (row, index) {
      if (index ===1) {
        return 'demo-table-info-row';
      } 
      return '';
    }
  }
}
</script>

<style lang="less" >
.ivu-table .demo-table-info-row td{
  background-color: #f8f8f9;
  color: #515a6e;
  font-weight: 600
}
</style>
