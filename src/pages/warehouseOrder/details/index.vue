<template>
  <div>
    <Card>
      <p slot="title">取单详情</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
      <Card>
        <p slot="title">基本信息</p>
        <Form>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="订单号:" style="width:400px">
                <span>Q14223223</span>
              </FormItem>
              <FormItem label="用户姓名:" style="width:300px">
                <span>老司机</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem >
            <Form  :label-width="100" inline style="">
              <FormItem label="费用周期:" style="width:400px">
                <span>2020-1-1~2020-1-30</span>
              </FormItem>
              <FormItem label="手机号:" style="width:300px">
                <span>1334433443</span>
              </FormItem>
            </Form>
          </FormItem>
          <FormItem v-show="type">
            <Form  :label-width="100" inline style="">
              <FormItem label="订单费用:" style="width:400px">
                <span>-</span>
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
        <Table border :columns="columnsCost" :data="dataCost"></Table>
      </Card>
      <div style="margin:20px 0"> 
        <Card >
          <p slot="title">数据信息</p>
          <Table border :columns="columns" :data="data"></Table>
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

export default {
  // name: 'home',
  data () {
    return {
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
          title: '箱子数量',
          key: 'cc'
        },
        {
          title: '仓储费用',
          key: 'dd'
        },
      ],
      data:[
        {}
      ],
      columnsCost:[
        {
          title: 'A箱数量',
          key: 'aa'
        },
        {
          title: 'A箱总费用',
          key: 'bb'
        },
        {
          title: 'B箱数量',
          key: 'cc'
        },
        {
          title: 'B箱总费用',
          key: 'dd'
        },
        {
          title: '订单总费用',
          key: 'ee'
        },
      ],
      dataCost:[
        {}
      ],
      ruleValidate: {
        cost: [
          { required: true, message: '金额不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  mounted () {
    if (this.$route.query.type=='44') {
      this.type=true
    }
  },
  methods:{
    confirm(){
      this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.amendmentFeeModal = false
          } else {
            this.$Message.error('金额不能为空!');
          }
      })
    },
    cancel(){
      this.amendmentFeeModal = false
    },
    amendmentFee(){
      this.amendmentFeeModal = true
    },
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">

</style>
