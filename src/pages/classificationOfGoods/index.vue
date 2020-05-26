<template>
  <div>
    <Card>
      <p slot="title">物品分类列表</p>
      <div style="display:flex;flex-wrap: wrap">
        <Card style="width:49%;margin-right:20px;margin-bottom:20px">
          <p slot="title">一级分类</p>
          <p slot="extra" style="color:red">双击一级分类查看二级分类</p>
          <Button type="success" icon="md-add" style="" @click="oneClick('')">添加</Button>
          <div style="margin-top:20px">
            <Table border ref="selection" :columns="columnsListOne" :data="dataListOne" @on-row-dblclick="oneOnRowClick" :row-class-name="rowClassName">
              <template slot-scope="{ row, index }" slot="operation">
                <Button type="text" size="small"   style="margin-right: 5px;color:#19be6b;" @click="oneClick(row)">编辑</Button>
                <Poptip
                  confirm
                  transfer
                  title="您确认删除这条内容吗？"
                >
                <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;">删除</Button>
                </Poptip>
              </template>
            </Table>
          </div>
        </Card>
        <Card style="width:49%;margin-bottom:20px">
          <p slot="title">二级分类</p>
          <Button type="success" icon="md-add" style="" @click="twoClick('')">添加</Button>
          <div style="margin-top:20px">
            <Table border ref="selection" :columns="columnsListTwo" :data="dataListTwo">
              <template slot-scope="{ row, index }" slot="operation">
                <Button type="text" size="small"   style="margin-right: 5px;color:#19be6b;" @click="twoClick(row)">编辑</Button>
                <Poptip
                  confirm
                  transfer
                  title="您确认删除这条内容吗？"
                >
                <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;">删除</Button>
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
        <FormItem label="上级分类" prop="parentId"  >
          <Select style="width:200px" v-model="listTwo.parentId">
            <Option v-for="item in dataListOne" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
import { getGoodsList,getGoodsSave } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
      listColor:undefined,
      twoModal:false,
      oneModal:false,
      list:{
        name:'', 
      },
      parentId:'',
      listTwo:{
        name:'', 
        parentId:'', 
      },
      ruleValidate: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
      },
      ruleValidate1: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
      },
      columnsListOne:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '分类名称',
          key: 'name',
          minWidth: 170,
          align: 'center'
        },
        {
          title: '下级数量',
          key: 'subAmount',
          width: 120,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 170,
          align: 'center'
        },
      ],
      dataListOne:[
      ],
      columnsListTwo:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '分类名称',
          key: 'name',
          minWidth: 170,
          align: 'center'
        },
        {
          title: '上级分类',
          key: 'parentName',
          width: 170,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: 170,
          align: 'center'
        },
      ],
      dataListTwo:[

      ],
      dataListTwo1:[

      ],
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      let data = {
        parentId:0
      }
      getGoodsList({parentId:0}).then(res=>{
        var arr = res.data
        var num = 0
        arr.forEach(v => {
          num=num+1
          v.num = num
        });
        this.dataListOne = arr
      })
      getGoodsList({nodeLevel:2}).then(res=>{
        var arr = res.data
        var num = 0
        arr.forEach(v => {
          num=num+1
          v.num = num
        });
        this.dataListTwo = arr
      })
    },
    oneClick(id){
      if (id=='') {
        this.oneModal = true
      }else{
        this.list.id = id.id
        this.list.name = id.name
        this.oneModal = true
      }
     
    },
    twoClick(){
      this.twoModal = true
    },
    oneOnRowClick(data,index){
      this.listColor=index
      this.rowClassName()
      getGoodsList({parentId:data.id}).then(res=>{
        var arr = res.data
        var num = 0
        arr.forEach(v => {
          num=num+1
          v.num = num
        });
        this.dataListTwo = arr
        // this.parentId=''
      })
    },
    confirm(){
      this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            getGoodsSave(this.list).then(res=>{
              this.$Message.success('保存成功');
              this.getList()
              this.cancel()
            }).catch(err => {
              this.$Message.error(err.response.data.message)
            })
            

          } else {
            this.$Message.error('请全部填写!');
          }
      })
    },
    confirmTwo(){
      this.$refs['formValidate1'].validate((valid) => {
        if (valid) {
          getGoodsSave(this.listTwo).then(res=>{
            this.$Message.success('保存成功');
            this.oneOnRowClick({id:this.parentId})
            this.cancel()
          }).catch(err => {
            this.$Message.error(err.response.data.message)
          })
        } else {
          this.$Message.error('请全部填写!');
        }
      })
    },
    cancel(){
      this.list.name=''
      this.list.id=''
      this.listTwo.name=''
      this.listTwo.id=''
      this.listTwo.parentId=''
      this.oneModal = false
      this.twoModal = false
    },
    rowClassName (row, index) {
      if (index === Number(this.listColor) ) {
          return 'demo-table-info-row';
      } 
      return '';
    }
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
