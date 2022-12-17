import * as yup from "yup";
export const validationSchema = (id) => {
    return yup.object().shape({
        name: yup.string().required("Field is required!"),
        category: yup.string().required("Field is required!"),
        // purchased_price: yup.number().required("Field is required!").positive('Value should be greater then zero'),
        //sell_price: yup.number().required("Field is required!").positive('Value should be greater then zero'),
        quantity: yup.number().required("Field is required!").positive('Value should be greater then zero'),
    });
};