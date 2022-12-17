export const initialValues = (getProduct) => {
    return {
        product: getProduct?._id ?? "",
        shop: String(),
        sell_price: getProduct?.sell_price ?? "",
        discount: Number(),
        total_discount: Number(),
        sub_total: getProduct?.sell_price ?? Number(),
        total_amount: Number(),
        sell_quantity: Number(),
        quantity: getProduct?.quantity ?? Number(),
        reference: String(),
        condition: String()
    }
}