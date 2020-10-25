const state = {
    cityInfo: {

        pinyin: "shanghai",
        is_map: true,
        longitude: 121.473701,
        latitude: 31.23037,
        sort: 1,
        area_code: "021",
        abbr: "SH",
        name: "上海",
        id: 1
    }
}
const mutations = {
    changeCityMutatin(state, cityInfo) {
        state.cityInfo = cityInfo
    }
}
const actions = {

}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}