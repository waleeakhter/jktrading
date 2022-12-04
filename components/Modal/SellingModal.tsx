import React, { useContext } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Formik, ErrorMessage } from "formik";
import { useRouter } from 'next/router';
import { AppContext } from '../Layout';
import { Message } from 'primereact/message';
import { getShops } from '../../helper/dataFetch';
import { validationSchema } from "./validation"
import { initialValues } from './values'
import { setPrice, submitForm, Product } from "./functions"

type Props = {
    products: Array<Object>,
    modalVisible: {
        sellingModal: boolean, setSellingModal: Function,
    },
    singleProduct: Product,
}

const SellingModal = ({ products, modalVisible, singleProduct }: Props) => {
    // const [products, setProducts] = React.useState([] as Array<Object>)
    const [getProduct, setGetProduct] = React.useState(singleProduct)
    const router = useRouter();
    const toast = React.useContext(AppContext);
    const [shops, setShops] = React.useState([])

    const { toastMessage } = useContext(AppContext)

    React.useEffect(() => {
        setGetProduct(singleProduct)
    }, [singleProduct])

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getShops(true)
            setShops(data)

        }
        fetchData()
            .catch(console.error);;
    }, [setShops])

    const selectProduct: Function = (value: String, setFieldValue: Function) => {
        setFieldValue('product_id', value)
        const getProduct = products.find((pro: any) => pro._id === value)
        setGetProduct(getProduct as Product)
    }
    return (
        <>



            <Formik
                validationSchema={validationSchema()}
                initialValues={initialValues(getProduct)}
                onSubmit={(values, actions) => submitForm(values, actions, setGetProduct, router)}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <Dialog header="Sell the Product" visible={modalVisible.sellingModal} style={{ width: '80vw' }}
                        onHide={() => modalVisible.setSellingModal(false)}>
                        <form className='space-y-5' >
                            <div className='from-group'>
                                <label>Product</label>
                                <Dropdown optionLabel="label"
                                    name="product_id"
                                    value={values.product_id}
                                    options={products.map((pro: any) =>
                                        ({ 'value': pro._id, 'label': pro.product_name })
                                    )}
                                    autoFocus
                                    placeholder="Select..." className="w-full"
                                    onChange={e => selectProduct(e.value, setFieldValue)}
                                />
                                <ErrorMessage name="product_id" />
                            </div>
                            {values.product_id ? <>
                                {values.quantity > 0 ?
                                    <>
                                        <div className='from-group'>
                                            <label>Shop</label>
                                            <Dropdown optionLabel="label"
                                                value={values.shop_id}
                                                options={shops}
                                                placeholder="Select..." className="w-full"
                                                onChange={(e) => setFieldValue('shop_id', e.value)}
                                            />
                                            <ErrorMessage name="shop_id" />
                                        </div>

                                        <div className='from-group'>
                                            <label>Price</label>
                                            <InputNumber value={values.sell_price}
                                                placeholder='Enter Price'
                                                locale="de-DE" mode="currency"
                                                min={0} className="w-full" currency="EUR" disabled />
                                        </div>

                                        <div className='from-group'>
                                            <label>Discount</label>
                                            <input value={values.discount}
                                                type="number" placeholder='Enter Discount' min={0} className="w-full" max={20}
                                                onChange={
                                                    (e) => { setPrice(setFieldValue, values, "discount", parseInt(e.target.value) || 0, toastMessage) }
                                                }
                                            />

                                        </div>

                                        <div className=' flex items-center gap-4 '>
                                            <div className="flex-1">
                                                <label htmlFor="quantity">Quantity</label>
                                                <input type="number" id="quantity" value={values.sell_quantity ?? 1}
                                                    min={1} max={values.quantity}
                                                    onChange={(e) => { setPrice(setFieldValue, values, "sell_quantity", parseInt(e.target.value) || 1, toastMessage) }} />
                                            </div>
                                            <div className='text-center flex-1'>
                                                <p>Available Stock : {values.quantity - values.sell_quantity || 0}</p>
                                            </div>
                                        </div>
                                        <div className=' border-t pt-4 flex items-center  gap-4 sticky bottom-0 top-auto '>


                                            <div className='text-left'>
                                                <p><b>Sub Total:</b> {values.sub_total ?? 0}€</p>
                                                <p><b>Discount:</b> {`${values.sell_quantity} * ${values.discount ?? 0}`} =
                                                    {Number(values.sell_quantity) * Number(values.discount)}</p>
                                                <hr className='w-ful my-1' />
                                                <h1 className='text-xl'><b>Total:</b> {Number(values.sub_total) - Number(values.total_discount) || 0}€</h1>
                                            </div>


                                            <div className='ml-auto flex gap-2'>
                                                {[{ label: "Pay Now", status: "paid" }, { label: "Pay Later", status: "unpaid" }]
                                                    .map(({ label, status }) =>
                                                        <Button key={label} label={label} icon="pi pi-times" onClick={(e) => {
                                                            e.preventDefault();
                                                            setFieldValue("status", status)
                                                            handleSubmit()
                                                        }}
                                                            className="p-button-text" type="submit" disabled={isSubmitting} />
                                                    )}
                                            </div>
                                        </div>
                                    </>
                                    : <Message severity="error" text="Out of stock" className="w-full" />}

                            </> : null}


                            {false && (
                                <div className={'row mt-5'}>
                                    <div className={'col-12'}>
                                        <code>
                                            <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                                        </code>
                                    </div>
                                    <div className={'col-12'}>
                                        <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                                    </div>
                                    <div className={'col-12'}>
                                        <pre>Touched: {JSON.stringify(touched, null, 2)}</pre>
                                    </div>
                                </div>
                            )}
                        </form>

                    </Dialog>
                )}
            </Formik>
        </>
    )
}

// export async function getServerSideProps() {
//     // Fetching data from external API

//     return { props: { shops } }
// }

export default SellingModal