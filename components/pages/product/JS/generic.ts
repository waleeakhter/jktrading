import { FormikHelpers } from 'formik';
import { NextRouter } from 'next/router';
import API from '../../../../utils/axios'
import { initialVals } from './intialvalues';
// onsubmit function
type Props = {
    values: { fixed_quantity: number, quantity: number }, setProducts: Function,
    router: NextRouter, toast: any, id?: any, actions: FormikHelpers<typeof initialVals>
}
export const onSubmit = ({ values, actions, router, toast, id, setProducts }: Props) => {
    values.fixed_quantity = values.fixed_quantity + values.quantity
    actions.setSubmitting(true);
    API({ url: "products/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {

        toast.current.show({ severity: 'success', summary: res.data.product.name, detail: res.data.message });
        id ? router.replace('/products/lists') : router.replace(router.asPath)
        actions.setSubmitting(false)
        actions.resetForm()
        res.status === 201 && setProducts((prev: Object[]) => prev = [...prev, res.data.product])

    }).catch(err => {
        console.log(err, "error")
        err.response.status === 403 &&
            toast.current.show({ severity: 'error', summary: err.response.data.at(0).name, detail: 'Product Already Exists' });
        actions.setSubmitting(false)
    })
};