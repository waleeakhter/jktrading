import React from 'react'
import Error from 'next/error'
import Layout from '../../components/Layout'
import { getProducts } from '../../helper/dataFetch'
import { getSession, GetSessionParams } from 'next-auth/react'
import Mobiles from './Components/Mobiles'
import Lcds from './Components/Lcds'
type Props = { products: [{ category: { name: string } }], errorCode?: null }

const Lists = ({ products, errorCode }: Props) => {
    const filterThings = (array: Props['products'], fillter: string) => {
        return array.filter(({ category }) => category.name === fillter)
    }

    const tabs = [
        { name: "Mobile", component: <Mobiles request={filterThings(products, "Mobile")} /> },
        { name: "Lcd's", component: <Lcds request={filterThings(products, "Lcd's")} /> },
    ]
    const [currentTab, setCurrentTab] = React.useState(tabs.at(0)?.name)
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }
    return (
        <Layout>
            <div className="tabs-name flex border p-button w-fit items-center p-0">
                {tabs.map(({ name }) =>
                    <h1 key={name} className={`${name === currentTab ? 'active-tab' : ''}`}
                        onClick={(e => setCurrentTab(name))}>{name}</h1>
                )}
            </div>
            {tabs.map(({ name, component }) =>
                <div key={name} className={name === currentTab ? 'block' : 'hidden'}>
                    {component}
                </div>
            )}
        </Layout>
    )
}


export async function getServerSideProps(context: GetSessionParams | undefined) {
    // Fetching data from external API
    const session = await getSession(context)
    if (session) {
        const products = await getProducts("Mobile")
        const errorCode = products ? false : products.response?.status
        return { props: { products, errorCode } }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    // Pass data to the page via props
}

export default Lists