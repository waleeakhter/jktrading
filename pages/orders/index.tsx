import React from 'react'
import Error from 'next/error'
import Layout from '../../components/Layout'
import { getOrders } from '../../helper/dataFetch'
import columns from '../../components/pages/product/columns'
import { getSession, GetSessionParams } from 'next-auth/react'
import Datatable from '../../components/Datatable/Datatable'
type Props = { orders: Array<{ status: string }>, errorCode?: any }

const Index = ({ errorCode, orders }: Props) => {

    // const tabs = [
    //     { name: "Unpaid", component: <Unpaid request={orders.filter(({ status }) => status === "unpaid")} /> },
    //     { name: "Paid", component: <Paid request={orders.filter(({ status }) => status === "paid")} /> },
    // ]
    // const [currentTab, setCurrentTab] = React.useState(tabs.at(0)?.name)
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }
    return (
        <Layout>
            {/* <div className="tabs-name flex border p-button w-fit items-center p-0">
                {tabs.map(({ name }) =>
                    <h1 key={name} className={` ${name === currentTab ? ' active-tab ' : ''}`}
                        onClick={(e => setCurrentTab(name))}>{name}</h1>
                )}
            </div>
            {tabs.map(({ name, component }) =>
                <div key={name} className={name === currentTab ? 'block' : 'hidden'}>
                    {component}
                </div>
            )} */}
            <Datatable
                data={orders ?? []}
                columns={columns}
                hideEditBtn={true}
                hideDeleteBtn={true}
                paidBtn={true}
                returnBtn={true}
                targetRoute={'orders'}
                search={'shop.name'} tableName={"Orders"}
            />
        </Layout>
    )
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
    // Fetching data from external API
    const session = await getSession(context)
    if (session) {
        const req = await getOrders()
        const errorCode = req.data ? false : req.response?.status
        const orders = req.data
        return { props: { errorCode, orders } }
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

export default Index