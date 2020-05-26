
<template>
  <div>
    <Card>
      <p slot="title">常用地址</p>
      <Button  slot="extra" icon="ios-arrow-back" @click="backPage" >返回上一页</Button>
      <div style="margin-top:20px">
        <Table border ref="selection" :columns="columnsList" :data="dataList">
        </Table>
      </div>
    </Card>
  </div>
</template>

<script>
import { getUserAddressList } from "@api/account";
export default {
  // name: 'home',
  data () {
    return {
      columnsList:[
        {
          title: '序号',
          key: 'num',
          width: 70,
          align: 'center'
        },
        {
          title: '收货人',
          key: 'linkman',
          width: 140,
          align: 'center'
        },
        {
          title: '收货电话',
          key: 'mobile',
          width: 180,
          align: 'center'
        },
        {
          title: '省',
          key: 'province',
          width: 180,
          align: 'center'
        },
        {
          title: '市',
          key: 'city',
          width: 200,
          align: 'center'
        },
        {
          title: '区',
          key: 'district',
          width: 200,
          align: 'center'
        },
        {
          title: '详细地址',
          key: 'address',
          minWidth: 200,
          align: 'center'
        },
      ],
      dataList:[

      ],
    }
  },
  mounted () {
    //
    this.getList()
  },
  methods:{
    getList(){
      
      getUserAddressList(this.$route.query.id).then(res=>{
        let num = 0
        let arr = res.data
        arr.forEach(v => {
          num ++
          v.num = num
          v.province = v.area.province
          v.city = v.area.city
          v.district = v.area.district
          v.address = v.plotName + v.address 
        });
        this.dataList =arr
        
      })
    },
    changePage (page) {
      this.pageNumber = page - 1
      this.getList()
    },
    pageSizeChange(pageSize){
      this.pageSize=pageSize
      this.getList()
    },
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
