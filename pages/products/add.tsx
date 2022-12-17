import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Formik, ErrorMessage } from "formik";
import { initialVals } from "../../components/pages/product/JS/intialvalues"
import { validationSchema } from "../../components/pages/product/JS/validationSchema"
import { onSubmit } from "../../components/pages/product/JS/generic"
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getCategories } from './../../helper/dataFetch'
import { useRouter } from 'next/router'
import API from '../../utils/axios';
import { getSession, GetSessionParams } from 'next-auth/react';
type Props = { categories?: Array<Object>, products?: Array<{ name: string }> }

const AddProduct = (props: Props) => {
    // const [error, setError] = useState([]);
    const [initialValues, setInitialValues] = useState(initialVals);

    const toast = React.useRef(null);

    const router = useRouter()
    const { id } = router.query
    const [products, setProducts] = useState([] as Props['products'])
    useEffect(() => {
        id && API.get(`/products/list?_id=${id}`).then(res => {
            console.log(res.data)
            setInitialValues({ ...res.data.at(0), category: res.data.at(0).category._id })
        })
    }, [id])

    useEffect(() => {
        API.get(`/products/list`).then(res => {
            setProducts(res.data)
        })
    }, [])



    return (
        <Layout>
            <Toast ref={toast} />

            <Formik
                validationSchema={validationSchema()}
                initialValues={initialValues}
                onSubmit={(values, actions) => onSubmit({ values, actions, router, toast, id, setProducts })}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-theme text-3xl'>Add Item</h1>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-5">

                            <div className='from-group'>
                                <label>Item Name</label>
                                <InputText list="products" name="first_name" type="text" value={values.name ?? ""}
                                    placeholder="Enter Item Name" autoComplete='off'
                                    onChange={(e) => setFieldValue('name', e.target.value)}
                                />
                                <datalist id='products'>
                                    {products && products.length > 0 &&
                                        products.map(({ name }, i) => (
                                            <option key={name}>{name}</option>
                                        ))
                                    }
                                </datalist>

                                <span className='text-error'>
                                    <ErrorMessage name='name' />
                                </span>

                            </div>

                            <div className='from-group'>
                                <label>Item Actual Price</label>
                                <InputNumber placeholder='Enter actual price' value={values.purchased_price ?? ""}
                                    min={0} className="w-full"
                                    onChange={(e) => setFieldValue('purchased_price', e.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='purchased_price' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Item Selling Price</label>
                                <InputNumber placeholder='Enter selling price' value={values.sell_price ?? ""}
                                    min={0} className="w-full"
                                    onChange={(e) => setFieldValue('sell_price', e.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='sell_price' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Item Quantity</label>
                                <InputNumber placeholder='Enter Quantity' value={values.quantity ?? ""}
                                    min={0} className="w-full"
                                    onChange={(e) => setFieldValue('quantity', e.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='quantity' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Category</label>
                                <Dropdown optionLabel="label" value={values.category} options={props.categories}
                                    placeholder="Select..." className="w-full" name="category"
                                    onChange={(e) => { setFieldValue('category', e.value); }}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='category' />
                                </span>
                            </div>





                        </div>

                        <div className='from-group w-full mt-5'>
                            <Button disabled={isSubmitting} loading={isSubmitting} label="Save" icon=" pi pi-arrow-up-right " iconPos='right' />
                        </div>

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
                )}
            </Formik>
        </Layout>

    )
}



export async function getServerSideProps(context: GetSessionParams | undefined) {
    // Fetching data from external API
    const session = await getSession(context)
    if (session) {
        const categories = await getCategories()
        // Pass data to the page via props
        return { props: { categories } }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}
export default AddProduct