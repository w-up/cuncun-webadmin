
<template>
  <div>
    <Card>
      <p slot="title">设置管理</p>
      <Row>
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">存单路程价格设置</p>
            <Table border :columns="depositReceipColumns" :data="depositReceiptData">
              <template slot-scope="{ row, index }" slot="price">
                <Input  placeholder="请输入" v-model="row.num" @on-change="depositReceiptData[index].num= row.num"></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px" @click="clickPriceSetUp">保存</Button>
          </Card>
        </Col>
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">物品数量系数</p>
            <Table border :columns="goodsColumns" :data="goodsData">
               <template slot-scope="{ row, index }" slot="price">
                <Input  placeholder="请输入" v-model="row.num" @on-change="goodsData[index].num= row.num"></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px" @click="clickGoodsNumSetUp">保存</Button>
            <!-- <Button type="info" style="margin-top:20px;margin-left:15px" @click="goodsClick">添加</Button> -->
          </Card>
        </Col>
      </Row>
      <Row style="margin-top:30px">
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">时间系数设置</p>
            <Table border :columns="timeColumns" :data="timeData">
              <template slot-scope="{ row, index }" slot="price">
                <Input  placeholder="请输入" v-model="row.num" @on-change="timeData[index].num= row.num"></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px" @click="clickTimeSetUp">保存</Button>
            <!-- <Button type="info" style="margin-top:20px;margin-left:15px" @click="timeClick">添加</Button> -->
          </Card>
        </Col>
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">存储费用设置</p>
            <Table border :columns="depositReceipColumns" :data="storageData">
              <template slot-scope="{ row, index }" slot="price">
                <Input  placeholder="请输入" v-model="row.num" @on-change="storageData[index].num= row.num"></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px" @click="clickStorageCostSetUp">保存</Button>
          </Card>
        </Col>
      </Row>
      <Row style="margin-top:30px">
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">取单物流费用设置</p>
            <Table border :columns="logisticsColumns" :data="logisticsData">
              <template slot-scope="{ row, index }" slot="price">
                <Input  placeholder="请输入" v-model="row.num" @on-change="logisticsData[index].num= row.num"></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px" @click="clickLogisticsFeeSetUp">保存</Button>
          </Card>
        </Col>
        <Col span="12">
           <Card style="width:500px">
            <p slot="title">预约日期限额设置</p>
            <Table border :columns="orderColumns" :data="orderData">
              <template slot-scope="{ row, index }" slot="price">
                <Input  placeholder="请输入" v-model="row.num" @on-change="logisticsData[index].num= row.num"></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px" >保存</Button>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getTimeSetUpList,getTimeSetUpSave,getPriceSetUpList,getPriceSetUpSave,getLogisticsFeeSetUpList,getLogisticsFeeSetUpSave,getGoodsNumSetUpList,getGoodsNumSetUpSave,getStorageCostSetUpList,getStorageCostSetUpSave } from '@api/account';
