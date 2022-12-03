import API from '../utils/axios'

// get products
export const getProducts: Function = async (filter: String) => {

    const request = await API.get('products/list');
    const products = filter ? request.data.filter(({ category_id }: any) =>
        category_id.category_name === filter
    ) : request.data

    return products;

}



// get categories
export const getCategories: Function = async () => {
    const request = await API.get('categories');
    const categories = request.data.map((cat: { category_name: String; _id: String }) =>
        ({ 'value': cat._id, 'label': cat.category_name })
    )
    return categories;

}


// get shops 
export const getShops: Function = async (dropdown?: boolean) => {
    const request = await API.get('shops/list');
    const shops = dropdown ? request.data.map((shop: { shop_name: String; _id: String }) =>
        ({ 'value': shop._id, 'label': shop.shop_name })
    )
        : request.data
    return shops;

}


// get orders 
export const getOrders: Function = async () => {
    const request = await API.get('orders/list');
    const orders = request
    return orders;

}