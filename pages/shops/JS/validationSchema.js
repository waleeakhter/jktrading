import * as yup from "yup";
export const validationSchema = (id) => {
    return yup.object().shape({
        shop_name: yup.string().required("Field is required!"),
    });
};