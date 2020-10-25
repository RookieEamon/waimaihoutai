//引入
import Login from '@/pages/login'
import Cart from '@/pages/cart'
import CartList from '@/pages/cart/components/cartList.vue'
import AddGood from '@/pages/cart/components/addGood.vue'
import Address from '@/pages/cart/components/address.vue'
export default [{
        path: "/login",
        component: Login
    },
    {
        path: "/cart",
        component: Cart,
        meta:{title:"购物车"},
        children: [
            {
                path: '/cart/cartlist',
                component:CartList,
                meta:{title:"购物车列表",categoryTitle:"购物车"}
            },
            {
                path: '/cart/addgood',
                component:AddGood,
                meta:{title:"添加商品",categoryTitle:"购物车"}
            },
            {
                path: '/cart/address',
                component:Address,
                meta:{title:"地址信息",categoryTitle:"购物车"}
            },
            {
                path: '/cart',
                redirect:'/cart/cartlist'
            },

        ]
    }
]