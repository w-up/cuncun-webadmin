import Vue from 'vue';
import Vuex from 'vuex';
import util from '@/libs/util';
import admin from './modules/admin'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        admin
    },
    state: {
        headers:{
            Authorization:util.cookies.get('token'),
            'X-TENANT-ID':'cuncun:cc@2020'
        },
        depositReceiptSearchList:{
            status:'',
            orderNo:'',
            linkman:'',
            linktel:'',
            userAccountId:'',
            bookFetchDateStart:'',
            bookFetchDateEnd:'',
            bookFetchHourStart:'',
            bookFetchHourEnd:'',
        },
        orderCollectionSearchList:{
            status:'',
            orderNo:'',
            linkman:'',
            linktel:'',
            userAccountId:'',
        }
    },
    mutations: {
        getDepositReceiptSearch:(state, list)=>{
            state.depositReceiptSearchList=list
        },
        getOrderCollectionSearchList:(state, list)=>{
            state.orderCollectionSearchList=list
        },
    },
})
