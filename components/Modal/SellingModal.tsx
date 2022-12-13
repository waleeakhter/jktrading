import React, { useContext } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Formik, ErrorMessage } from "formik";
import { useRouter } from 'next/router';
import { AppContext } from '../Layout';
import { Message } from 'primereact/message';
import { getProducts, getShops } from '../../helper/dataFetch';
import { validationSchema } from "./validation"
import { initialValues } from './values'
import { setPrice, submitForm, Product } from "./functions"
type Props = {
    products?: Array<Object>,
    modalVisible: {
        sellingModal: boolean, setSellingModal: Function,
    },
    singleProduct?: Product,
}

const SellingModal = ({ products, modalVisible, singleProduct }: Props) => {
    // const [products, setProducts] = React.useState([] as Array<Object>)
    const [getProduct, setGetProduct] = React.useState(singleProduct)
    const [items, setItems] = React.useState([] as Array<Object>)
    const router = useRouter();
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

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts()
            setItems(data)

        }
        fetchData().catch(console.error)

    }, [setItems])

    const selectProduct: Function = (value: String, setFieldValue: Function) => {
        setFieldValue('product', value)
        const getProduct = items.find((pro: any) => pro._id === value)
        setGetProduct(getProduct as Product)
    }
    return (
        <>



            <Formik
                validationSchema={validationSchema()}
                initialValues={initialValues(getProduct)}
                onSubmit={(values, actions) => submitForm(values, actions, setGetProduct, router, toastMessage)}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <Dialog header="Sell the Product" visible={modalVisible.sellingModal} style={{ width: '95vw', height: '95vh' }}
                        onHide={() => modalVisible.setSellingModal(false)}>
                        <form className=' grid md:grid-cols-2 gap-8' >
                            <div className='from-group'>
                                <label>Product</label>
                                <Dropdown

                                    // defualtValue={values.product}
                                    options={items.map((pro: any) =>
                                        ({ 'value': pro._id, 'label': pro.name })
                                    )}
                                    autoFocus
                                    placeholder="Select..." className="w-full"
                                    onChange={(e) => selectProduct(e.value, setFieldValue)}
                                />
                                <div className='text-red-800'> <ErrorMessage name="product" /> </div>
                            </div>
                            {values.product ? <>
                                {values.quantity > 0 ?
                                    <>
                                        <div className='from-group'>
                                            <label>Shop</label>
                                            <Dropdown optionLabel="label"
                                                value={values.shop}
                                                options={shops}
                                                placeholder="Select..." className="w-full"
                                                onChange={(e) => setFieldValue('shop', e.value)}
                                            />
                                            <div className='text-red-800'> <ErrorMessage name="shop" /> </div>
                                        </div>

                                        <div className='from-group'>
                                            <label>Price</label>
                                            <InputNumber value={values.sell_price}
                                                placeholder='Enter Price'
                                                locale="de-DE" mode="currency"
                                                min={0} className="w-full" currency="EUR" disabled />
                                            <div className='text-red-800'> <ErrorMessage name="price" /></div>
                                        </div>

                                        {/* <div className='from-group'>
                                            <label>Discount</label>
                                            <input value={values.discount}
                                                type="number" placeholder='Enter Discount' min={0} className="w-full" max={20}
                                                onChange={
                                                    (e) => { setPrice(setFieldValue, values, "discount", parseInt(e.target.value) || 0, toastMessage) }
                                                }
                                            />

                                        </div> */}
                                        <div className="from-group">
                                            <label htmlFor="quantity">Quantity</label>
                                            <input type="number" id="quantity" value={values.sell_quantity ?? 1}
                                                min={1} max={values.quantity}
                                                onChange={(e) => { setPrice(setFieldValue, values, "sell_quantity", parseInt(e.target.value) || 1, toastMessage) }} />
                                            <div className='text-red-800'> <ErrorMessage name="sell_quantity" /></div>
                                            {!errors.sell_price && <p>Available Stock : {values.quantity - values.sell_quantity || 0}</p>}
                                        </div>
                                        <div className=' border-t pt-4 flex items-center  gap-4 top-auto  absolute inset-0 p-4  '>


                                            <div className='text-left'>
                                                <div className=' hidden '>
                                                    <p><b>Sub Total:</b> {values.sub_total ?? 0}€</p>
                                                    <p><b>Discount:</b> {`${values.sell_quantity} * ${values.discount ?? 0}`} =
                                                        {Number(values.sell_quantity) * Number(values.discount)}</p>
                                                    <hr className='w-ful my-1' />
                                                </div>
                                                <h1 className='text-xl'><b>Total:</b> {Number(values.sell_price) * Number(values.sell_quantity) || 0}€</h1>
                                            </div>


                                            <div className='ml-auto flex gap-2'>
                                                {[
                                                    // { label: "Pay Now", status: "paid" }, 
                                                    { label: "Add", status: "unpaid" }]
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


                        </form>
                        {true && (
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