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
        children: [
            {
                path: '/cart/cartlist',
                component:CartList
            },
            {
                path: '/cart/addgood',
                component:AddGood
            },
            {
                path: '/cart/address',
                component:Address
            },
            {
                path: '/cart',
                redirect:'/cart/cartlist'
            },

        ]
    }
]