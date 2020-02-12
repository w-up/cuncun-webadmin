<template>
  <div>
    <Card>
      <p slot="title">存单详情</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
      <div>
        
        <Form style="z-index:9">
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="订单号:" style="width:250px">
                <span>Q14223223</span>
              </FormItem>
              <FormItem label="联系人:" style="width:350px">
                <span>老司机</span>
              </FormItem>
              <FormItem label="预估物流费用:" style="width:200px">
                <span>15</span>
              </FormItem>
              <FormItem style="float: right;">
                <Select  style="width:200px;">
                  <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="用户姓名:" style="width:250px">
                <span>老司机</span>
              </FormItem>
              <FormItem label="联系电话:" style="width:350px">
                <span>1334433443</span>
              </FormItem>
              <FormItem label="实际物流费用:" style="width:300px">
                <span>1233</span>
                <Button type="info" style="margin-left:20px">修改物流费用</Button>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="手机号:" style="width:250px">
                <span>1334433443</span>
              </FormItem>
              <FormItem label="取件地址:" style="width:350px">
                <span>老司机</span>
              </FormItem>
              <FormItem label="已收物流费用:" style="width:200px">
                <span>15</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="预估数量:" style="width:250px">
                <span>22</span>
              </FormItem>
              <FormItem label="取件日期:" style="width:350px">
                <span>2019-12-12</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="骑手:" style="width:250px">
                <span>待分配</span>
                <Button type="info" style="margin-left:20px">分配骑手</Button>
              </FormItem>
              <FormItem label="取件时间:" style="width:350px">
                <span>15:00:30</span>
              </FormItem>
            </Form>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  // name: 'home',
  data () {
    return {
      stateList:[
        {
          value:'待支付',
          label:'待支付',
        },
        {
          value:'待处理',
          label:'待处理',
        },
        {
          value:'待分配骑手',
          label:'待分配骑手',
        },
        {
          value:'待取货',
          label:'待取货',
        },
        {
          value:'回库中',
          label:'回库中',
        },
        {
          value:'安检中',
          label:'安检中',
        },
        {
          value:'待拍照',
          label:'待拍照',
        },
        {
          value:'待上架',
          label:'待上架',
        },
        {
          value:'已完成',
          label:'已完成',
        },
        {
          value:'已取消',
          label:'已取消',
        },
      ]
    }
  },
  mounted () {
    //
  },
  methods:{
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
