
import * as yup from "yup";

export const validationSchema = () => {
    return yup.object().shape({
        product_id: yup.string().required("Field is required!"),
        shop_id: yup.string().required("Field is required!"),
        sell_price: yup.number().required("Field is required!").positive("Value should be greater than 0"),
        sub_total: yup.number().required("Field is required!").positive("Value should be greater than 0"),
        sell_quantity: yup.number().required("Field is required!").positive("Value should be greater than 0"),
        quantity: yup.number().required("Field is required!").positive("Value should be greater than 0")
    });
};