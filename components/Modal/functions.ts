import { FormikHelpers } from "formik";
import { NextRouter } from "next/router";
import API from "../../utils/axios";
import { initialValues } from "./values"


export type Product = { _id: string, product_name: string, quantity: number, sell_price: number }

export const setPrice = (setFieldValue: Function, values: ReturnType<typeof initialValues>,
    name: string, value: number, toastMessage: Function) => {

    const setValue = (val: number) => {
        setFieldValue(name, val)
    }

    const discount = (val: number) => {
        setValue(val)
        setFieldValue("total_discount", val * values.sell_quantity)
    }

    if (name === "sell_quantity") {
        setValue(value)
        setFieldValue("sub_total", value * values.sell_price)
        setFieldValue("total_discount", value * values.discount);
    }


    if (name === "discount") {
        if (value >= values.sub_total) {
            discount(0);
            toastMessage("error", "Discount Error", "Discount limit exceeded")

            return false
        }
        discount(value)
    }
}

export const submitForm = (values: ReturnType<typeof initialValues>,
    actions: FormikHelpers<ReturnType<typeof initialValues>>,
    setGetProduct: Function, router: NextRouter) => {

    values.total_amount = values.sub_total - values.total_discount;
    console.log(values)

    API.post('orders/add', values).then(res => {
        console.log(res.data);
        setGetProduct((prev: Product) => prev = {} as Product)
        actions.resetForm();
        router.replace(router.asPath);

    }).catch(err => {
        console.log(err)
        actions.setSubmitting(true)
    })

}