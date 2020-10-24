import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
const originPush = VueRouter.prototype.push
// 重写这个方法,无非就是给个默认的成功的空回调
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}
const originReplace = VueRouter.prototype.replace
// 重写这个方法,无非就是给个默认的成功的空回调
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}

export default new VueRouter({
    // linkActiveClass:'active',
    mode:'history',
    routes
})