import React from 'react'
import Error from 'next/error'
import Layout from '../../components/Layout'
import { getOrders } from '../../helper/dataFetch'
import Paid from './components/Paid'
import Unpaid from './components/Unpaid'

import { Button } from 'primereact/button'
type Props = { orders: Array<{ status: string }>, errorCode?: any }

const Index = ({ errorCode, orders }: Props) => {

    const tabs = [
        { name: "Unpaid", component: <Unpaid request={orders.filter(({ status }) => status === "unpaid")} /> },
        { name: "Paid", component: <Paid request={orders.filter(({ status }) => status === "paid")} /> },
    ]
    const [currentTab, setCurrentTab] = React.useState(tabs.at(0)?.name)
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }
    return (
        <Layout>
            <div className="tabs-name flex border p-button w-fit items-center p-0">
                {tabs.map(({ name }) =>
                    <h1 key={name} className={`cursor-pointer text-lg p-4  mb-0  rounded-none ${name === currentTab ? 'text-green-700 font-extrabold ' : ''}`}
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

export async function getServerSideProps() {
    // Fetching data from external API

    const req = await getOrders()
    console.log(req)
    const errorCode = req.data ? false : req.response?.status
    const orders = req.data
    // Pass data to the page via props
    return { props: { errorCode, orders } }




}

export default Index