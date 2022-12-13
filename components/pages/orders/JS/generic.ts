import { FormikHelpers } from 'formik';
import { NextRouter } from 'next/router';
import API from '../../../../utils/axios'
import { initialVal } from './intialvalues';

// onsubmit function

export const onSubmit = (values: initialVal, action: FormikHelpers<typeof values>, toast: any, id: string, router: NextRouter) => {

    API({ url: "shops/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {
        console.log(res)
        res.status === 200 &&
            toast.current.show({ severity: 'success', summary: res.data.shop.name, detail: res.data.message });
        id ? router.replace('shops/list') : null;
        action.setSubmitting(false)
        action.resetForm()
    }).catch(err => {
        console.log(err, "error")
        err.response.status === 403 &&
            toast.current.show({ severity: 'error', summary: err.response.data.at(0).name, detail: 'Shop Already Exists' });
        action.setSubmitting(false)
    })
};