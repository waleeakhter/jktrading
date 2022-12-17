import { error } from 'console';
import API from '../utils/axios'

// get products
export const getProducts: Function = async (filter: String) => {

    const request = await API.get('products/list');
    const products = filter ? request.data.filter(({ category }: any) =>
        category.name === filter
    ) : request.data

    return products;

}



// get categories
export const getCategories: Function = async () => {
    const request = await API.get('categories');
    const categories = request.data.map((cat: { name: String; _id: String }) =>
        ({ 'value': cat._id, 'label': cat.name })
    )
    return categories;

}


// get shops 
export const getShops: Function = async (dropdown?: boolean) => {
    const request = await API.get('shops/list')

    const shops = dropdown ? request.data.map((shop: { name: String; _id: String }) =>
        ({ 'value': shop._id, 'label': shop.name })
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

// current balance 
export const getBalance: Function = async () => {
    const request = await API.get('accountbalance');
    return request.data
}