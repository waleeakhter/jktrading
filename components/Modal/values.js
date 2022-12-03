export const initialValues = (getProduct) => {
    return {
        product_id: getProduct._id,
        shop_id: String(),
        sell_price: getProduct.sell_price,
        discount: Number(),
        total_discount: Number(),
        sub_total: getProduct.sell_price,
        total_amount: Number(),
        sell_quantity: Number(1),
        quantity: getProduct.quantity
    }
}