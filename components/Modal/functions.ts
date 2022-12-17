import { FormikHelpers } from "formik";
import { NextRouter } from "next/router";
import API from "../../utils/axios";
import { initialValues } from "./values"


export type Product = { _id: string, name: string, quantity: number, sell_price: number }

export const setPrice = (setFieldValue: Function, values: ReturnType<typeof initialValues>,
    name: string, value: number, toastMessage: Function) => {

    const setValue = (val: number) => {
        setFieldValue(name, val)
    }

    // const discount = (val: number) => {
    //     setValue(val)
    //     setFieldValue("total_discount", val * values.sell_quantity)
    // }
    if (name === "sell_price") {
        setValue(value)
        setFieldValue("sub_total", value * values.sell_quantity)
    }
    if (name === "sell_quantity") {
        const val = value <= values.quantity ? value : values.quantity

        setValue(val)
        setFieldValue("sub_total", val * values.sell_price)
    }


    // if (name === "discount") {
    //     if (value >= values.sub_total) {
    //         discount(0);
    //         toastMessage("error", "Discount Error", "Discount limit exceeded")

    //         return false
    //     }
    //     discount(value)
    // }
}

export const openModal = (productData: Object, setSellingModal: Function, setSingleProduct: Function) => {
    setSellingModal(true);
    setSingleProduct(productData ?? {})
}

export const submitForm = (values: ReturnType<typeof initialValues>,
    actions: FormikHelpers<ReturnType<typeof initialValues>>,
    setGetProduct: Function, toastMessage: Function, setItems: Function) => {

    values.total_amount = values.sub_total - values.total_discount;
    console.log(values)

    API.post('orders/add', values).then(res => {
        setGetProduct((prev: Product) => prev = {} as Product)
        setItems((prev: Array<{ _id: string }>) => prev.map((pro) => {
            return pro._id === res.data.product._id ? { ...pro, quantity: res.data.product.quantity } : pro
        }))
        res.data?.message && toastMessage("success", "Order", res.data.message)
        actions.resetForm();
    }).catch(err => {
        console.log(err)
        actions.setSubmitting(false)
    })

}