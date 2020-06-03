<template>
  <div>
    <Card>
      <p slot="title">箱子类型列表</p>
       <Button type="success" icon="md-add" style="" @click="boxClick('')">添加</Button>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
          <template slot-scope="{ row, index }" slot="operation">
            <Button type="text" size="small"   style="margin-right: 5px;color:#19be6b;" @click="boxClick(row.id)">编辑</Button>
            <Poptip
              confirm
              transfer
              @on-ok="okDel(row.id)"
              title="您确认删除这条内容吗？"
            >
            <Button type="text" size="small"  style="margin-right: 5px;color:#ff9900;">删除</Button>
            </Poptip>
          </template>
        </Table>
      </div>
      <!-- <div class="page" style="margin-top:20px;display:flex;justify-content:space-between">
        <div class="operationBtn">
        </div>
        <Page :total="total" show-total @on-change="changePage" show-sizer :page-size-opts="[10,20,50,100]" @on-page-size-change="pageSizeChange"></Page>
      </div> -->
    </Card>
    <Modal v-model="boxModal"  title="箱子编辑" :mask-closable="false" @on-visible-change="visibleChange">
      <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="140">
        <FormItem label="箱子名称" prop="name">
            <Input v-model="list.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="箱子类型" prop="type">
          <Select v-model="list.type" style="width:200px">
            <Option value="A" >拍照</Option>
            <Option value="B" >不拍照</Option>
          </Select>
        </FormItem>
        <FormItem label="箱子规格(cm)" prop="height">
          <Input v-model="list.length" placeholder="长" style="width:60px;margin-right:5px"></Input>
          <Input v-model="list.width" placeholder="宽" style="width:60px;margin-right:5px"></Input>
          <Input v-model="list.height" placeholder="高" style="width:60px;margin-right:5px"></Input>
        </FormItem>
        <FormItem label="重量上限(kg)" prop="weight">
          <Input v-model="list.weight" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="存储费用(月/元)" prop="storePerMonthFee">
          <Input v-model="list.storePerMonthFee" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="详情介绍" >
          <Upload
            :before-upload="handleUpload"
            :headers="headers"
            :on-success="uploadSuccess"
            ref="upload"
            :data='list'
            :show-upload-list='false'
            name='pic'
            action="/server/data/admin/box/save">
            <Button icon="ios-cloud-upload-outline">上传照片</Button>
          </Upload>
          <img :src="img" alt="" style="width:100px;margin-top:5px">
        </FormItem>
        <FormItem label="预览介绍" >
          <Upload
            :before-upload="handleUpload1"
            :on-success="uploadSuccess1"
            :headers="headers"
            :show-upload-list='false'
            ref="upload1"
            :data='list'
            name='sceneryPic'
            action="/server/data/admin/box/save">
            <Button icon="ios-cloud-upload-outline">上传照片</Button>
          </Upload>
          <img :src="sceneryPic" alt="" style="width:100px;margin-top:5px">
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

import { getBoxTypeList,getBoxTypeDetail,getBoxTypeSave,getBoxTypeDel} from '@api/account';
export default {
  // name: 'home',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNumber: 0,
      boxModal:false,
      file: null,
      file1: null,
      loadingStatus: false,
      img:'',
      sceneryPic:'',
      list:{
        id:'',
        name:'', 
        type:'', 
        weight:'',
        length:'', 
        width:'', 
        height:'',
        storePerMonthFee:'',
      },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '重量上限不能为空', trigger: 'blur' }
        ],
        length: [
          { required: true, message: '长不能为空', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '宽不能为空', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '长宽高不能为空', trigger: 'blur' }
        ],
        storePerMonthFee: [
          { required: true, message: '金额不能为空', trigger: 'blur' }
        ]
      },
      columnsList:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '箱子名称',
          key: 'name',
          width: 180,
          align: 'center'
        },
        {
          title: '箱子类型',
          key: 'type',
          width: 180,
          align: 'center'
        },
        {
          title: '箱子规格(cm)',
          key: 'specifications',
          minWidth: 180,
          align: 'center'
        },
        {
          title: '重量',
          key: 'weight',
          width: 200,
          align: 'center'
        },
        {
          title: '存储费用/月',
          key: 'storePerMonthFee',
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          fixed: 'left',
          width: 250,
          align: 'center'
        },
      ],
      dataList:[
      ],
      headers:this.$store.state.headers
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      getBoxTypeList().then(res=>{
        let arr = res.data 
        var num = 0
        arr.forEach(v => {
          num=num+1
          v.num =num
          v.type=v.type.name
          v.specifications = v.length+'*'+v.width+'*'+v.height
        });
        this.dataList=arr
        this.total = res.data.total
      })
    },
    boxClick(id){
      if (id=='') {
        this.boxModal = true
      }else{
        getBoxTypeDetail(id).then(res=>{
          let arr = res.data
          this.list.id=arr.id+''
          this.list.name=arr.name +''
          this.list.type=arr.type.code 
          this.list.weight=arr.weight+''
          this.list.length=arr.length +''
          this.list.width=arr.width +''
          this.list.height=arr.height+''
          this.list.storePerMonthFee=arr.storePerMonthFee+''
          this.img = arr.pic+''
          this.sceneryPic = arr.sceneryPic
          this.boxModal = true
        })
      }
      
      
    },
    confirm(){
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          if (this.img=='') {
            this.$Message.error('请添加详情介绍!');
          }else if(this.sceneryPic==''){
            this.$Message.error('请添加预览介绍!');
          }else{
            if (this.file!=null) {
              this.upload()
            }else if(this.file1!=null){
              this.upload1()
            }else{
              getBoxTypeSave(this.list).then(res=>{
                this.$Message.success('保存成功');
                this.getList()
                this.cancel()
              }).catch(err => {
                this.$Message.error(err.response.data.message)
              })
            }
          }
         
        } else {
          this.$Message.error('请全部填写!');
        }
      })
     
      
    },
    okDel(id){
      getBoxTypeDel(id).then(res=>{
        this.$Message.success('删除成功');
        this.getList()
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    cancel(){
      this.file= null,
      this.file1=null,
      this.list.id=''
      this.list.name=''
      this.list.storePerMonthFee=''
      this.list.type=''
      this.list.weight=''
      this.list.length=''
      this.list.width=''
      this.list.height=''
      this.list.cost=''
      this.img=''
      this.sceneryPic=''
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
    handleUpload (file) {
      this.file = file;
      this.img = window.URL.createObjectURL(file)
      return false;
    },
    handleUpload1 (file) {
      this.file1 = file;
      this.sceneryPic = window.URL.createObjectURL(file)
      return false;
    },
    upload () {
      this.$refs.upload.post(this.file);
      // setTimeout(() => {
       
        
      // }, 1500);
    },
    uploadSuccess(response, file, fileList){
       this.file = null;
        if (this.file1==null) {
          this.cancel()
          this.getList()
          this.$Message.success('保存成功')
        }else{
          this.list.id = response.data.id
          this.upload1()
        }
    },
    upload1(){
      this.$refs.upload1.post(this.file1);
    },
    uploadSuccess1(response, file, fileList){
      this.file1 = null;
      this.cancel()
      this.getList()
      this.$Message.success('保存成功')
    },
    visibleChange(key){
      if (key==false) {
        this.cancel()
      }
      
    },
  }
}
</script>

<style lang="less">
  .operationBtn button{
    margin-right: 20px;
  }
</style>
