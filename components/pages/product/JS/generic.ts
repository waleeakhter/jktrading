import API from '../../../../utils/axios'
// onsubmit function
type Props = {
    values: { fixed_quantity: number, quantity: number }, setSubmitting: Function,
    router: { replace: Function }, toast: any, id?: any
}
export const onSubmit = ({ values, setSubmitting, router, toast, id }: Props) => {
    values.fixed_quantity = values.fixed_quantity + values.quantity
    setSubmitting(true);
    API({ url: "products/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {
        console.log(res)

        res.status === 200 &&
            toast.current.show({ severity: 'success', summary: res.data.product.product_name, detail: res.data.message });
        id && router.replace('/products/lists')
        setSubmitting(false)
    }).catch(err => {
        console.log(err, "error")
        err.response.status === 403 &&
            toast.current.show({ severity: 'error', summary: err.response.data.at(0).product_name, detail: 'Product Already Exists' });
        setSubmitting(false)
    })
};