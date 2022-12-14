import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Formik, ErrorMessage } from "formik";
import { initialVals } from "../../components/pages/orders/JS/intialvalues"
import { validationSchema } from "../../components/pages/orders/JS/validationSchema"
import { onSubmit } from "../../components/pages/orders/JS/generic"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getCategories } from './../../helper/dataFetch'
import { useRouter } from 'next/router';
type Props = { shop: Object, id: any }

const AddShop = (props: Props) => {
    const [initialValues, setInitialValues] = useState(initialVals);

    const toast = React.useRef(null);
    const router = useRouter()

    useEffect(() => {
        props.shop ? setInitialValues(props.shop as typeof initialVals) : null
    }, [props.shop])

    return (
        <Layout>
            <Toast ref={toast} />
            <Formik
                validationSchema={validationSchema()}
                initialValues={initialValues}
                onSubmit={(values, actions) => onSubmit(values, actions, toast, props.id, router)}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-theme text-3xl'>Add Client</h1>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-5">

                            <div className='from-group'>
                                <label>Client Name</label>
                                <InputText name="name" type="text" className="capitalize" value={values.name ?? ""}
                                    placeholder="Enter Client Name" autoComplete='off'
                                    onChange={(e) => setFieldValue('name', e.target.value)}
                                />
                                <span className='text-error'>
                                    <ErrorMessage name='name' />
                                </span>
                            </div>

                        </div>

                        <div className='from-group w-full mt-5'>
                            <Button loading={isSubmitting} type='submit' label="Save" icon=" pi pi-arrow-up-right " iconPos='right' />
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
    const categories = await getCategories();

    // Pass data to the page via props
    return { props: { categories } }


}
export default AddShop