export default {
  // name: 'home',
  data () {
    return {
      timeList:[
        {
          value:'1',
          label:'1'
        },
        {
          value:'2',
          label:'2'
        },
        {
          value:'3',
          label:'3'
        },
        {
          value:'4',
          label:'4'
        },
        {
          value:'5',
          label:'5'
        },
        {
          value:'6',
          label:'6'
        },
        {
          value:'7',
          label:'7'
        },
        {
          value:'8',
          label:'8'
        },
        {
          value:'9',
          label:'9'
        },
        {
          value:'10',
          label:'10'
        },
        {
          value:'11',
          label:'11'
        },
        {
          value:'12',
          label:'12'
        },
        {
          value:'13',
          label:'13'
        },
        {
          value:'14',
          label:'14'
        },
        {
          value:'15',
          label:'15'
        },
        {
          value:'16',
          label:'16'
        },
        {
          value:'17',
          label:'17'
        },
        {
          value:'18',
          label:'18'
        },
        {
          value:'19',
          label:'19'
        },
        {
          value:'20',
          label:'20'
        },
        {
          value:'21',
          label:'21'
        },
        {
          value:'22',
          label:'22'
        },
        {
          value:'23',
          label:'23'
        },
        {
          value:'24',
          label:'24'
        },
      ],
      depositReceipColumns: [
        {
          title: '项目',
          key: 'name'
        },
        {
          title: '值',
          slot: 'price'
        },
      ],
      orderColumns:[
        {
          title: '项目',
          key: 'name'
        },
        {
          title: '数量',
          slot: 'price'
        },
      ],
      goodsColumns: [
        {
          title: '箱子数量',
          key: 'name',
           align:'center'
        },
        {
          title: '系数',
          slot: 'price'
        },
      ],
      timeColumns: [
        {
          title: '时间段',
          key: 'name',
          align:'center'
        },
        {
          title: '系数',
          slot: 'price'
        },
      ],
      logisticsColumns: [
        {
          title: '项目',
          key: 'name'
        },
        {
          title: '价格',
          slot: 'price'
        },
      ],
      depositReceiptData:[
        {
          name:'起步公里数(km)',
          num:''
        },
        {
          name:'起步价(元)',
          num:''
        },
        {
          name:'额外公里价(元)',
          num:''
        },
      ],
      goodsData:[
        {
          name:'1-5',
          num:''
        },
        {
          name:'6-15',
          num:''
        },
        {
          name:'16-30',
          num:''
        },{
          name:'31以上',
          num:''
        },
      ],
      timeData:[
        {
          name:'9点-13点',
          num:''
        },
        {
          name:'13点-21点',
          num:''
        },
        {
          name:'21点-23点',
          num:''
        },
      ],
      storageData:[
        {
          name:'收费月',
          num:''
        },
      ],
      logisticsData:[
        {
          name:'首公斤',
          num:''
        },
        {
          name:'额外每公斤',
          num:''
        },
      ],
      orderData:[
        {
          name:'日限额',
          num:'100'
        },
      ],
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    
    getList(){
      getTimeSetUpList().then(res=>{
       let arr = res.data
       this.timeData[0].num = arr.A
       this.timeData[1].num = arr.B
       this.timeData[2].num = arr.C
      })
      getPriceSetUpList().then(res=>{
        let arr = res.data
        this.depositReceiptData[0].num = arr.startKmNum
        this.depositReceiptData[1].num = arr.startKmPrice
        this.depositReceiptData[2].num = arr.extraKmPrice
      })
      getLogisticsFeeSetUpList().then(res=>{
        let arr = res.data
        this.logisticsData[0].num=arr.startKgPrice+''
        this.logisticsData[1].num=arr.extraKgPrice+''
      })
      getGoodsNumSetUpList().then(res=>{
        let arr = res.data
       this.goodsData[0].num=arr.A
       this.goodsData[1].num=arr.B
       this.goodsData[2].num=arr.C
       this.goodsData[3].num=arr.D
        
      })
      getStorageCostSetUpList().then(res=>{
        let arr = res.data
        this.storageData[0].num = arr.month
        
      })
    },
    //物品数量系数保存
    clickGoodsNumSetUp(){
      var data={
        'ar[A]':this.goodsData[0].num,
        'ar[B]':this.goodsData[1].num,
        'ar[C]':this.goodsData[2].num,
        'ar[D]':this.goodsData[3].num,

      }
      getGoodsNumSetUpSave(data).then(res=>{
        this.$Message.success('保存成功');
        
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    //存储费用
    clickStorageCostSetUp(){
      var data={
        'sd[month]':this.storageData[0].num,
      }
      getStorageCostSetUpSave(data).then(res=>{
        this.$Message.success('保存成功');
        
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    //取单物流费
    clickLogisticsFeeSetUp(){
      var data={
        'wp[startKgPrice]':this.logisticsData[0].num,
        'wp[extraKgPrice]':this.logisticsData[1].num,
      }
      getLogisticsFeeSetUpSave(data).then(res=>{
        this.$Message.success('保存成功');
        
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    //存单路价格
    clickPriceSetUp(){
      var data={
        'dp[startKmNum]':this.depositReceiptData[0].num,
        'dp[startKmPrice]':this.depositReceiptData[1].num,
        'dp[extraKmPrice]':this.depositReceiptData[2].num
      }
      getPriceSetUpSave(data).then(res=>{
        this.$Message.success('保存成功');
        
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    //时间系数设置
    clickTimeSetUp(){
      var data={
        'tr[A]':this.timeData[0].num,
        'tr[B]':this.timeData[1].num,
        'tr[C]':this.timeData[2].num
      }
      getTimeSetUpSave(data).then(res=>{
        this.$Message.success('保存成功');
        
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    goodsClick(){
      this.goodsData.push({})
    },
    timeClick(){
      this.timeData.push({})
    },
    asdsadsad(event){
      console.log(event);
      console.log(this.storageData[0].num);
      
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
