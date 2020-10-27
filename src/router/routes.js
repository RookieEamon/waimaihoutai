//引入
import Login from '@/pages/login'
import Cart from '@/pages/cart'
import CartList from '@/pages/cart/components/cartList.vue'
import AddGood from '@/pages/cart/components/addGood.vue'
import Address from '@/pages/cart/components/address.vue'

//引入商铺管理相关的组件
import Shop from '@/pages/shop'
import AddShop from '@/pages/shop/components/addShop'
import SearchShop from '@/pages/shop/components/searchShop'
import UpdateShop from '@/pages/shop/components/updateShop'

//食品管理
import Food from '@/pages/food'
import AddfoodType from '@/pages/food/components/AddfoodType'
import SearchFood from '@/pages/food/components/SearchFood'
import UpdatefoodInfo from '@/pages/food/components/UpdatefoodInfo'
//66
export default [{
        path: "/login",
        component: Login,
        meta:{isLogin:true}
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
    },
        //商铺相关
        {
            path: '/shop',
            component: Shop,
            meta:{title:"商家管理"},
            children: [{
                    path: '/shop/addshop',
                    component: AddShop,
                    meta:{title:"增加商家",categoryTitle:"商家管理"}
                },
                {
                    path: '/shop/searchshop',
                    component: SearchShop,
                    meta:{title:"搜索商家",categoryTitle:"商家管理"}
                },
                {
                    path:'/shop/updateShop',
                    component:UpdateShop,
                    meta:{title:"修改商家",categoryTitle:"商家管理"}
                },
                {
                    path: '/shop',
                    redirect:'/shop/searchshop'
                }
            ]
        },

        //食品管理
        {
            path:"/food",
            component:Food,
            meta:{title:"食品管理"},
            children:[
               {
                   path:"/food/searchfood",
                   component:SearchFood,
                   meta:{title:"搜索食品",categoryTitle:"食品管理"}
               },
               {
                    path:"/food/addfoodtype",
                    component:AddfoodType,
                    meta:{title:"增加食品",categoryTitle:"食品管理"}
                },
                {
                    path:"/food/updatefoodinfo",
                    component:UpdatefoodInfo,
                    meta:{title:"修改食品信息",categoryTitle:"食品管理"}
                },
                {
                    path: '/food',
                    redirect:'/food/searchfood'
                }
           ]
        },
        {
            path:"/",
            redirect:"/login"
        }
        
]