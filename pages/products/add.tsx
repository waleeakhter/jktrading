import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Formik, ErrorMessage } from "formik";
import { initialVals } from "./JS/intialvalues"
import { validationSchema } from "./JS/validationSchema"
import { onSubmit } from "./JS/generic"
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getCategories } from './../../helper/dataFetch'
import { useRouter } from 'next/router'
import API from '../../utils/axios';
type Props = { categories?: Array<Object> }

const AddProduct = (props: Props) => {
    // const [error, setError] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState(initialVals);
    const phoneCondition = [
        { label: 'New', value: "new" },
        { label: 'Old', value: "old" },
    ];

    const toast = React.useRef(null);

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        id && API.get(`/products/list?_id=${id}`).then(res => {
            setInitialValues({ ...res.data.at(0), category_id: res.data.at(0).category_id._id })
        })
    }, [id])

    return (
        <Layout>
            <Toast ref={toast} />

            <Formik
                validationSchema={validationSchema()}
                initialValues={initialValues}
                onSubmit={(values) => onSubmit({ values, setSubmitting, router, toast, id })}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, }) => (
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-theme text-3xl'>Add Product</h1>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-5">

                            <div className='from-group'>
                                <label>Product Name</label>
                                <InputText name="first_name" type="text" value={values.product_name ?? ""}
                                    placeholder="Enter Product Name" autoComplete='off'
                                    onChange={(e) => setFieldValue('product_name', e.target.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='product_name' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Product Actual Price</label>
                                <InputNumber locale="de-DE" mode="decimal" placeholder='Enter actual price' value={values.purchased_price ?? ""}
                                    min={0} className="w-full"
                                    onChange={(e) => setFieldValue('purchased_price', e.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='purchased_price' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Product Selling Price</label>
                                <InputNumber locale="de-DE" mode="decimal" placeholder='Enter selling price' value={values.sell_price ?? ""}
                                    min={0} className="w-full"
                                    onChange={(e) => setFieldValue('sell_price', e.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='sell_price' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Product Quantity</label>
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
                                <Dropdown optionLabel="label" value={values.category_id} options={props.categories}
                                    placeholder="Select..." className="w-full" name="category"
                                    onChange={(e) => { setFieldValue('category_id', e.value); setFieldValue('category_name', e.target.name) }}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='category_id' />
                                </span>
                            </div>

                            {values.category_id && <div className='from-group'>
                                <label>Product Condition</label>
                                <Dropdown optionLabel="label" value={values.condition} options={phoneCondition}
                                    placeholder="Select..." className="w-full"
                                    onChange={(e) => setFieldValue('condition', e.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='condition' />
                                </span>
                            </div>}

                        </div>

                        <div className='from-group w-full mt-5'>
                            <Button disabled={submitting} label="Save" icon=" pi pi-arrow-up-right " iconPos='right' />
                        </div>

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
                    </form>
                )}
            </Formik>
        </Layout>

    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const categories = await getCategories()
    // Pass data to the page via props
    return { props: { categories } }


}
export default AddProduct