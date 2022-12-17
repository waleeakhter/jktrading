import React, { useCallback, useContext, useEffect } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Formik, ErrorMessage } from "formik";
import { AppContext } from '../Layout';
import { Message } from 'primereact/message';
import { getProducts, getShops } from '../../helper/dataFetch';
import { validationSchema } from "./validation"
import { initialValues } from './values'
import { setPrice, submitForm, Product } from "./functions"
import { InputText } from 'primereact/inputtext';
import Dropdown from '../AutoComplete/dropdown';
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
    const [shops, setShops] = React.useState([])
    const { toastMessage } = useContext(AppContext)
    const phoneCondition = ["New", "Kit", "A", "B", "C"]


    useEffect(() => {
        setGetProduct(singleProduct)
    }, [singleProduct])

    const getShopData = useCallback(() => {
        const fetchData = async () => {
            const data = await getShops()
            setShops(data)

        }
        fetchData()
            .catch(console.error);;
    }, [setShops])

    const getPro = useCallback(() => {
        const fetchData = async () => {
            const data = await getProducts()
            setItems(data)

        }
        fetchData().catch(console.error)

    }, [setItems])

    useEffect(() => {

        modalVisible.sellingModal && (
            getPro(), getShopData()
        )
    }, [modalVisible.sellingModal, getPro, getShopData])


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
                onSubmit={(values, actions) => submitForm(values, actions, setGetProduct, toastMessage, setItems)}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <Dialog header="Sell the Product" visible={modalVisible.sellingModal} style={{ width: '95vw', height: '95vh' }}
                        onHide={() => { setGetProduct((prev) => prev = {} as Product); modalVisible.setSellingModal(false); }}>
                        <form className=' grid md:grid-cols-2 gap-8' >
                            <div className='from-group'>
                                <label>Product</label>
                                <Dropdown
                                    options={items}
                                    placeholder="Select..."
                                    className="w-full"
                                    callback={(e: { _id: string }) => { selectProduct(e._id, setFieldValue) }}
                                />
                                <div className='text-red-800'> <ErrorMessage name="product" /> </div>
                            </div>
                            {values.product ? <>
                                {values.quantity > 0 ?
                                    <>
                                        <div className='from-group'>
                                            <label>Shop</label>
                                            <Dropdown
                                                options={shops}
                                                placeholder="Select..." className="w-full"
                                                callback={(e: { _id: string }) => setFieldValue('shop', e._id)}
                                            />
                                            <div className='text-red-800'> <ErrorMessage name="shop" /> </div>
                                        </div>

                                        <div className='from-group'>
                                            <label>Price</label>
                                            <InputNumber value={values.sell_price}
                                                placeholder='Enter Price' locale="de-DE" min={0} className="w-full"
                                                onChange={(e) => setPrice(setFieldValue, values, "sell_price", e.value ?? 0, toastMessage)}
                                            />
                                            <div className='text-red-800'> <ErrorMessage name="sell_price" /></div>
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
                                            <label htmlFor="quantity" className='flex justify-between'>Quantity <p>Available Stock : {values.quantity - values.sell_quantity || 0}</p></label>
                                            <InputNumber value={values.sell_quantity}
                                                placeholder='Enter Price' min={0} className="w-full" max={values.quantity}
                                                onChange={(e) => setPrice(setFieldValue, values, "sell_quantity", e.value ?? 0, toastMessage)}
                                            />

                                            <div className='text-red-800'> <ErrorMessage name="sell_quantity" /></div>
                                        </div>
                                        <div className='from-group'>
                                            <label>Item Condition</label>

                                            <InputText list="condition" name="condition" type="text" value={values.condition ?? ""}
                                                placeholder="Enter item condition" autoComplete='off'
                                                onChange={(e) => setFieldValue('condition', e.target.value)}
                                            />
                                            <datalist id='condition'>
                                                {phoneCondition && phoneCondition.length > 0 &&
                                                    phoneCondition.map((label, i) => (
                                                        <option key={label}>{label}</option>
                                                    ))
                                                }
                                            </datalist>
                                        </div>

                                        <div className='from-group'>
                                            <label>Any Reference</label>
                                            <InputText name="reference" type="text" value={values.reference ?? ""}
                                                placeholder="Enter any item Reference" autoComplete='off'
                                                onChange={(e) => setFieldValue('reference', e.target.value)}
                                            />
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