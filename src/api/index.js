import ajax from './ajax'
// export const reqLatestPositionList = (job, page, pageSize) => ajax.post('/careers', { job, page, pageSize })
//根据经纬度和条数获取商铺信息
export const reqRestaurantsByLocation=(longitude,latitude,limit)=>ajax.get(`/shopping/restaurants?latitude=${longitude}&longitude=${latitude}&limit=${limit}`)
//根据商铺获取食品分类列表
export const reqFoodListByRestaurantId=(restaurantId)=>ajax.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${restaurantId}`)
//根据食品分类列表获取食品列表
export const reqFoodsByCategoryId=(categoryId)=>ajax.get(`https://elm.cangdu.org/shopping/v2/menu/${categoryId}`)
//获取评价分类
// https://elm.cangdu.org/ugc/v2/restaurants/:restaurant_id/ratings/tags
export const reqAppraiseByRestaurantId=(restaurantId)=>ajax.get(`https://elm.cangdu.org/ugc/v2/restaurants/${restaurantId}/ratings/tags`)