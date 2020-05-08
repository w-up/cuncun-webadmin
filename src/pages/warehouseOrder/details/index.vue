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
                <span>{{list.name}}</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem v-show="type">
            <Form  :label-width="100" inline style="">
              <FormItem label="订单费用:" style="width:400px">
                <span>{{list.settleFee?list.settleFee:list.fee}}</span>
                <Button type="info" style="margin-left:20px" @click="amendmentFee()">修改费用</Button>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100"  style="">
              <FormItem label="备注" style="">
                <Input  type="textarea" :rows="4" style="width:400px" placeholder="请输入" />
                <!-- <Button type="success" style="margin-left:20px">保存</Button> -->
              </FormItem>
            </Form>
          </FormItem>
        </Form>
        <Table border :columns="columnsCost" :data="dataCost" :span-method="handleSpan" :row-class-name="rowClassName"></Table>
      </Card>
      <div style="margin:20px 0"> 
        <Card >
          <p slot="title">数据信息</p>
          <Table border :columns="columns" :data="data" ></Table>
        </Card>
      </div>
    </Card>
    <Modal v-model="amendmentFeeModal"  title="订单费用">
      <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="80">
        <FormItem label="订单费用" prop="cost">
            <Input v-model="list.cost" placeholder="请输入"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <div style="">
          <Button type="text" style="margin-right:10px;" @click="cancel">取消</Button>
          <Button type="primary" style="margin-right:10px" @click="confirm">确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getStorageOrderDetail,timeDate1,getStorageOrderFeeAdjust } from "@/api/account";
export default {
  // name: 'home',
  data () {
    return {
      id:this.$route.query.id,
      type:false,
      amendmentFeeModal:false,
      list:{
        cost:'',
      },
      columns:[
        {
          title: '序号',
          key: 'aa',
          width:80
        },
        {
          title: '箱子类型',
          key: 'bb'
        },
        {
          title: '箱子编号',
          key: 'cc'
        },
        {
          title: '初始物品数量',
          key: 'cc'
        },
        {
          title: '当前物品数量',
          key: 'cc'
        },
        {
          title: '占比',
          key: 'cc'
        },
        {
          title: '原始仓储费用',
          key: 'cc'
        },
        {
          title: '实收仓储费用',
          key: 'cc'
        },
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
      ruleValidate: {
        cost: [
          { required: true, message: '金额不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  mounted () {
    if (this.$route.query.type=='waitcheck') {
      this.type=true
    }
    this.getList()
  },
  methods:{
    getList(){
      getStorageOrderDetail(this.$route.query.id).then(res=>{
        let arr = res.data
        arr.time = timeDate1(arr.beginDate)+' - '+timeDate1(arr.endDate)
        this.dataCost[0].aa = arr.boxSDnum
        this.dataCost[0].bb = arr.boxSDprice
        this.dataCost[2].aa = arr.boxECnum
        this.dataCost[2].bb = arr.boxECprice
        // arr.fee = Number(arr.boxECprice)+Number(arr.boxSDprice)
        this.dataCost[0].ee = arr.fee
        arr.name = arr.user.name
        arr.mobile = arr.user.mobile
        this.list = arr
      })
    },
    confirm(){
      this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let data ={
              id:this.id,
              settleFee:this.list.cost
            }
            getStorageOrderFeeAdjust(data).then(res=>{

              this.list.cost=''
              this.$Message.success('成功!');
              this.getList()
              this.amendmentFeeModal = false
            }).catch(err => {
              this.$Message.error(err.response.data.message)
            })
          } else {
            this.$Message.error('金额不能为空!');
          }
      })
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
    cancel(){
      this.list.cost=''
      this.amendmentFeeModal = false
    },
    amendmentFee(){
      this.amendmentFeeModal = true
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
