<template>
  <div>
    <Card>
      <p slot="title">箱子类型列表</p>
       <Button type="success" icon="md-add" style="" @click="boxClick('')">添加</Button>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small" icon="md-create" style="margin-right: 5px;color:#19be6b;" @click="boxClick(row.id)">编辑</Button>
            <Poptip
              confirm
              transfer
              title="您确认删除这条内容吗？"
            >
            <Button type="text" size="small" icon="md-trash" style="margin-right: 5px;color:#ff9900;">删除</Button>
            </Poptip>
          </template>
        </Table>
      </div>
      <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </Card>
    <Modal v-model="boxModal"  title="箱子编辑">
      <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="140">
        <FormItem label="箱子名称" prop="name">
            <Input v-model="list.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="箱子类型" prop="type">
          <Input v-model="list.type" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="箱子规格(cm)" prop="high">
          <Input v-model="list.long" placeholder="长" style="width:60px;margin-right:5px"></Input>
          <Input v-model="list.wide" placeholder="宽" style="width:60px;margin-right:5px"></Input>
          <Input v-model="list.high" placeholder="高" style="width:60px;margin-right:5px"></Input>
        </FormItem>
        <FormItem label="重量上限(kg)" prop="kg">
          <Input v-model="list.kg" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="存储费用(月/元)" prop="cost">
          <Input v-model="list.cost" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="详情介绍" >
          <Button icon="ios-cloud-upload-outline">上传图片</Button>
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
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      boxModal:false,
      list:{
        name:'', 
        type:'', 
        kg:'',
        long:'', 
        wide:'', 
        high:'',
        cost:'',
      },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        kg: [
          { required: true, message: '重量上限不能为空', trigger: 'blur' }
        ],
        long: [
          { required: true, message: '长不能为空', trigger: 'blur' }
        ],
        wide: [
          { required: true, message: '宽不能为空', trigger: 'blur' }
        ],
        high: [
          { required: true, message: '长宽高不能为空', trigger: 'blur' }
        ],
        cost: [
          { required: true, message: '金额不能为空', trigger: 'blur' }
        ]
      },
      columnsList:[
        {
          title: '序号',
          key: 'serialNumber',
          width: 70,
          align: 'center'
        },
        {
          title: '箱子名称',
          key: 'orderNumber',
          width: 180,
          align: 'center'
        },
        {
          title: '箱子类型',
          key: 'contacts',
          width: 180,
          align: 'center'
        },
        {
          title: '箱子规格(cm)',
          key: 'phone',
          minWidth: 180,
          align: 'center'
        },
        {
          title: '重量',
          key: 'address',
          width: 200,
          align: 'center'
        },
        {
          title: '存储费用/月',
          key: 'date',
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 250,
          align: 'center'
        },
      ],
      dataList:[
        {}
      ],
    }
  },
  mounted () {
    //
  },
  methods:{
    getList(){

    },
    boxClick(){
      this.boxModal = true
    },
    confirm(){
      this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.cancel()

          } else {
            this.$Message.error('请全部填写!');
          }
      })
    },
    cancel(){
      this.list.name=''
      this.list.type=''
      this.list.kg=''
      this.list.long=''
      this.list.wide=''
      this.list.high=''
      this.list.cost=''
      this.boxModal = false
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
