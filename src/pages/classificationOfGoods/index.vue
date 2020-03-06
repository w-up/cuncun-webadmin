<template>
  <div>
    <Card>
      <p slot="title">箱子类型列表</p>
      <div style="display:flex;flex-wrap: wrap">
        <Card style="width:750px;margin-right:20px;margin-bottom:20px">
          <p slot="title">一级分类</p>
          <Button type="success" icon="md-add" style="" @click="oneClick('')">添加</Button>
          <div style="margin-top:20px">
            <Table border ref="selection" :columns="columnsListOne" :data="dataListOne" @on-row-dblclick="oneOnRowClick">
              <template slot-scope="{ row, index }" slot="operation">
                <Button type="text" size="small" icon="md-create" style="margin-right: 5px;color:#19be6b;" @click="oneClick(row.id)">编辑</Button>
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
        </Card>
        <Card style="width:750px;margin-bottom:20px">
          <p slot="title">二级分类</p>
          <Button type="success" icon="md-add" style="" @click="twoClick('')">添加</Button>
          <div style="margin-top:20px">
            <Table border ref="selection" :columns="columnsListTwo" :data="dataListTwo">
              <template slot-scope="{ row, index }" slot="operation">
                <Button type="text" size="small" icon="md-create" style="margin-right: 5px;color:#19be6b;" @click="twoClick(row.id)">编辑</Button>
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
        </Card>
      </div>
    </Card>
    <Modal v-model="oneModal"  title="一级分类">
      <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="100">
        <FormItem label="分类名称" prop="name">
            <Input v-model="list.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="下级数量" prop="type">
          <Input v-model="list.type" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <div style="">
          <Button type="text" style="margin-right:10px;" @click="cancel">取消</Button>
          <Button type="primary" style="margin-right:10px" @click="confirm">确定</Button>
        </div>
      </div>
    </Modal>
    <Modal v-model="twoModal"  title="二级分类">
      <Form ref="formValidate1" :model="listTwo" :rules="ruleValidate1" :label-width="100">
        <FormItem label="分类名称" prop="name">
            <Input v-model="listTwo.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="上级分类" prop="type"  >
          <Select style="width:200px" v-model="listTwo.type">
            <Option v-for="item in dataListOne" :value="item.id" :key="item.id">{{ item.orderNumber }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <div style="">
          <Button type="text" style="margin-right:10px;" @click="cancel">取消</Button>
          <Button type="primary" style="margin-right:10px" @click="confirmTwo">确定</Button>
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
      twoModal:false,
      oneModal:false,
      list:{
        name:'', 
        type:'', 
      },
      listTwo:{
        name:'', 
        type:'', 
      },
      ruleValidate: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '下级数量不能为空', trigger: 'blur' }
        ],
      },
      ruleValidate1: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
      },
      columnsListOne:[
        {
          title: '序号',
          key: 'serialNumber',
          width: 70,
          align: 'center'
        },
        {
          title: '分类名称',
          key: 'orderNumber',
          minWidth: 170,
          align: 'center'
        },
        {
          title: '下级数量',
          key: 'contacts',
          width: 170,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 250,
          align: 'center'
        },
      ],
      dataListOne:[
        {
          id:'1',
          serialNumber:'1',
          orderNumber:'服装',
          contacts:'14',
        },
        {
          id:'2',
          serialNumber:'1',
          orderNumber:'家具',
          contacts:'14',
        }
      ],
      columnsListTwo:[
        {
          title: '序号',
          key: 'serialNumber',
          width: 70,
          align: 'center'
        },
        {
          title: '分类名称',
          key: 'orderNumber',
          minWidth: 170,
          align: 'center'
        },
        {
          title: '上级分类',
          key: 'contacts',
          width: 170,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 250,
          align: 'center'
        },
      ],
      dataListTwo:[
        {
          id:'1',
          serialNumber:'1',
          orderNumber:'上衣',
          contacts:'服装',
        },
        {
          id:'2',
          serialNumber:'2',
          orderNumber:'茶几',
          contacts:'家具',
        }
      ],
      dataListTwo1:[
        {
          id:'1',
          serialNumber:'1',
          orderNumber:'上衣',
          contacts:'服装',
        },
        {
          id:'2',
          serialNumber:'2',
          orderNumber:'茶几',
          contacts:'家具',
        }
      ],
    }
  },
  mounted () {
    //
  },
  methods:{
    getList(){

    },
    oneClick(){
      this.oneModal = true
    },
    twoClick(){
      this.twoModal = true
    },
    oneOnRowClick(data){
      var arr = []
      for (const item of this.dataListTwo1) {
        if (item.id == data.id) {
          arr.push(item)
        }
      }
      this.dataListTwo = arr

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
    confirmTwo(){
      this.$refs['formValidate1'].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.cancel()

          } else {
            this.$Message.error('请全部填写!');
          }
      })
    },
    cancel(){
      this.oneModal = false
      this.twoModal = false
    },
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
