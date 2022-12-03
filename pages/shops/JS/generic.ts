import { NextRouter } from 'next/router';
import API from './../../../utils/axios'

// onsubmit function

export const onSubmit = (values: Object, setSubmitting: Function,
    props: Object, toast: any, id: string, router: NextRouter) => {
    alert()
    setSubmitting(true);
    API({ url: "shops/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {
        console.log(res)
        res.status === 200 &&
            toast.current.show({ severity: 'success', summary: res.data.shop.shop_name, detail: res.data.message });
        id ? router.replace('shops/list') : null;
    }).catch(err => {
        console.log(err, "error")
        err.response.status === 403 &&
            toast.current.show({ severity: 'error', summary: err.response.data.at(0).shop_name, detail: 'Shop Already Exists' });
    })
};