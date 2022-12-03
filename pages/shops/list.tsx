import { getSession, GetSessionParams } from 'next-auth/react'
import React from 'react'
import Datatable from '../../components/Datatable/Datatable'
import Layout from '../../components/Layout'
import { getShops } from '../../helper/dataFetch'
type Props = { request: Array<Object> }


const AllShops = (props: Props) => {


    const columns = [
        { field: 'shop_name', header: 'Shop Name' },
        { field: 'total_orders', header: 'Total Orders' },
        { field: 'outstanding.amount', header: 'Outstanding Balance' },
        { body: '0', header: 'Recevied Balance' },
    ]
    return (
        <Layout>
            <Datatable data={props.request} columns={columns} targetRoute={'shops'} />
        </Layout>
    )
}
export default AllShops

export async function getServerSideProps(context: GetSessionParams | undefined) {

    const session = await getSession(context)
    if (session) {
        // Fetch data from external API
        const request = await getShops()
        // Pass data to the page via props
        return { props: { request } }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}