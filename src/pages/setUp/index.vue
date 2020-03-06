
<template>
  <div>
    <Card>
      <p slot="title">设置管理</p>
      <Row>
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">存单路程价格设置</p>
            <Table border :columns="depositReceipColumns" :data="depositReceiptData">
              <template slot-scope="{ row }" slot="price">
                <Input  placeholder="请输入" ></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px">保存</Button>
          </Card>
        </Col>
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">物品数量系数</p>
            <Table border :columns="goodsColumns" :data="goodsData">
               <template slot-scope="{ row }" slot="name">
                <Input  placeholder="请输入" ></Input>
              </template>
               <template slot-scope="{ row }" slot="price">
                <Input  placeholder="请输入" ></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px">保存</Button>
            <Button type="info" style="margin-top:20px;margin-left:15px" @click="goodsClick">添加</Button>
          </Card>
        </Col>
      </Row>
      <Row style="margin-top:30px">
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">时间系数设置</p>
            <Table border :columns="timeColumns" :data="timeData">
               <template slot-scope="{ row }" slot="name">
                <Input  placeholder="请输入" ></Input>
              </template>
               <template slot-scope="{ row }" slot="price">
                <Input  placeholder="请输入" ></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px">保存</Button>
            <Button type="info" style="margin-top:20px;margin-left:15px" @click="timeClick">添加</Button>
          </Card>
        </Col>
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">存储费用设置</p>
            <Table border :columns="depositReceipColumns" :data="storageData">
              <template slot-scope="{ row }" slot="price">
                <Input  placeholder="请输入" ></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px">保存</Button>
          </Card>
        </Col>
      </Row>
      <Row style="margin-top:30px">
        <Col span="12">
          <Card style="width:500px">
            <p slot="title">取单物流费用设置</p>
            <Table border :columns="logisticsColumns" :data="logisticsData">
              <template slot-scope="{ row }" slot="price">
                <Input  placeholder="请输入" ></Input>
              </template>
            </Table>
            <Button type="success" style="margin-top:20px">保存</Button>
          </Card>
        </Col>
        <Col span="12">

        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  // name: 'home',
  data () {
    return {
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
      goodsColumns: [
        {
          title: '箱子数量',
          slot: 'name'
        },
        {
          title: '系数',
          slot: 'price'
        },
      ],
      timeColumns: [
        {
          title: '时间段',
          slot: 'name'
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
          name:'起步公里数(km)'
        },
        {
          name:'起步价(元)'
        },
        {
          name:'额外公里价(元)'
        },
      ],
      goodsData:[
        {}
      ],
      timeData:[
        {}
      ],
      storageData:[
        {
          name:'收费月'
        },
      ],
      logisticsData:[
        {
          name:'首公斤'
        },
        {
          name:'额外每公斤'
        },
      ],
    }
  },
  mounted () {
    //
  },
  methods:{
    getList(){

    },
    goodsClick(){
      this.goodsData.push({})
    },
    timeClick(){
      this.timeData.push({})
    },
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
