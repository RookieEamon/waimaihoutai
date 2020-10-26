import {reqShopListByKeyword} from '@/api/index'
const state = {
    shopList:[]
}
const mutations = {
    RECEIVE_SHOPLIST(state,shopList){
        state.shopList = shopList
    }
}
const actions = {
    async shopListByKeyword({commit},shopObj){
        console.log('进入函数')
        const result = await reqShopListByKeyword(shopObj)
        console.log(result)
        commit('RECEIVE_SHOPLIST',result)
    }
}
const getters = {

}

export default{
    state,
    mutations,
    actions,
    getters
}